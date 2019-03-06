import { Component, OnInit, Input } from '@angular/core';
import { Autocompelete } from '../../core/autocompelete'; 
import { QueryService } from '../../services/query.service';


@Component({
  selector: 'app-tag-autocompelete-strategy',
  templateUrl: './tag-autocompelete-strategy.component.html',
  styleUrls: ['./tag-autocompelete-strategy.component.scss']
})
export class TagAutocompeleteStrategyComponent extends Autocompelete implements OnInit {
  @Input() delay = 500;
  @Input() searchExpr = ['Number', 'Name'];
  @Input() displayExpr = 'Number';
  @Input() valueExpr = 'Number';
  @Input() highLightFirstPart  = 'Number';
  @Input() highLightSecondPart  = 'Name';
  @Input() dataServiceName = 'getStrategiesStartWith';
  @Input() key = '';
  @Input() getAllRecord = false;
  @Input() value = [];

  public selectedItems = [];

  constructor(
    queryService: QueryService
  ) { 
    super(queryService);
  }

  valuesChange(data) {
    this.selectedItems = data.value;
    this.clear();
  }
}
