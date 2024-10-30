import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import * as actions from '../../../store/actions';
import { selectFavoriteVideoIds } from '../../../store/selectors';
import { AppState } from '../../../store/store';
import { StatusDirective } from '../../directives/status/status.directive';
import { VideoItem } from '../../models/video-item.model';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, StatusDirective, ButtonComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() item!: VideoItem;

  isFavorite!: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.select(selectFavoriteVideoIds).subscribe((ids) => {
      this.isFavorite = ids.includes(this.item.id);
    });
  }

  onItemClick() {
    this.router.navigate(['/video', this.item?.id]);
  }

  deleteCustomVideo() {
    this.store.dispatch(actions.deleteCustomVideo({ videoId: this.item.id }));
  }

  addVideoInFavorites() {
    this.store.dispatch(actions.addToFavorites({ videoId: this.item.id }));
  }

  deleteVideoFromFavorites() {
    this.store.dispatch(actions.deleteFromFavorites({ videoId: this.item.id }));
  }
}
