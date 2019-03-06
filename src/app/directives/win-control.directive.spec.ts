import { WinControlDirective } from './win-control.directive';
import { ElementRef } from '@angular/core';

describe('WinControlDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef('<div></div>');
    const directive = new WinControlDirective(el);
    expect(directive).toBeTruthy();
  });
});
