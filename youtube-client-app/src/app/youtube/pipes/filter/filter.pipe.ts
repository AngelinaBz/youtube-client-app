import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from '../../models/video-item.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: VideoItem[], filterTerm: string): VideoItem[] {
    if (!filterTerm) {
      return items;
    }
    return items.filter((item) => item.snippet?.title.toLowerCase().includes(filterTerm.toLowerCase()));
  }
}
