import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import * as actions from '../../../store/actions';
import { selectAllVideos } from '../../../store/selectors';
import { AppState } from '../../../store/store';
import { VideoItem } from '../../../youtube/models/video-item.model';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.scss',
})
export class AdminFormComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.adminForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(255)]],
      imageLink: ['', [Validators.required]],
      videoLink: ['', [Validators.required]],
      creationDate: ['', [Validators.required, this.creationDateValidator]],
      tags: this.fb.array([this.createTag()], Validators.maxLength(5)),
    });
  }

  get title() {
    return this.adminForm.get('title');
  }

  get description() {
    return this.adminForm.get('description');
  }

  get imageLink() {
    return this.adminForm.get('imageLink');
  }

  get videoLink() {
    return this.adminForm.get('videoLink');
  }

  get creationDate() {
    return this.adminForm.get('creationDate');
  }

  get tags(): FormArray {
    return this.adminForm.get('tags') as FormArray;
  }

  get isValid() {
    return this.adminForm.valid;
  }

  creationDateValidator(control: AbstractControl) {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate > today) {
      return { invalidDate: 'The date is invalid' };
    }
    return null;
  }

  createTag(): FormGroup {
    return this.fb.group({
      tagName: ['', Validators.required],
    });
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const video: VideoItem = {
        id: String(Date.now()),
        snippet: {
          title: this.adminForm.value.title,
          description: this.adminForm.value.description,
          thumbnails: { medium: { url: this.adminForm.value.imageLink }, standard: { url: this.adminForm.value.videoLink } },
          publishedAt: String(this.adminForm.value.creationDate),
          tags: this.adminForm.value.tags.map((tag: { tagName: string }) => tag.tagName),
        },
        isCustom: true,
      };
      this.store.dispatch(actions.addCustomVideo({ video }));
      this.store.select(selectAllVideos).subscribe((videos) => {
        console.log(videos);
      });
    }
    this.onReset();
  }

  onReset() {
    this.adminForm.reset();
    this.tags.clear();
    this.tags.push(this.createTag());
  }
}
