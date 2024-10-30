import { CommonModule } from '@angular/common';
import {
  Component, computed, OnInit, signal
} from '@angular/core';
import { Store } from '@ngrx/store';

import { selectFavoriteVideos } from '../../store/selectors';
import { AppState } from '../../store/store';
import { SearchItemComponent } from '../../youtube/components/search-item/search-item.component';
import { VideoItem } from '../../youtube/models/video-item.model';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [SearchItemComponent, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent implements OnInit {
  favoritesItems = signal<VideoItem[]>([]);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectFavoriteVideos).subscribe((videos) => {
      this.favoritesItems.set(videos);
    });
  }

  favoritesItemsComputed = computed(() => this.favoritesItems());
}
