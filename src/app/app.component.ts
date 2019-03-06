import { Component, OnInit } from '@angular/core';
import { Store } from './store/store';
import { getUserInfo } from './actions/userinfo.action';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IoService } from './services/io.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @select() notifications: Observable<any>;

  private _store: any;
  constructor(
    private store: Store,
    private ioService: IoService 
  ) {
    this._store = store.appStore();
  }

  ngOnInit() {
    // need to get user info at very beginning
    this._store.dispatch(getUserInfo());
  }
}
