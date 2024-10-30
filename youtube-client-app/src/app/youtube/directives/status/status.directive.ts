import {
  Directive, ElementRef, Input, OnInit
} from '@angular/core';

import { BorderColor } from '../../enums/enums';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const DAYS_IN_SIX_MONTHS = 180;

@Directive({
  selector: '[appStatus]',
  standalone: true,
})
export class StatusDirective implements OnInit {
  @Input('appStatus') publishedAt!: string | undefined;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.setStatusColor();
  }

  setStatusColor() {
    if (this.publishedAt) {
      const datePublished = new Date(this.publishedAt);
      const currentDate = new Date();
      const diffInDays = Math.floor(
        (currentDate.getTime() - datePublished.getTime()) / (MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR * HOURS_IN_DAY),
      );

      let color = '';

      if (diffInDays < DAYS_IN_WEEK) {
        color = BorderColor.Blue;
      } else if (diffInDays >= DAYS_IN_WEEK && diffInDays < DAYS_IN_MONTH) {
        color = BorderColor.Green;
      } else if (diffInDays >= DAYS_IN_MONTH && diffInDays <= DAYS_IN_SIX_MONTHS) {
        color = BorderColor.Yellow;
      } else {
        color = BorderColor.Red;
      }

      this.element.nativeElement.style.backgroundColor = color;
    }
  }
}
