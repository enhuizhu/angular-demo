import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent implements OnInit, OnChanges {
  @Input() search = '';
  @Input() numberValue = '';
  @Input() nameValue = '';


  public startNumber = '';
  public startStr = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.startNumber = this.getStart(this.numberValue);
    this.startStr = this.getStart(this.nameValue);
  }

  getStart(value: string) {
    const valueStart = value.substr(0, this.search.length);

    if (this.search.toLowerCase() == valueStart.toLowerCase()) {
      return valueStart;
    }

    return '';
  }
}
