import { Action, ActionReducer } from '@ngrx/store';

import { videosReducer, VideosState } from './reducers';

export interface AppState {
  app: VideosState;
}

export interface AppStore {
  app: ActionReducer<VideosState, Action>;
}

export const appStore: AppStore = {
  app: videosReducer,
};
