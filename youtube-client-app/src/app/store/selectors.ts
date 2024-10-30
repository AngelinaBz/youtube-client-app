import { createSelector } from '@ngrx/store';

import { AppState } from './store';

export const selectVideos = (state: AppState) => state.app;

export const selectAllVideos = createSelector(selectVideos, (state) => {
  const customVideos = state.ids.filter((id) => state.videos[id].isCustom).map((id) => state.videos[id]);
  const apiVideos = state.ids.filter((id) => !state.videos[id].isCustom).map((id) => state.videos[id]);
  if (state.currentPage === 1) {
    return [...customVideos, ...apiVideos].slice(0, 20);
  }
  return [...apiVideos].slice(0, 20);
});
///
export const selectFavoriteVideoIds = createSelector(selectVideos, (state) => state.favoriteVideoIds);
export const selectFavoriteVideos = createSelector(selectVideos, (state) => state.favoriteVideoIds.map((id) => state.videos[id]));
///
export const selectNextPageToken = createSelector(selectVideos, (state) => state.nextPageToken);
export const selectPrevPageToken = createSelector(selectVideos, (state) => state.prevPageToken);
export const selectCurrentPage = createSelector(selectVideos, (state) => state.currentPage);
///
