import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { DxAutocompleteComponent } from 'devextreme-angular';
import { Autocompelete } from '../../core/autocompelete';
import { QueryService } from '../../services/query.service';


@Component({
  selector: 'app-autocomplete-strategy',
  templateUrl: './autocomplete-strategy.component.html',
  styleUrls: ['./autocomplete-strategy.component.scss']
})
export class AutocompleteStrategyComponent extends Autocompelete implements OnInit {
  @Input() delay = 500;
  @Input() data: any = {};
  @Output() changeCallbck: EventEmitter<any> = new EventEmitter<any>();

  public selectedStrategy = '';
  
  constructor(
    queryService: QueryService
  ) { 
    super(queryService);
  }

  ngOnInit() {
    this.selectedStrategy = this.data.StrategyRef;
  }

  onValueChanged(e) {
    const obj = {
      newData: {
        StrategyRef: e.itemData.Number,
      },

      original: this.data      
    };

    setTimeout(() => {
      this.changeCallbck.emit(obj);
      this.clear();
    }, 100);
  }
}
