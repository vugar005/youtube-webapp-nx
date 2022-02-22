export interface CustomEventConfig {
  detail?: any;
  view?: boolean;
  bubbles?: boolean;
  cancelable?: boolean;
}

export enum WatchAPPEvents {
  TOGGLE_LIKE_VIDEO = `WATCH_APP: Toggle Like Video`,
  TOGGLE_DISLIKE_VIDEO = `WATCH_APP: Toggle Dislike Video`,
  ENABLE_MINIPLAYER = `WATCH:APP: Enable MiniPlayer`,
}

export enum LikedAppEvent {
  WATCH_VIDEO = `LIKED_APP: Watch Video`,
}
