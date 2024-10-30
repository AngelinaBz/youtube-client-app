import { CommonModule } from '@angular/common';
import {
  Component, computed, OnInit, signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import * as actions from '../../../store/actions';
import { selectFavoriteVideoIds, selectVideos } from '../../../store/selectors';
import { AppState } from '../../../store/store';
import { StatusDirective } from '../../directives/status/status.directive';
import { VideoItem } from '../../models/video-item.model';

@Component({
  selector: 'app-detailed-information',
  standalone: true,
  imports: [RouterLink, CommonModule, StatusDirective, ButtonComponent],
  templateUrl: './detailed-information.component.html',
  styleUrl: './detailed-information.component.scss',
})
export class DetailedInformationComponent implements OnInit {
  itemID = signal<string>('');

  item?: VideoItem;

  isFavorite = signal<boolean>(false);

  favoriteVideoIds = toSignal(this.store.select(selectFavoriteVideoIds));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemID.set(params['id']);
      this.loadItemData();
    });
  }

  loadItemData() {
    this.store.select(selectVideos).subscribe((state) => {
      this.item = state.videos[this.itemID()];
      if (this.item) {
        const favoriteVideos = this.favoriteVideoIds();
        if (favoriteVideos) {
          this.isFavorite.set(favoriteVideos.includes(this.item?.id));
        }
      }
    });
  }

  isFavoriteComputed = computed(() => this.isFavorite());

  deleteCustomVideo() {
    if (this.item) {
      this.store.dispatch(actions.deleteCustomVideo({ videoId: this.item?.id }));
      this.router.navigate(['/main']);
    }
  }

  addVideoInFavorites() {
    if (this.item) {
      this.store.dispatch(actions.addToFavorites({ videoId: this.item?.id }));
    }
  }

  deleteVideoFromFavorites() {
    if (this.item) {
      this.store.dispatch(actions.deleteFromFavorites({ videoId: this.item?.id }));
    }
  }
}
