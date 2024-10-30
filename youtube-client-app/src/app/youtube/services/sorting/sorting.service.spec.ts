import { TestBed } from '@angular/core/testing';

import { SortDirection } from '../../enums/enums';
import { VideoItem } from '../../models/video-item.model';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: SortingService;

  const videoItems: VideoItem[] = [
    {
      id: 'id1',
      snippet: {
        title: 'item1',
        description: 'description1',
        publishedAt: '2024-01-01T00:00:00Z',
        thumbnails: { medium: { url: 'url1' }, standard: { url: 'url1' } },
      },
      statistics: {
        viewCount: '200',
        likeCount: '1173',
        dislikeCount: '26',
        favoriteCount: '0',
        commentCount: '170',
      },
    },
    {
      id: 'id2',
      snippet: {
        title: 'item2',
        description: 'description2',
        publishedAt: '2023-01-01T00:00:00Z',
        thumbnails: { medium: { url: 'url2' }, standard: { url: 'url2' } },
      },
      statistics: {
        viewCount: '100',
        likeCount: '1173',
        dislikeCount: '26',
        favoriteCount: '0',
        commentCount: '170',
      },
    },
    {
      id: 'id3',
      snippet: {
        title: 'item3',
        description: 'description3',
        publishedAt: '2022-01-01T00:00:00Z',
        thumbnails: { medium: { url: 'url3' }, standard: { url: 'url3' } },
      },
      statistics: {
        viewCount: '50',
        likeCount: '1173',
        dislikeCount: '26',
        favoriteCount: '0',
        commentCount: '170',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingService],
    });
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggleSortByDateDirection', (done) => {
    service.sortByDateDirection$.subscribe((direction) => {
      expect(direction).toBe(SortDirection.Desc);
      done();
    });
    service.toggleSortByDateDirection();
  });

  it('should toggleSortByViewCountDirection', (done) => {
    service.sortByViewCountDirection$.subscribe((direction) => {
      expect(direction).toBe(SortDirection.Desc);
      done();
    });
    service.toggleSortByViewCountDirection();
  });

  it('should getSortedItemsByDate in Asc', () => {
    const sortedItems = service.getSortedItemsByDate([...videoItems]);

    expect(sortedItems[0]?.snippet?.publishedAt).toBe('2022-01-01T00:00:00Z');
    expect(sortedItems[1]?.snippet?.publishedAt).toBe('2023-01-01T00:00:00Z');
    expect(sortedItems[2]?.snippet?.publishedAt).toBe('2024-01-01T00:00:00Z');
  });

  it('should getSortedItemsByDate in Desc', () => {
    service.toggleSortByDateDirection();
    const sortedItems = service.getSortedItemsByDate([...videoItems]);

    expect(sortedItems[0]?.snippet?.publishedAt).toBe('2024-01-01T00:00:00Z');
    expect(sortedItems[1]?.snippet?.publishedAt).toBe('2023-01-01T00:00:00Z');
    expect(sortedItems[2]?.snippet?.publishedAt).toBe('2022-01-01T00:00:00Z');
  });

  it('should getSortedItemsByViewCount in Asc', () => {
    const sortedItems = service.getSortedItemsByViewCount([...videoItems]);

    expect(sortedItems[0]?.statistics?.viewCount).toBe('50');
    expect(sortedItems[1]?.statistics?.viewCount).toBe('100');
    expect(sortedItems[2]?.statistics?.viewCount).toBe('200');
  });

  it('should getSortedItemsByViewCount in Desc', () => {
    service.toggleSortByViewCountDirection();
    const sortedItems = service.getSortedItemsByViewCount([...videoItems]);

    expect(sortedItems[0]?.statistics?.viewCount).toBe('200');
    expect(sortedItems[1]?.statistics?.viewCount).toBe('100');
    expect(sortedItems[2]?.statistics?.viewCount).toBe('50');
  });
});
