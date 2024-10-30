import { VideoItem } from './video-item.model';

export interface VideoResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
