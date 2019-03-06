import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../store/store';
import Page from '../../core/page';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends Page implements OnInit {

  constructor(
    store: Store,
    route: ActivatedRoute, 
  ) { 
    super(store.appStore(), route);
  }

  ngOnInit() {
  }
}
