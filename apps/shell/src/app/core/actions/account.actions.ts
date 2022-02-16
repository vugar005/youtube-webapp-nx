import { createAction, props } from '@ngrx/store';

export const login = createAction('[Account] Login');
export const logout = createAction('[Account] Logout');

export const addVideoToLikeList = createAction('[Account] Add video to Liked list', props<{ payload: string }>());
export const removeVideoFromLikeList = createAction(
  '[Account] Remove video from Liked list',
  props<{ payload: string }>()
);

export const addVideoToUnLikeList = createAction('[Account] Add video to UnLiked list', props<{ payload: string }>());
export const removeVideoFromUnLikeList = createAction(
  '[Account] Remove video from UnLiked list',
  props<{ payload: string }>()
);
