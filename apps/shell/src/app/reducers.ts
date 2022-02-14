import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './core/reducers/auth.reducers';
import * as fromVideo from './core/reducers/video.reducer';
import { InjectionToken } from '@angular/core';

export interface AppState {
  [fromAuth.featureKey]: fromAuth.AuthState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromAuth.featureKey]: fromAuth.reducer,
    [fromVideo.featureKey]: fromVideo.reducer
  }),
});

export const selectVideoState = createFeatureSelector<fromVideo.VideoState>(fromVideo.featureKey);

export const selectVideoSearchQuery = createSelector(selectVideoState, fromVideo.selectSearchQuery);