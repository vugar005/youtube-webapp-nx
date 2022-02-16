import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVideo from './core/reducers/video.reducer';
import * as fromAccount from './core/reducers/account.reducer';
import { InjectionToken } from '@angular/core';

export interface AppState {
  [fromVideo.featureKey]: fromVideo.VideoState;
  [fromAccount.featureKey]: fromAccount.AccountState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromVideo.featureKey]: fromVideo.reducer,
    [fromAccount.featureKey]: fromAccount.reducer,
  }),
});

// Video state selectors
export const selectVideoState = createFeatureSelector<fromVideo.VideoState>(fromVideo.featureKey);
export const selectVideoSearchQuery = createSelector(selectVideoState, fromVideo.selectSearchQuery);

// Account state selectors
export const selectAccountState = createFeatureSelector<fromAccount.AccountState>(fromAccount.featureKey);
export const selectLikedVideos = createSelector(selectAccountState, fromAccount.selectLikedVideos);
export const selectDislikedVideos = createSelector(selectAccountState, fromAccount.selectDislikedVideos);
