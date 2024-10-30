import { ElementRef } from '@angular/core';

import { StatusDirective } from './status.directive';

describe('StatusDirective', () => {
  it('should create an instance', () => {
    const directive = new StatusDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
