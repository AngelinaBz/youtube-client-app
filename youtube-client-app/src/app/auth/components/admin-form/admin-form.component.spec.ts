import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AdminFormComponent } from './admin-form.component';

interface MockStore {
  dispatch: jest.Mock;
  select: jest.Mock;
}

describe('AdminFormComponent', () => {
  let component: AdminFormComponent;
  let fixture: ComponentFixture<AdminFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AdminFormComponent],
      providers: [{ provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.adminForm).toBeDefined();
    expect(component.title?.value).toBe('');
    expect(component.description?.value).toBe('');
    expect(component.imageLink?.value).toBe('');
    expect(component.videoLink?.value).toBe('');
    expect(component.creationDate?.value).toBe('');
    expect(component.tags.length).toBe(1);
  });

  it('should add a tag', () => {
    component.addTag();
    expect(component.tags.length).toBe(2);
  });

  it('should not add more than 5 tags', () => {
    for (let i = 0; i < 5; i += 1) {
      component.addTag();
    }
    expect(component.tags.length).toBe(5);
    component.addTag();
    expect(component.tags.length).toBe(5);
  });

  it('should remove a tag', () => {
    component.addTag();
    expect(component.tags.length).toBe(2);
    component.removeTag(1);
    expect(component.tags.length).toBe(1);
  });
});
