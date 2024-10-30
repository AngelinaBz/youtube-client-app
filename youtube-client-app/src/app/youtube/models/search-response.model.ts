import { SearchItem } from './search-item.mode';

export interface SearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: SearchItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
