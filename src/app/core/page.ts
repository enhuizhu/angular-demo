import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { recievePageTitle } from '../actions/pageTitle.action';

class Page {  
  constructor(
    private store,
    private route: ActivatedRoute, 
  ) {
    setTimeout(this.init.bind(this), 0);
  }

  init() {
    let title = '';

    if (this.route.snapshot.data.title) {
      title = this.route.snapshot.data.title;
    }

    if (!title 
      && this.route.parent
      && this.route.parent.snapshot.data.title) {
      title = this.route.parent.snapshot.data.title;
    }

    if (!title) {
      return ;
    }

    this.store.dispatch(recievePageTitle(title));
  }
}

export default Page;
