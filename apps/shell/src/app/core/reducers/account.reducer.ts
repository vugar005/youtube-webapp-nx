import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions';

export const featureKey = 'account';

export interface AccountState {
  likedVideoList: string[];
  unLikedVideoList: string[];
  isAuthenticated: boolean;
}

const initialState: AccountState = {
  likedVideoList: [],
  unLikedVideoList: [],
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AccountActions.login, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AccountActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(AccountActions.addVideoToLikeList, (state, payload) => {
    const likedVideoId = payload.payload;
    const likedList = [...state.likedVideoList];
    likedList.push(likedVideoId);
    return {
      ...state,
      likedVideoList: likedList,
    };
  }),
  on(AccountActions.removeVideoFromLikeList, (state, payload) => {
    const likedVideoId = payload.payload;
    const likedList = [...state.likedVideoList];
    likedList.filter((videoId) => videoId !== likedVideoId);
    return {
      ...state,
      likedVideoList: likedList,
    };
  }),
  on(AccountActions.addVideoToUnLikeList, (state, payload) => {
    const unLikedVideoId = payload.payload;
    const unLikedVideoList = [...state.unLikedVideoList];
    unLikedVideoList.push(unLikedVideoId);
    return {
      ...state,
      unLikedVideoList: unLikedVideoList,
    };
  }),
  on(AccountActions.removeVideoFromUnLikeList, (state, payload) => {
    const unLikedVideoId = payload.payload;
    const unLikedVideoList = [...state.unLikedVideoList];
    unLikedVideoList.filter((videoId) => videoId !== unLikedVideoId);
    return {
      ...state,
      unLikedVideoList: unLikedVideoList,
    };
  })
);

export const selectLikedVideos = (state: AccountState) => state.likedVideoList;
export const selectUnLikedVideos = (state: AccountState) => state.unLikedVideoList;
