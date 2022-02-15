export interface YoutubeSearchList {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeSearchResultItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Id {
  kind: string;
  videoId: string;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YoutubeSearchResultItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: VideoSnippet;
}
