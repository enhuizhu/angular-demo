declare var fin: any;

import { Directive, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import TearOutWindowService from './tear-out-window.service';
import { DockerService } from '../services/docker.service';
import { uniqueId } from 'lodash';

@Directive({
  selector: '[tearOutWindow]'
})
export class TearOutWindowDirective implements AfterViewInit, OnChanges {
  public el;
  public hiddenWindow;
  public newWin;

  @Input() config = {width: 400, height: 500};
  
  constructor(el: ElementRef, private dockerService: DockerService) { 
    this.el = el.nativeElement;
    this.hiddenWindow = TearOutWindowService.getHiddenWindow();
  }

  ngOnChanges(changes) {
    console.log('tear out changes', changes);
  }

  createWin() {
    const name =  uniqueId('oilhub-') + this.el.hash;
    const link = this.el.href;
    
    try {
      const win = new fin.desktop.Window({
        name: name,
        url: link,
        autoShow: false,
        backgroundColor: 'black',
        frame: false,
        defaultWidth: this.config.width,
        defaultHeight: this.config.height,
        shadow: true,
        opacity: 1,
      }, ()  => {
        console.log('window is created');
        // win.hide();
        win.resizeTo(this.config.width, this.config.height);
        this.newWin.created = true;

        if (this.newWin.pos) {
          this.moveAndShowNewWin(this.newWin.pos.x, this.newWin.pos.y);
        }
      });
      
      return win;
    } catch (error) {
      window.open(link, '_blank');
    }
  }

  ngAfterViewInit() {
    if (typeof fin === 'undefined') {
      return ;
    }

    this.newWin = this.createWin(); 
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (typeof fin === 'undefined') {
      return;
    } 
    
    this.el.addEventListener('dragstart', this.dragStart.bind(this));
    this.el.addEventListener('drag', this.dragging.bind(this));
    this.el.addEventListener('dragend', this.dragEnd.bind(this));
  }

  dragStart(event) {
    event.dataTransfer.effectAllowed = 'copy';
    console.log('this new win', this.newWin);
    if (!this.newWin || !this.newWin.contentWindow) {
      this.newWin = this.createWin();
    }

    this.hiddenWindow.show();
  }

  dragging(event) {
    fin.desktop.System.getMousePosition((evt) => {
      this.moveHiddenWin(evt);
    });
  }

  dragEnd(event) {
    event.preventDefault();
  
    fin.desktop.System.getMousePosition((pos) => {
      this.moveWin(pos, event);
    });
  }

  moveHiddenWin(pos) {
    const x = parseInt(pos.left, 10) - 500;
    const y = parseInt(pos.top, 10) - 400;
    
    this.hiddenWindow.moveTo(x, y);
    this.hiddenWindow.bringToFront();
  }

  moveWin(pos: any, event) {
    this.moveHiddenWin(pos);

    const x = pos.left;
    const y = pos.top;

    this.newWin.pos = {x, y};
    
    if (this.newWin.created) {
      this.moveAndShowNewWin(x, y);
    }

    this.hiddenWindow.hide();
  }

  moveAndShowNewWin(x, y) {
    this.newWin.moveTo(x, y);
    this.newWin.show();
    this.newWin.bringToFront();
    this.dockerService.registerWin(this.newWin);    
  }
}
