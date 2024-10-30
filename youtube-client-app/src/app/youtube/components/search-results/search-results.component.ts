import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as actions from '../../../store/actions';
import {
  selectAllVideos, selectCurrentPage, selectNextPageToken, selectPrevPageToken
} from '../../../store/selectors';
import { AppState } from '../../../store/store';
import { VideoItem } from '../../models/video-item.model';
import { VideoResponse } from '../../models/video-response.model';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { SearchService } from '../../services/searching/search.service';
import { SortingService } from '../../services/sorting/sorting.service';
import { YoutubeApiService } from '../../services/youtube-api/youtube-api.service';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [FilterPipe, SearchItemComponent, CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  providers: [FilterPipe],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchText$!: Observable<string>;
  videoResponse!: VideoResponse;
  sortedItems!: VideoItem[];
  filterTerm = '';
  searchQuery = '';
  nextPageToken?: string;
  prevPageToken?: string;
  currentPage = 1;
  isLoading = this.youTubeApiService.isLoading$;
  isError = this.youTubeApiService.error$;

  private subscriptions: Subscription[] = [];

  constructor(
    private sortingService: SortingService,
    private filterPipe: FilterPipe,
    private searchService: SearchService,
    private store: Store<AppState>,
    private youTubeApiService: YoutubeApiService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchService.searchText$.subscribe((text) => {
        this.searchQuery = text;
        if (text.trim() !== '') {
          this.store.dispatch(actions.loadYoutubeVideos({ query: this.searchQuery }));
          this.store.select(selectNextPageToken).subscribe((token) => {
            this.nextPageToken = token;
          });
          this.store.select(selectPrevPageToken).subscribe((token) => {
            this.prevPageToken = token;
          });
          this.store.select(selectAllVideos).subscribe((videos) => {
            this.sortedItems = videos;
          });
          this.store.select(selectCurrentPage).subscribe((currentPage) => {
            this.currentPage = currentPage;
          });
        } else {
          this.nextPageToken = '';
          this.prevPageToken = '';
          this.currentPage = 1;
          this.store.dispatch(actions.changePage({ page: this.currentPage }));
          this.sortedItems = [];
        }
      }),
      this.sortingService.sortByDateDirection$.subscribe(() => this.sortByDate()),
      this.sortingService.sortByViewCountDirection$.subscribe(() => this.sortByViewCount()),
      this.sortingService.filterTermChange$.subscribe((term) => {
        this.filterTerm = term;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sortByDate() {
    this.sortedItems = this.sortingService.getSortedItemsByDate(this.sortedItems);
  }

  sortByViewCount() {
    this.sortedItems = this.sortingService.getSortedItemsByViewCount(this.sortedItems);
  }

  get filteredItems(): VideoItem[] {
    return this.filterPipe.transform(this.sortedItems, this.filterTerm);
  }

  loadNextPage() {
    if (this.nextPageToken) {
      this.store.dispatch(actions.loadYoutubeVideos({ query: this.searchQuery, pageToken: this.nextPageToken }));
      const nextPageNumber = this.currentPage + 1;
      this.store.dispatch(actions.changePage({ page: nextPageNumber }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  loadPrevPage() {
    if (this.prevPageToken) {
      this.store.dispatch(actions.loadYoutubeVideos({ query: this.searchQuery, pageToken: this.prevPageToken }));
      const prevPageNumber = this.currentPage - 1;
      this.store.dispatch(actions.changePage({ page: prevPageNumber }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
