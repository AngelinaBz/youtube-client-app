import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SortDirection } from '../../enums/enums';
import { VideoItem } from '../../models/video-item.model';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private sortByDateDirection: BehaviorSubject<SortDirection> = new BehaviorSubject<SortDirection>(SortDirection.Asc);
  private sortByViewCountDirection: BehaviorSubject<SortDirection> = new BehaviorSubject<SortDirection>(SortDirection.Asc);
  private filterTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  sortByDateDirection$: Observable<SortDirection> = this.sortByDateDirection.asObservable();
  sortByViewCountDirection$: Observable<SortDirection> = this.sortByViewCountDirection.asObservable();
  filterTermChange$: Observable<string> = this.filterTerm.asObservable();

  toggleSortByDateDirection() {
    this.sortByDateDirection.next(this.sortByDateDirection.value === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc);
  }

  toggleSortByViewCountDirection() {
    this.sortByViewCountDirection.next(
      this.sortByViewCountDirection.value === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
    );
  }

  updateFilterTerm(term: string) {
    this.filterTerm.next(term);
  }

  getSortedItemsByDate(items: VideoItem[]) {
    return items.slice().sort((a, b) => {
      const publishedAtA = a.snippet?.publishedAt || '';
      const publishedAtB = b.snippet?.publishedAt || '';
      if (this.sortByDateDirection.value === SortDirection.Asc) {
        return Date.parse(publishedAtA) - Date.parse(publishedAtB);
      }
      return Date.parse(publishedAtB) - Date.parse(publishedAtA);
    });
  }

  getSortedItemsByViewCount(items: VideoItem[]) {
    return items.slice().sort((a, b) => {
      const viewCountA = a.statistics?.viewCount || '';
      const viewCountB = b.statistics?.viewCount || '';
      if (this.sortByViewCountDirection.value === SortDirection.Asc) {
        return parseFloat(viewCountA) - parseFloat(viewCountB);
      }
      return parseFloat(viewCountB) - parseFloat(viewCountA);
    });
  }
}
