import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, mergeMap, of
} from 'rxjs';

import { YoutubeApiService } from '../youtube/services/youtube-api/youtube-api.service';
import * as actions from './actions';

@Injectable()
export default class VideosEffects {
  constructor(
    private actions$: Actions,
    private youTubeApiService: YoutubeApiService,
  ) {}

  loadVideos$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadYoutubeVideos),
    mergeMap((action) => {
      this.youTubeApiService.loading.set(true);
      return this.youTubeApiService.searchVideosWithStatistics(action.query, action.pageToken).pipe(
        map((response) => {
          this.youTubeApiService.loading.set(false);
          return actions.loadYoutubeVideosSuccess({
            videos: response.videos,
            nextPageToken: response.nextPageToken,
            prevPageToken: response.prevPageToken,
          });
        }),
        catchError((error) => {
          this.youTubeApiService.loading.set(false);
          return of(actions.loadYoutubeVideosFailure({ error: error.message }));
        }),
      );
    }),
  ),);
}
