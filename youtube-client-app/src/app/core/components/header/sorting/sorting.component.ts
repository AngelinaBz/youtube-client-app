import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SortParameter } from '../../../../youtube/enums/enums';
import { SortingService } from '../../../../youtube/services/sorting/sorting.service';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent {
  activeSortParameter = '';

  constructor(public sortingService: SortingService) {}

  toggleSortByDateDirection() {
    this.sortingService.toggleSortByDateDirection();
    this.activeSortParameter = SortParameter.Date;
  }

  toggleSortByViewCountDirection() {
    this.sortingService.toggleSortByViewCountDirection();
    this.activeSortParameter = SortParameter.ViewCount;
  }

  onFilterTermChange(event: Event) {
    const filterTerm = (event.target as HTMLInputElement).value;
    this.sortingService.updateFilterTerm(filterTerm);
  }
}
