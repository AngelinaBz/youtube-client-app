export interface SearchItem {
  kind: string;
  etag: string;
  id: ItemId;
  snippet: Snippet;
  statistics: Statistics;
}

export interface ItemId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Localized {
  title: string;
  description: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}
