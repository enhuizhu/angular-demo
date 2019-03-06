import { Injectable } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { clone } from 'lodash'; 

@Injectable()
export class QueueService {
  public queue = [];
  constructor() { }

  addToQueue(qs) {
    this.queue = this.queue.concat(JSON.parse(JSON.stringify(qs)));
  }

  markQItemAsMoved(qId) {
    const qItem = this.queue.find(item => item.id == qId);
    
    if (qItem) {
      qItem.removed = true;
    }
  }

  markQitemAsFailed(qId) {
    const qItem = this.queue.find(item => item.id == qId);

    if (qItem) {
      qItem.faild = true;
    }
  }

  shouldRemoveQueue() {
    for (const key in this.queue) {
      if (!this.queue[key].removed) {
        return false;
      }
    }

    return true;
  }

  emptyQueue() {
    this.queue = [];
  }

  getQueueAnalytic() {
    const analyticResult = {
      success: 0,
      fail: 0
    };

    this.queue.forEach(qItem => {
      if (qItem.removed && !qItem.faild) {
        analyticResult.success += 1;
      }

      if (qItem.faild) {
        analyticResult.fail += 1;
      }
    });

    return analyticResult;    
  }
}
