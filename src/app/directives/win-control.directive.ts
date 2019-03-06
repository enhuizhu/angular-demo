declare var fin: any;

import { Directive,  ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[WinControl]'
})
export class WinControlDirective {
  @Input() operation;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();

  public isFull;

  constructor(private el: ElementRef) { 
    if (typeof fin === 'undefined') {
      return ;
    }

    el.nativeElement.addEventListener('click', (e) => {
      const selfWin = fin.desktop.Window.getCurrent();

      switch (this.operation) {
        case 'minimize':
          selfWin.minimize();
          break;
        case 'fullscreen':
          selfWin.getState((state) => {
            if (state === 'maximized') {
              selfWin.restore();
              this.callback.emit('normal');
            } else {
              selfWin.maximize();
              this.callback.emit('maximized');
            }
          });
   
          break;
        case 'close':
          selfWin.close();
          break;
        default:
          console.error('unsupported operation');
          break;
      }
    });
  }

}
