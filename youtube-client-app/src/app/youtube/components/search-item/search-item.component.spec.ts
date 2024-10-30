import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SearchItemComponent } from './search-item.component';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;
  const initialState = { favorites: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchItemComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 'test-id',
      snippet: {
        title: 'Test Title',
        description: 'Test Description',
        publishedAt: 'Test Data',
        thumbnails: {
          medium: {
            url: 'Test URL',
          },
          standard: {
            url: 'Test URL',
          },
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
