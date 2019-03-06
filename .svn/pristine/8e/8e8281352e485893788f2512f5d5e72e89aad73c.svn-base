import { TestBed, inject } from '@angular/core/testing';

import { QueueService } from './queue.service';

describe('QueueService', () => {
  const testQueues = [{id: 1}, {id: 2}, {id: 3}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueueService]
    });
  });

  it('should be created', inject([QueueService], (service: QueueService) => {
    expect(service).toBeTruthy();
  }));

  it('addToQueue', inject([QueueService], (service: QueueService) => {
    const qs = [
      {id: 1},
      {id: 2}
    ];

    service.addToQueue(qs);
    expect(service.queue).toEqual(qs);

    service.addToQueue({id: 3});
    expect(service.queue).toEqual(testQueues);
  }));

  it('markQItemAsMoved', inject([QueueService], (service: QueueService) => {
    service.addToQueue(testQueues);
    service.markQItemAsMoved(1);

    expect(service.queue[0].removed).toBeTruthy();
  }));

  it('markQitemAsFailed', inject([QueueService], (service: QueueService) => {
    service.addToQueue(testQueues);
    service.markQitemAsFailed(2);

    expect(service.queue[1].faild).toBeTruthy();
  }));

  it('shouldRemoveQueue', inject([QueueService], (service: QueueService) => {
    service.addToQueue(testQueues);
    expect(service.shouldRemoveQueue()).toBeFalsy();

    service.markQItemAsMoved(1);
    expect(service.shouldRemoveQueue()).toBeFalsy();
    
    service.markQItemAsMoved(2);
    service.markQItemAsMoved(3);
    expect(service.shouldRemoveQueue()).toBeTruthy();
  }));

  it('getQueueAnalytic', inject([QueueService], (service: QueueService) => {
    service.emptyQueue();
    service.addToQueue(testQueues);
    service.markQitemAsFailed(1);

    expect(service.getQueueAnalytic()).toEqual({
      success: 0,
      fail: 1
    });

    service.markQItemAsMoved(1);
    service.markQItemAsMoved(2);
    service.markQItemAsMoved(3);

    expect(service.getQueueAnalytic()).toEqual({
      success: 2,
      fail: 1
    });
  }));
});
