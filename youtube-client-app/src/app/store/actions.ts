import { createAction, props } from '@ngrx/store';

import { VideoItem } from '../youtube/models/video-item.model';

export const addCustomVideo = createAction('[Video] Add Custom Video', props<{ video: VideoItem }>());
export const deleteCustomVideo = createAction('[Video] Delete Custom Video', props<{ videoId: string }>());
///
export const loadYoutubeVideos = createAction('[Videos] Load Videos', props<{ query: string; pageToken?: string }>());
export const loadYoutubeVideosSuccess = createAction(
  '[Videos] Load Videos Success',
  props<{ videos: VideoItem[]; nextPageToken?: string; prevPageToken?: string }>(),
);
export const loadYoutubeVideosFailure = createAction('[Videos] Load Videos Failure', props<{ error: string }>());
///
export const addToFavorites = createAction('[Video] Add Video To Favorites', props<{ videoId: string }>());
export const deleteFromFavorites = createAction('[Video] Delete Video From Favorites', props<{ videoId: string }>());
///
export const changePage = createAction('[Video] Change Page', props<{ page: number }>());
