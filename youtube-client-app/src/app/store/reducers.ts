import { createReducer, on } from '@ngrx/store';

import { VideoItem } from '../youtube/models/video-item.model';
import * as actions from './actions';

export interface VideosState {
  videos: { [id: string]: VideoItem };
  ids: string[];
  favoriteVideoIds: string[];
  loading: boolean;
  error: string;
  nextPageToken?: string;
  prevPageToken?: string;
  currentPage: number;
}

export const initialState: VideosState = {
  videos: {},
  ids: [],
  favoriteVideoIds: [],
  loading: false,
  error: '',
  currentPage: 1,
};

export const videosReducer = createReducer(
  initialState,
  on(actions.addCustomVideo, (state, { video }) => {
    const newVideos = { ...state.videos, [video.id]: video };
    return {
      ...state,
      videos: newVideos,
      ids: [...state.ids, video.id],
    };
  }),
  on(actions.deleteCustomVideo, (state, { videoId }) => {
    const { [videoId]: removed, ...rest } = state.videos;
    return {
      ...state,
      videos: rest,
      ids: state.ids.filter((existingId) => existingId !== videoId),
    };
  }),
  on(actions.loadYoutubeVideos, (state) => ({ ...state, loading: true, error: '' })),
  on(actions.loadYoutubeVideosSuccess, (state, { videos, nextPageToken, prevPageToken }) => {
    const customVideoIds = state.ids.filter((id) => state.videos[id].isCustom);
    const newVideos = videos.reduce(
      (acc, video) => {
        acc[video.id] = video;
        return acc;
      },
      { ...state.videos },
    );
    return {
      ...state,
      loading: false,
      videos: newVideos,
      ids: [...customVideoIds, ...videos.map((video) => video.id)],
      nextPageToken,
      prevPageToken,
    };
  }),
  on(actions.loadYoutubeVideosFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(actions.changePage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(actions.addToFavorites, (state, { videoId }) => ({
    ...state,
    favoriteVideoIds: [...state.favoriteVideoIds, videoId],
  })),
  on(actions.deleteFromFavorites, (state, { videoId }) => ({
    ...state,
    favoriteVideoIds: state.favoriteVideoIds.filter((id) => id !== videoId),
  })),
);
