declare var fin: any;

import { Injectable } from '@angular/core';
import { 
  LOCK, 
  UNLOCK, 
  SETUP_GRUOP,
  CHANGE_LOCK_STATUS,
  UNSET_GROUP 
} from '../constants/docker.constants';


@Injectable()
export class DockerService {
  public wins = [];
  public containers = [];
  public extraBounds = 30;
  public execution = 0;
  constructor() {
    this.initContainers();
    this.setupListener();
  }

  initContainers() {
    if (typeof fin === 'undefined') {
      return ;
    }

    fin.desktop.System.getMonitorInfo((info) => {
      this.containers.push(info.primaryMonitor.availableRect);
      
      info.nonPrimaryMonitors.map((monitor) => {
        this.containers.push(monitor.availableRect);
      });
    });    
  }

  setupListener() {
    if (typeof fin === 'undefined') {
      return ;
    }

    fin.desktop.InterApplicationBus.subscribe('*', CHANGE_LOCK_STATUS, (message, uuid, name) => {
      console.log('change lock status', message);
      const win = this.getWinByName(message.name);
      let mainWin;
      
      if (win.mainWin) {
        mainWin = win.mainWin;
      } else if (win.childWins) {
        mainWin = win;
      }

      if (typeof mainWin === 'undefined') {
        return ;
      }

      if (message.status === LOCK) {
        mainWin.childWins.map(child => {
          child.joinGroup(mainWin);
          child.locked = true;
        });

        mainWin.locked = true;
      } else {
        if (win.name === mainWin.name) {
          mainWin.childWins.map(child => {
            child.leaveGroup();
            child.locked = false;
          });
  
          mainWin.locked = false;
        } else {
          win.leaveGroup();
          win.locked = false;

          if (mainWin.childWins.length <= 1) {
            mainWin.locked = false;
          }
        }     
      }
    });
  }
  
  getWinByName(winName) {
    return this.wins.find(win => win.name === winName);
  }

  registerWin(win) {
    if (!this.doesWinExist(win)) {
      this.registerEvents(win);
      this.wins.push(win);
    }
  }

  doesWinExist(win) {
    for (const i in this.wins) {
      if (win.name === this.wins[i].name) {
        return true;
      }
    }

    return false;
  }

  removeWin(winName) {
    this.wins = this.wins.filter((w) => {
      return w.name !== winName;
    });
  }

  registerEvents(win) {
    win.addEventListener('bounds-changed', (event) => {      
      if (!win.boundsChangeTriggerByMoveTo) {
        this.snapToExistingWins(event, win, (snapedToWin) => {
          if (!snapedToWin) {
            this.snapToContainers(event, win);
          }
          setTimeout(this.setAllWinsVisible.bind(this), 100);
        });
      } else {
        win.boundsChangeTriggerByMoveTo = false;
        this.setAllWinsVisible();
      }  
    });

    win.addEventListener('bounds-changing', (event) => {
      if (win.locked) {
        return ;
      }

      this.canWinSnapToMainWin(win, event, (result) => {
        if (result) {
          this.setWinOpacity(result.mainWin);
        } else {
          this.setAllWinsVisible();
        }
      });
    });

    win.addEventListener('closed', (event) => {
      this.removeWin(event.name);
      
      fin.desktop.InterApplicationBus.publish(UNSET_GROUP, {
        name: event.name,
      });

      let mainWin ;

      if (win.mainWin) {
        mainWin = win.mainWin;
      } else if (win.childWins) {
        mainWin = win;
      }

      if (typeof mainWin === 'undefined') {
        return ;
      }

      if (event.name === mainWin.name) {
        mainWin.childWins.map(child => {
          child.mainWin = null;
        });
      } else {
        mainWin.childWins = this.removeFromWinArr(mainWin.childWins, event);

        if (mainWin.childWins.length < 1) {
          mainWin.locked = false;
        }
      }
    });
  }

  snapToWin(x, y, win, mainWin) {
    if (mainWin.mainWin) {
      mainWin = mainWin.mainWin;
    }
    
    if (!mainWin.childWins) {
      mainWin.childWins = [];
    }
    
    win.moveTo(x, y);
    win.boundsChangeTriggerByMoveTo = true;
    win.mainWin = mainWin;
   
    this.addToWinsArr(mainWin.childWins, win);
    
    console.log('main win locked', mainWin.locked, mainWin);
    
    fin.desktop.InterApplicationBus.publish(SETUP_GRUOP, {
      mainWin: {
        name: mainWin.name,
        status: mainWin.locked,
      },
      childWins: mainWin.childWins.map(child => {
        return {
          name: child.name,
          status: child.locked,
        };
      }),
    });
  }

  snapToExistingWins(winInfo, win, callback) {
    const snapWin = (x, y, mainWin) => {
      this.snapToWin(x, y, win, mainWin);
      callback(true);
    };

    // should check if it's already grouped
    if (win.locked && winInfo.reason === 'group') {
      callback(true);
      return ;
    } else if (win.locked && winInfo.reason === 'self') {
      callback(false);
      return ;
    }

    this.canWinSnapToMainWin(win, winInfo, (result: any) => {
      if (!result) {
        callback(false);
        
        if (win.mainWin) {
          win.mainWin.childWins = this.removeFromWinArr(win.mainWin.childWins, win);
          win.mainWin = null;
  
          fin.desktop.InterApplicationBus.publish(UNSET_GROUP, {
            name: win.name,
          });
        }
      } else {
        snapWin(result.x, result.y, result.mainWin);
      }
    });
  }

  setAllWinsVisible() {
    this.wins.map(win => {
      win.updateOptions({opacity: 1});
    });
  }

  setWinOpacity(win) {
    this.wins.map(child => {
      if (win.name === child.name) {
        child.updateOptions({opacity: 0.8});
      } else {
        child.updateOptions({opacity: 1});
      }
    });
  }

  canWinSnapToMainWin(win, winInfo, callback) {
    this.getAllWinsInfo(win).then((infos: any) => {
      for (const info of infos) {
        const mainWin = this.getWinByName(info.name);
        
        if (this.canSnapToWinLeftTop(info, winInfo)) {
          const x = info.left - winInfo.width;
          const y = info.top;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinRightTop(info, winInfo)) {
          const x = info.right;
          const y = info.top;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinLeftBottom(info, winInfo)) {
          const x = info.left;
          const y = info.bottom;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinRightBottom(info, winInfo)) {
          const x = info.right - winInfo.width;
          const y = info.bottom;
          callback({
            x, y, mainWin
          });
          return ;
        }
        
        if (this.canSnapToWinBottom(info, winInfo)) {
          const x = winInfo.left;
          const y = info.bottom;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinLeft(info, winInfo)) {
          const x = info.left - winInfo.width;
          const y = winInfo.top;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinRight(info, winInfo)) {
          const x = info.right;
          const y = winInfo.top;
          callback({
            x, y, mainWin
          });
          return ;
        }

        if (this.canSnapToWinTop(info, winInfo)) {
          const x = winInfo.left;
          const y = info.top - winInfo.height;
          callback({
            x, y, mainWin
          });
          return ;
        }
      }

      callback(false);
    });
  }


  inMainXrangeOrInMovingXrange(mainWinInfo, movingWinInfo) {
    const inMainXRange = (movingWinInfo.left >= mainWinInfo.left 
      && movingWinInfo.left <= mainWinInfo.right) ||
      (movingWinInfo.left + movingWinInfo.width >= mainWinInfo.left
      && movingWinInfo.left + movingWinInfo.width <= mainWinInfo.right);
    
    const inMovingXrange = (mainWinInfo.left >= movingWinInfo.left 
      && mainWinInfo.left <= movingWinInfo.left + movingWinInfo.width) ||
      (mainWinInfo.right >= movingWinInfo.left && 
        mainWinInfo.right <= movingWinInfo.left + movingWinInfo.width);
    
    return inMainXRange || inMovingXrange;
  }

  canSnapToWinBottom(mainWinInfo, movingWinInfo) {
    const inYRange = movingWinInfo.top > mainWinInfo.bottom 
      && movingWinInfo.top <= mainWinInfo.bottom + this.extraBounds;

    return inYRange && this.inMainXrangeOrInMovingXrange(mainWinInfo, movingWinInfo);
  }

  inMainYRangeOrInMovingYRange(mainWinInfo, movingWinInfo) {
    const movingY = movingWinInfo.top + movingWinInfo.height;
    const inMainYRange = (movingWinInfo.top >=  mainWinInfo.top 
      && movingWinInfo.top <= mainWinInfo.bottom) ||
      (movingY >= mainWinInfo.top && movingY <= mainWinInfo.bottom);
    
    const inMovingYrange = (mainWinInfo.top >= movingWinInfo.top 
      && mainWinInfo.top <= movingY) ||
      (mainWinInfo.bottom >= movingWinInfo.top && mainWinInfo.bottom <= movingY);
    
    return inMainYRange || inMovingYrange;
  }

  canSnapToWinLeft(mainWinInfo, movingWinInfo) {
    const movingX = movingWinInfo.left + movingWinInfo.width;
    const inXrange = movingX <= mainWinInfo.left
      && movingX >= mainWinInfo.left - this.extraBounds;
     
    return inXrange && this.inMainYRangeOrInMovingYRange(mainWinInfo, movingWinInfo);
  }

  canSnapToWinRight(mainWinInfo, movingWinInfo) {
    const inXrange = movingWinInfo.left >= mainWinInfo.right
      && movingWinInfo.left <= mainWinInfo.right + this.extraBounds;
        
    return inXrange && this.inMainYRangeOrInMovingYRange(mainWinInfo, movingWinInfo);
  }

  canSnapToWinTop(mainWinInfo, movingWinInfo) {
    const movingY = movingWinInfo.top + movingWinInfo.height;
    const inYRange = movingY <= mainWinInfo.top 
      && movingY >=  mainWinInfo.top - this.extraBounds;

    return inYRange && this.inMainXrangeOrInMovingXrange(mainWinInfo, movingWinInfo);
  }

  inMainWinYRange(mainWinInfo, movingWinInfo) {
    return movingWinInfo.top >= mainWinInfo.top &&
    movingWinInfo.top <= mainWinInfo.top + this.extraBounds;
  }

  canSnapToWinLeftTop(mainWinInfo, movingWinInfo) {    
    return this.inMainWinYRange(mainWinInfo, movingWinInfo) && this.canSnapToWinLeft(mainWinInfo, movingWinInfo);
  }

  canSnapToWinRightTop(mainWinInfo, movingWinInfo) {  
    return this.inMainWinYRange(mainWinInfo, movingWinInfo) && this.canSnapToWinRight(mainWinInfo, movingWinInfo);
  }

  canSnapToWinLeftBottom(mainWinInfo, movingWinInfo) {
    const inXrange = movingWinInfo.left >= mainWinInfo.left
      && movingWinInfo.left <= mainWinInfo.left + this.extraBounds;
    
    return inXrange && this.canSnapToWinBottom(mainWinInfo, movingWinInfo);
  }

  canSnapToWinRightBottom(mainWinInfo, movingWinInfo) {
    const inXrange = movingWinInfo.left + movingWinInfo.width <= mainWinInfo.right
      && movingWinInfo.left + movingWinInfo.width >= mainWinInfo.right - this.extraBounds;
    
    return inXrange && this.canSnapToWinBottom(mainWinInfo, movingWinInfo);
  }

  getAllWinsInfo(movingWin) {
    return Promise.all(this.wins.filter((win) => {
      return win.name !== movingWin.name;
    }).map((win) => {
      return new Promise((resolve, reject) => {
        win.getBounds((bounds) => {
          resolve(Object.assign({
            name: win.name
          }, bounds));
        });
      });
    }));
  }

  snapToContainers(winInfo, win) {
    for (const con of this.containers) {
      const container = con;
      
      if (this.canSnapTopRight(container, winInfo)) {
        const x = container.right - winInfo.width;
        const y = container.top;
        
        win.moveTo(x, y);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      }
      
      if (this.canSnapRightBottom(container, winInfo)) {
        const x = container.right - winInfo.width;
        const y = container.bottom - winInfo.height;
        
        win.moveTo(x, y);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      }

      if (this.canSnapLeftBottom(container, winInfo)) {
        const x = container.left;
        const y = container.bottom - winInfo.height;
        
        win.moveTo(x, y);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      }

      if (this.canSnapLeftTop(container, winInfo)) {
        const x = container.left;
        const y = container.top;
        
        win.moveTo(x, y);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      }
      
      if (this.canSnapToTop(container, winInfo)) {
        win.moveTo(winInfo.left, container.top);
        win.boundsChangeTriggerByMoveTo = true;
        return ;  
      } 

      if (this.canSnapToRight(container, winInfo)) {    
        const x = container.right - winInfo.width;
        win.moveTo(x, winInfo.top);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      } 
      
      if (this.canSnapToBottom(container, winInfo)) {
        const y = container.bottom - winInfo.height;
        win.moveTo(winInfo.left, y);
        win.boundsChangeTriggerByMoveTo = true;
        return ;
      } 
      
      if (this.canSnapToLeft(container, winInfo)) {
        win.moveTo(container.left, winInfo.top);
        win.boundsChangeTriggerByMoveTo = true;        
        return ;
      }
    }
  }

  canSnapToTop(container, winInfo) {
    return this.isInContainer(container, winInfo) 
      && winInfo.top <= container.top + this.extraBounds;
  }

  canSnapToRight(container, winInfo) {
    return this.isInContainer(container, winInfo) 
      && winInfo.left + winInfo.width >= container.right - this.extraBounds 
      && winInfo.left + winInfo.width <= container.right;
  }

  canSnapToBottom(container, winInfo) {
    return this.isInContainer(container, winInfo)
      && winInfo.top + winInfo.height >= container.bottom - this.extraBounds
      && winInfo.top + winInfo.height <= container.bottom;
  }

  canSnapToLeft(container, winInfo) {
    return this.isInContainer(container, winInfo) 
      && winInfo.left <= container.left + this.extraBounds
      && winInfo.left >= container.left;
  }

  canSnapTopRight(container, winInfo) {
    return this.canSnapToTop(container, winInfo) 
      && this.canSnapToRight(container, winInfo);
  }

  canSnapLeftTop(container, winInfo) {
    return this.canSnapToLeft(container, winInfo) 
      && this.canSnapToTop(container, winInfo);
  }

  canSnapLeftBottom(container, winInfo) {
    return this.canSnapToLeft(container, winInfo)
      && this.canSnapToBottom(container, winInfo);
  }

  canSnapRightBottom(container, winInfo) {
    return this.canSnapToRight(container, winInfo)
      && this.canSnapToBottom(container, winInfo);
  }

  isInContainer(container, winInfo) {
    const x0 = winInfo.left;
    const y0 = winInfo.top;
    const x1 = winInfo.left + winInfo.width;
    const y1 = winInfo.top + winInfo.height;

    return x0 >= container.left  && x0 <= container.right
      && y0 >= container.top && y0 <= container.bottom
      && x1 >= container.left  && x1 <= container.right
      && y1 >= container.top && y1 <= container.bottom;
  }

  addToWinsArr(wins, newWin) {
    if (!wins.find(win => win.name === newWin.name)) {
      wins.push(newWin);
    } 
  }

  removeFromWinArr(wins, newWin) {
    return wins.filter(win => {
      return win.name !== newWin.name;
    });
  }
}
