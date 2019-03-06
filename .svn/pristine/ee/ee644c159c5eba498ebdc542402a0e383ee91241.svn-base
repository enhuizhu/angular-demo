declare var fin: any;

import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { DockerService} from '../services/docker.service';

@Directive({
  selector: '[openInNewWin]'
})
export class OpenInNewWinDirective implements OnChanges {
  el: ElementRef;
  
  @Input() config = {width: 400, height: 500};
  @Input() link = '';

  constructor(el: ElementRef, private dockerService: DockerService) { 
    this.el = el;
    this.setupEvents();
  }

  ngOnChanges(changes) {
    console.log('changes', changes);
  }

  setupEvents() {
    this.el.nativeElement.addEventListener('click', (e) => {
      e.preventDefault();
      // get link value
      const link = this.link || this.el.nativeElement.href;
      
      try {
        console.log('config', this.config);
        const name = 'oilhub-' + this.el.nativeElement.hash;

        const win = new fin.desktop.Window({
          name: name,
          url: link,
          autoShow: false,
          backgroundColor: 'black',
          frame: false,
          defaultWidth: this.config.width,
          defaultHeight: this.config.height,
          defaultTop: 0,
          defaultLeft: 0,
          shadow: true,
        }, () => {
          console.log('open', link);
          win.resizeTo(this.config.width, this.config.height);
          win.show();
          this.dockerService.registerWin(win);
        });
      } catch (error) {
        window.open(link, '_blank');
      }
    });
  }
}
