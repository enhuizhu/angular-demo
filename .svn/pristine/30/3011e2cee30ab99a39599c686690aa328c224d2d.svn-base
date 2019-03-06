import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { uniqueId } from 'lodash';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, AfterViewInit {
  @Input() mainTitle = '';
  @Input() subTitle = '';
  @Input() bodyClass = '';
  @Input() newWinLink = '/';

  public moveId = uniqueId('widget-move');
  public openId = uniqueId('widget-open');
  public moveVisible = false;
  public openVisible = false;
  public mousedown = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.el.nativeElement.querySelector('.icon-move').addEventListener('mousedown', () => {
      this.mousedown = true;
      this.hideMoveTip();
    });

    this.el.nativeElement.querySelector('.icon-move').addEventListener('mousemove', () => {
      if (this.mousedown) {
        this.hideMoveTip();
      }
    });

    this.el.nativeElement.querySelector('.icon-move').addEventListener('mouseup', () => {
      this.mousedown = false;
    });
  }

  showMoveTip() {
    if (this.mousedown) {
      return ;
    }
    
    this.moveVisible = true;
  }

  hideMoveTip() {
    this.moveVisible = false;
  }

  toogleNewWinTip() {
    this.openVisible = !this.openVisible;
  }
}
