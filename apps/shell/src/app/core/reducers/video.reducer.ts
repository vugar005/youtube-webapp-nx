import { createReducer, on } from '@ngrx/store';
import { VideoActions } from '../actions';

export const featureKey = 'video';

export interface VideoState {
  searchQuery: string;
}

const initialState: VideoState = {
  searchQuery: '',
};

export const reducer = createReducer(
  initialState,
  on(VideoActions.setVideoSearchQuery, (state, action) => ({
    ...state,
    searchQuery: action.payload,
  }))
);

export const selectSearchQuery = (state: VideoState) => state.searchQuery;
