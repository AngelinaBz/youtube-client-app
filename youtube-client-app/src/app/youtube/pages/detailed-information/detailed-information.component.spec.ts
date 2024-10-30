import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import * as actions from '../../../store/actions';
import { AppState } from '../../../store/store';
import { VideoItem } from '../../models/video-item.model';
import { DetailedInformationComponent } from './detailed-information.component';

describe('DetailedInformationComponent', () => {
  let component: DetailedInformationComponent;
  let fixture: ComponentFixture<DetailedInformationComponent>;
  let store: MockStore<AppState>;
  let router: Router;
  const initialState = {
    favorites: {
      favoriteVideoIds: [],
    },
    videos: {
      videos: {
        'test-id': { id: 'test-id', title: 'Test Video' } as VideoItem,
      },
    },
  };

  beforeEach(async () => {
    const mockActivatedRoute = {
      params: of({ id: 'test-id' }),
    };

    const mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DetailedInformationComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedInformationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct itemID from route params', () => {
    expect(component.itemID()).toBe('test-id');
  });

  it('should dispatch correct actions on add/remove from favorites', () => {
    jest.spyOn(store, 'dispatch');

    component.item = { id: 'test-id' } as VideoItem;

    component.addVideoInFavorites();
    expect(store.dispatch).toHaveBeenCalledWith(actions.addToFavorites({ videoId: 'test-id' }));

    component.deleteVideoFromFavorites();
    expect(store.dispatch).toHaveBeenCalledWith(actions.deleteFromFavorites({ videoId: 'test-id' }));
  });

  it('should dispatch delete custom video action', () => {
    jest.spyOn(store, 'dispatch');

    component.item = { id: 'test-id' } as VideoItem;

    component.deleteCustomVideo();
    expect(store.dispatch).toHaveBeenCalledWith(actions.deleteCustomVideo({ videoId: 'test-id' }));
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });
});
