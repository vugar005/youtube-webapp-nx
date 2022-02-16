export interface CustomEventConfig {
  detail?: any;
  view?: boolean;
  bubbles?: boolean;
  cancelable?: boolean;
}

export enum WatchAPPEvents {
  ADD_VIDEO_TO_LIKE_LIST = `WATCH_APP: Add Video to Liked List`,
  REMOVE_VIDEO_FROM_LIKE_LIST = `WATCH_APP: Remove Video from Liked List`,
  ADD_VIDEO_TO_UNLIKE_LIST = `WATCH_APP: Add Video to UnLiked List`,
  REMOVE_VIDEO_FROM_UNLIKE_LIST = `WATCH_APP: Remove Video from UnLiked List`,
}
