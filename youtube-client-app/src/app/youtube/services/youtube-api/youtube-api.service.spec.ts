import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SearchResponse } from '../../models/search-response.model';
import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  let service: YoutubeApiService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [YoutubeApiService, { provide: HttpClient, useValue: httpClientMock }],
    });
    service = TestBed.inject(YoutubeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient with the correct URL fo searchVideos', (done) => {
    const mockResponse: SearchResponse = {
      kind: 'youtube#searchListResponse',
      etag: 'etag',
      nextPageToken: 'CAUQAA',
      prevPageToken: 'CAUQAA',
      pageInfo: {
        totalResults: 15,
        resultsPerPage: 5,
      },
      items: [
        {
          kind: 'youtube#searchResult',
          etag: 'etag_value',
          id: {
            kind: 'youtube#video',
            videoId: 'video_id_1',
          },
          snippet: {
            publishedAt: '2023-10-01T00:00:00Z',
            channelId: 'channel_id_1',
            title: 'title',
            description: 'description',
            thumbnails: {
              default: {
                url: 'url',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'url',
                width: 320,
                height: 180,
              },
              high: {
                url: 'url',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'url',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'url',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'channel title',
            tags: ['tag1', 'tag2'],
            categoryId: '27',
            liveBroadcastContent: 'none',
            localized: {
              title: 'title',
              description: 'description',
            },
            defaultAudioLanguage: 'en-US',
          },
          statistics: {
            viewCount: '1000',
            likeCount: '100',
            dislikeCount: '5',
            favoriteCount: '0',
            commentCount: '10',
          },
        },
      ],
    };
    const searchQuery = 'test';

    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.searchVideos(searchQuery).subscribe((response) => {
      expect(response).toEqual(mockResponse);

      expect(httpClientMock.get).toHaveBeenCalled();
      const calledWithUrl = httpClientMock.get.mock.calls[0][0];
      const calledWithParams = httpClientMock.get.mock.calls[0][1]?.params;

      expect(calledWithUrl).toBe('search');
      expect(calledWithParams).toEqual({
        type: 'video',
        part: 'snippet',
        maxResults: 20,
        q: searchQuery,
        pageToken: '',
      });

      done();
    });
  });
});
