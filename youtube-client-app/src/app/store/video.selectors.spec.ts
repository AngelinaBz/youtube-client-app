import {
  selectAllVideos,
  selectCurrentPage,
  selectFavoriteVideoIds,
  selectNextPageToken,
  selectPrevPageToken,
} from './selectors';
import { AppState } from './store';

describe('Video Selectors', () => {
  const state: AppState = {
    app: {
      ids: ['1', '2', '3', '4'],
      videos: {
        1: { id: '1', isCustom: true },
        2: { id: '2', isCustom: false },
        3: { id: '3', isCustom: true },
        4: { id: '4', isCustom: false },
      },
      loading: false,
      error: '',
      currentPage: 1,
      favoriteVideoIds: ['1', '3'],
      nextPageToken: 'next_token',
      prevPageToken: 'prev_token',
    },
  };

  it('should select all videos', () => {
    const selectedVideos = selectAllVideos(state);
    expect(selectedVideos).toEqual([state.app.videos['1'], state.app.videos['3'], state.app.videos['2'], state.app.videos['4']]);
  });

  it('should select favorite video ids', () => {
    const favoriteVideoIds = selectFavoriteVideoIds(state);
    expect(favoriteVideoIds).toEqual(state.app.favoriteVideoIds);
  });

  it('should select next page token', () => {
    const nextPageToken = selectNextPageToken(state);
    expect(nextPageToken).toEqual(state.app.nextPageToken);
  });

  it('should select prev page token', () => {
    const prevPageToken = selectPrevPageToken(state);
    expect(prevPageToken).toEqual(state.app.prevPageToken);
  });

  it('should select current page', () => {
    const currentPage = selectCurrentPage(state);
    expect(currentPage).toEqual(state.app.currentPage);
  });
});
