import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent {
  @Output() closeCallback: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveCallback: EventEmitter<any> = new EventEmitter<any>();
  @Input() hasSearchName = false;
  @Input() originalSearchName = '';

  public EXSIT = 'exsit';
  public NEW = 'new';
  
  public form = new FormGroup({
    updateExsit: new FormControl(this.EXSIT),
    searchName: new FormControl()
  });

  constructor() { }

  save() {
    const searchName = this.isUpdate() ? 
      this.originalSearchName : 
      this.form.value.searchName;

    this.saveCallback.emit(searchName);
    this.cancel();
  }

  isUpdate() {
    return this.hasSearchName 
      && this.form.value.updateExsit == this.EXSIT;
  }

  close() {
    this.closeCallback.emit();
  }

  cancel() {
    this.form.setValue({
      updateExsit: this.EXSIT,
      searchName: '',
    });

    this.closeCallback.emit();
  }
}
