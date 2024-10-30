import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SortParameter } from '../../../../youtube/enums/enums';
import { SortingService } from '../../../../youtube/services/sorting/sorting.service';
import { SortingComponent } from './sorting.component';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;
  let sortingService: jest.Mocked<SortingService>;

  beforeEach(async () => {
    const sortingServiceMock = {
      toggleSortByDateDirection: jest.fn(),
      toggleSortByViewCountDirection: jest.fn(),
      updateFilterTerm: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, SortingComponent],
      providers: [{ provide: SortingService, useValue: sortingServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    sortingService = TestBed.inject(SortingService) as jest.Mocked<SortingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeSortParameter as empty string', () => {
    expect(component.activeSortParameter).toBe('');
  });

  it('should toggleSortByDateDirection and set activeSortParameter to Date', () => {
    component.toggleSortByDateDirection();
    expect(sortingService.toggleSortByDateDirection).toHaveBeenCalled();
    expect(component.activeSortParameter).toBe(SortParameter.Date);
  });

  it('should toggleSortByViewCountDirection and set activeSortParameter to ViewCount', () => {
    component.toggleSortByViewCountDirection();
    expect(sortingService.toggleSortByViewCountDirection).toHaveBeenCalled();
    expect(component.activeSortParameter).toBe(SortParameter.ViewCount);
  });

  it('should call updateFilterTerm on filter term change', () => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value = 'new filter term';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(sortingService.updateFilterTerm).toHaveBeenCalledWith('new filter term');
  });
});
