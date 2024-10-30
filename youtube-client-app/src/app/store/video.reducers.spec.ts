import { VideoItem } from '../youtube/models/video-item.model';
import * as actions from './actions';
import { initialState, videosReducer } from './reducers';

describe('Video Reducers', () => {
  it('should handle addCustomVideo action', () => {
    const video: VideoItem = { id: '1', title: 'Title', isCustom: true };
    const action = actions.addCustomVideo({ video });
    const expectedState = {
      ...initialState,
      videos: { 1: video },
      ids: ['1'],
    };
    expect(videosReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle deleteCustomVideo action', () => {
    const stateWithVideos = {
      ...initialState,
      videos: { 1: { id: '1', title: 'Title', isCustom: true } },
      ids: ['1'],
    };
    const action = actions.deleteCustomVideo({ videoId: '1' });
    const expectedState = {
      ...initialState,
    };
    expect(videosReducer(stateWithVideos, action)).toEqual(expectedState);
  });

  it('should handle loadYoutubeVideosSuccess action', () => {
    const videos: VideoItem[] = [
      { id: '2', title: 'Title 1', isCustom: false },
      { id: '3', title: 'Title 2', isCustom: false },
    ];
    const action = actions.loadYoutubeVideosSuccess({ videos, nextPageToken: 'next', prevPageToken: 'prev' });
    const expectedState = {
      ...initialState,
      loading: false,
      videos: {
        2: videos[0],
        3: videos[1],
      },
      ids: ['2', '3'],
      nextPageToken: 'next',
      prevPageToken: 'prev',
    };
    expect(videosReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle changePage action', () => {
    const page = 2;
    const action = actions.changePage({ page });
    const expectedState = {
      ...initialState,
      currentPage: page,
    };
    expect(videosReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addToFavorites action', () => {
    const videoId = '2';
    const action = actions.addToFavorites({ videoId });
    const expectedState = {
      ...initialState,
      favoriteVideoIds: [videoId],
    };
    expect(videosReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle deleteFromFavorites action', () => {
    const videoId = '2';
    const stateWithFavorites = {
      ...initialState,
      favoriteVideoIds: ['2'],
    };
    const action = actions.deleteFromFavorites({ videoId });
    const expectedState = {
      ...initialState,
      favoriteVideoIds: [],
    };
    expect(videosReducer(stateWithFavorites, action)).toEqual(expectedState);
  });
});
