import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import {
  catchError, map, Observable, of, switchMap, tap
} from 'rxjs';

import { SearchResponse } from '../../models/search-response.model';
import { VideoItem } from '../../models/video-item.model';
import { VideoResponse } from '../../models/video-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly apiUrl = 'search';
  private readonly videosUrl = 'videos';
  public loading = signal(false);
  public error = signal('');
  isLoading$ = computed(() => this.loading());
  error$ = computed(() => this.error());

  constructor(private http: HttpClient) {}

  searchVideos(query: string, pageToken?: string): Observable<SearchResponse> {
    this.loading.set(true);
    const params = {
      type: 'video',
      part: 'snippet',
      maxResults: 20,
      q: query,
      pageToken: pageToken || '',
    };

    return this.http.get<SearchResponse>(this.apiUrl, { params }).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        this.loading.set(false);
        this.error.set(`Error: ${error.message}`);
        return of(error);
      }),
    );
  }

  getVideoStatistics(videoIds: string[]): Observable<VideoResponse> {
    this.loading.set(true);
    const params = {
      id: videoIds.join(','),
      part: 'snippet,statistics',
    };
    return this.http.get<VideoResponse>(this.videosUrl, { params }).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        this.loading.set(false);
        this.error.set(`Error: ${error.message}`);
        return of(error);
      }),
    );
  }

  searchVideosWithStatistics(
    query: string,
    pageToken?: string,
  ): Observable<{ videos: VideoItem[]; nextPageToken?: string; prevPageToken?: string }> {
    return this.searchVideos(query, pageToken).pipe(
      switchMap((searchResponse) => {
        const videoIds = searchResponse.items.map((item) => item.id.videoId);
        return this.getVideoStatistics(videoIds).pipe(
          map((videoResponse: VideoResponse) => ({
            videos: videoResponse.items,
            nextPageToken: searchResponse.nextPageToken,
            prevPageToken: searchResponse.prevPageToken,
          })),
        );
      }),
    );
  }
}
