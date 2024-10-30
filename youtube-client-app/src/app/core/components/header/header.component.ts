import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, filter, Subject
} from 'rxjs';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SearchService } from '../../../youtube/services/searching/search.service';
import { SortingComponent } from './sorting/sorting.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ButtonComponent, SortingComponent, UserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {}

  private searchSubject = new Subject<string>();

  showSorting = false;

  searchText: string = '';

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((text) => text.length >= 3 || text.length === 0),
      )
      .subscribe((text) => {
        this.searchService.setSearchText(text);
        this.router.navigate(['/main']);
      });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onInputChange() {
    this.searchSubject.next(this.searchText);
  }

  showSortingBlock() {
    this.showSorting = !this.showSorting;
  }
}
