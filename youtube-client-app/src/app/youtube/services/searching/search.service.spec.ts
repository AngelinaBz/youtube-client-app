import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearcService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial searchText as an empty string', (done) => {
    service.searchText$.subscribe((text) => {
      expect(text).toBe('');
      done();
    });
  });

  it('should set and emit new searchText', (done) => {
    const newText = 'new search text';

    service.setSearchText(newText);

    service.searchText$.subscribe((text) => {
      expect(text).toBe(newText);
      done();
    });
  });

  it('should handle multiple searchText changes correctly', (done) => {
    const text1 = 'first search text';
    const text2 = 'second search text';

    let subscriptionCallCount = 0;

    service.searchText$.subscribe((text) => {
      subscriptionCallCount += 1;
      if (subscriptionCallCount === 1) {
        expect(text).toBe('');
        service.setSearchText(text1);
      } else if (subscriptionCallCount === 2) {
        expect(text).toBe(text1);
        service.setSearchText(text2);
      } else if (subscriptionCallCount === 3) {
        expect(text).toBe(text2);
        done();
      }
    });
  });
});
