import { TestBed, inject } from '@angular/core/testing';

import { DockerService } from './docker.service';

const winObj = function(options) {
  Object.assign(this, options);
};

winObj.prototype.addEventListener = function(eventname, callback) {
};

const fin =  {
  desktop: {
    System: {
      getMonitorInfo: function(callback) {
        callback({
          primaryMonitor: {
            availableRect: {}
          },
          nonPrimaryMonitors: [],
        });
      }
    }
  }
};

describe('DockerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DockerService]
    });
  });

  it('should be created', inject([DockerService], (service: DockerService) => {
    expect(service).toBeTruthy();
  }));

  it('doesWinExist', inject([DockerService], (service: DockerService) => {
    const testWin = new winObj({name: 't1'});
    expect(service.doesWinExist(testWin)).toBeFalsy(); 

    service.registerWin(testWin);
    expect(service.doesWinExist(testWin)).toBeTruthy();
  }));

  it('removeWin', inject([DockerService], (service: DockerService) => {
    const testWin = new winObj({name: 't1'});
    service.registerWin(testWin);
    expect(service.wins.length).toBeGreaterThan(0);
    service.removeWin('t1');
    expect(service.wins.length).toBe(0);
  }));

  // it('canSnapToTop', inject([DockerService], (service: DockerService) => {
  //   const container = {
  //     bottom: 1040,
  //     left: 0,
  //     right: 1920,
  //     top: 0
  //   };

  //   const winInfo = {
  //     top: 100,
  //     left: 100,
  //     width: 400,
  //     height: 500
  //   };

  //   expect(service.canSnapToTop(container, winInfo)).toBeTruthy();

  //   winInfo.top = 101;
  //   expect(service.canSnapToTop(container, winInfo)).toBeFalsy();
  // }));

  it('canSnapToRight', inject([DockerService], (service: DockerService) => {
    const container = {
      bottom: 1040,
      left: 0,
      right: 1920,
      top: 0
    };

    const winInfo = {
      top: 100,
      left: 100,
      width: 400,
      height: 500
    };

    expect(service.canSnapToRight(container, winInfo)).toBeFalsy();

    winInfo.left = 1510;
    expect(service.canSnapToRight(container, winInfo)).toBeTruthy();
  }));

  // it('canSnapToBottom', inject([DockerService], (service: DockerService) => {
  //   const container = {
  //     bottom: 1040,
  //     left: 0,
  //     right: 1920,
  //     top: 0
  //   };

  //   const winInfo = {
  //     top: 100,
  //     left: 100,
  //     width: 400,
  //     height: 500
  //   };

  //   expect(service.canSnapToBottom(container, winInfo)).toBeFalsy();

  //   winInfo.top = 500;
  //   expect(service.canSnapToBottom(container, winInfo)).toBeTruthy();
  // }));

  // it('canSnapToLeft', inject([DockerService], (service: DockerService) => {
  //   const container = {
  //     bottom: 1040,
  //     left: 0,
  //     right: 1920,
  //     top: 0
  //   };

  //   const winInfo = {
  //     top: 100,
  //     left: 100,
  //     width: 400,
  //     height: 500
  //   };

  //   expect(service.canSnapToLeft(container, winInfo)).toBeTruthy();

  //   winInfo.left = 500;
  //   expect(service.canSnapToLeft(container, winInfo)).toBeFalsy();
  // }));

  it('isInContainer', inject([DockerService], (service: DockerService) => {
    const container = {
      bottom: 1040,
      left: 0,
      right: 1920,
      top: 0
    };

    const winInfo = {
      top: 100,
      left: 100,
      width: 400,
      height: 500
    };

    expect(service.isInContainer(container, winInfo)).toBeTruthy();
  }));

  // it('canSnapToWinBottom', inject([DockerService], (service: DockerService) => {
  //   const mainWinInfo = {
  //     height: 433,
  //     left: 1050,
  //     top: 0,
  //     width: 366,
  //     bottom: 433,
  //     right: 1416,
  //   };

  //   const movingWinInfo = {
  //     height: 500,
  //     left: 1028,
  //     top: 435,
  //     width: 400
  //   };

  //   expect(service.canSnapToWinBottom(mainWinInfo, movingWinInfo)).toBeTruthy();

  //   movingWinInfo.left = 1418;
  //   expect(service.canSnapToWinBottom(mainWinInfo, movingWinInfo)).toBeFalsy();

  //   movingWinInfo.left = 1028;
  //   movingWinInfo.top = 550;
  //   expect(service.canSnapToWinBottom(mainWinInfo, movingWinInfo)).toBeFalsy();

  //   movingWinInfo.top = 400;
  //   expect(service.canSnapToWinBottom(mainWinInfo, movingWinInfo)).toBeFalsy();
  // }));

  // it('canSnapToWinLeft', inject([DockerService], (service: DockerService) => {
  //   const mainWinInfo = {
  //     height: 433,
  //     left: 1050,
  //     top: 0,
  //     width: 366,
  //     bottom: 433,
  //     right: 1416,
  //   };

  //   const movingWinInfo = {
  //     height: 500,
  //     left: 650,
  //     top: 0,
  //     width: 400
  //   };

  //   expect(service.canSnapToWinLeft(mainWinInfo, movingWinInfo)).toBeTruthy();

  //   movingWinInfo.left = 550;
  //   expect(service.canSnapToWinLeft(mainWinInfo, movingWinInfo)).toBeTruthy();

  //   movingWinInfo.left = 549;
  //   expect(service.canSnapToWinLeft(mainWinInfo, movingWinInfo)).toBeFalsy();

  //   movingWinInfo.left = 650;
  //   movingWinInfo.top =  435;
  //   expect(service.canSnapToWinLeft(mainWinInfo, movingWinInfo)).toBeFalsy();
  // }));

  it('canSnapToWinLeftTop', inject([DockerService], (service: DockerService) => {
    const mainWinInfo = {
      height: 433,
      left: 1050,
      top: 0,
      width: 366,
      bottom: 433,
      right: 1416,
    };

    const movingWinInfo = {
      height: 500,
      left: 650,
      top: 0,
      width: 400
    };

    expect(service.canSnapToWinLeftTop(mainWinInfo, movingWinInfo)).toBeTruthy();
  }));

  it('addToWinsArr', inject([DockerService], (service: DockerService) => {
    const wins = [
      {
        name: 't1',
      },
      {
        name: 't2'
      }
    ];

    const newWin = {
      name: 't3'
    };

    service.addToWinsArr(wins, newWin);
    expect(wins.length).toBe(3);

    service.addToWinsArr(wins, newWin);
    expect(wins.length).toBe(3);
  }));

  it('removeFromWinArr', inject([DockerService], (service: DockerService) => {
    const wins = [
      {
        name: 't1',
      },
      {
        name: 't2'
      }
    ];

    const newWin = {
      name: 't1'
    };

    const newWins = service.removeFromWinArr(wins, newWin);
    expect(newWins.length).toBe(1);
  }));
});
