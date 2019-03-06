declare var fin: any;

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { 
  LOCK, 
  UNLOCK, 
  SETUP_GRUOP,
  CHANGE_LOCK_STATUS,
  UNSET_GROUP,
} from '../../constants/docker.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  
  @select() pageTitle: Observable<any>;
  @select() userInfo: Observable<any>;
  
  public lockWin;
  public showLockButton;
  public selfWin;
  public groupWins;
  public searchOptions;
  public isFullScreen;
  
  constructor(private ref: ChangeDetectorRef) {
    this.lockWin = false;
    this.showLockButton = false;
    this.selfWin = {};
    this.initSelfwin();
    this.setupListener();
    this.setFullScreenState();
    this.groupWins = null;
    
    this.searchOptions = [
      {
        id: '70080808',
        category: 'TRADE',
        price: '$1234',
        status: 'BOOKED'
      },
      {
        id: '56564654631',
        category: 'CONTRACT',
        price: '$1234',
        status: 'SENT'
      },
      {
        id: '461314654',
        category: 'STRATEGY',
        price: '$1234',
        status: 'BOOKED'
      }
    ];

  }

  setFullScreenState() {
    if (typeof fin === 'undefined') {
      return ;
    }

    this.selfWin.getState((state) => {
      this.isFullScreen = state  === 'maximized';
      this.ref.detectChanges();
    });
  }

  init() {
    if (typeof fin === 'undefined') {
      return ;
    }

    this.initSelfwin();
    this.setupListener();
  }

  setupListener() {
    if (typeof fin === 'undefined') {
      return ;
    }

    fin.desktop.InterApplicationBus.subscribe('*', SETUP_GRUOP, (message, uuid, name) => {
      const setupGroup = (status) => {
        this.updateLockButtonStatus(true);
        this.updateLockStatus(status);
        this.groupWins = message;
      };
      
      if (message.mainWin.name === this.selfWin.name) {
        setupGroup(message.mainWin.status);  
      } else {
        message.childWins.map(child => {
          if (child.name === this.selfWin.name) {
            setupGroup(child.status);
          }
        });
      }
    });

    fin.desktop.InterApplicationBus.subscribe('*', CHANGE_LOCK_STATUS, (message, uuid, name) => {
      if (this.groupWins) {
        if (this.groupWins.mainWin.name === message.name) {
          this.updateLockStatus(message.status === LOCK);
        } else {
          if (message.status === UNLOCK) {
            if (message.name === this.selfWin.name || 
              (this.groupWins.childWins.length <= 1 
              && this.groupWins.mainWin.name === this.selfWin.name)) {
              this.updateLockStatus(false);
            }
          } else {
            this.groupWins.childWins.map(win => {
              if (win.name === message.name) {
                this.updateLockStatus(message.status === LOCK);
              }
            });
          }
        }
      }
    });

    fin.desktop.InterApplicationBus.subscribe('*', UNSET_GROUP, (message, uuid, name) => {
      const unsetAll = () => {
        this.groupWins = null;
        this.updateLockStatus(false);
        this.updateLockButtonStatus(false);
      };

      if (this.groupWins) {
        if (this.groupWins.mainWin.name === message.name || message.name === this.selfWin.name) {
          unsetAll();
        } else {
          this.groupWins.childWins = this.groupWins.childWins.filter(win => {
            return win.name !== message.name;
          });

          if (this.groupWins.childWins.length < 1) {
            unsetAll();
          }
        }
      }
    });
  }

  initSelfwin() {
    if (typeof fin === 'undefined') {
      return ;
    }

    this.selfWin = fin.desktop.Window.getCurrent();
  }

  toggleLock() {
    fin.desktop.InterApplicationBus.publish(CHANGE_LOCK_STATUS, {
      status: this.lockWin ? UNLOCK : LOCK,
      name: this.selfWin.name,
    });
  }

  updateLockButtonStatus(newStatus) {
    this.showLockButton = newStatus;
    this.ref.detectChanges();
  }

  updateLockStatus(newStatus) {
    this.lockWin = newStatus;
    this.ref.detectChanges();
  }

  search(data) {
    console.log('callback data:', data);
  }

  changeWinSize(state) {
    this.setFullScreenState();
  }

}
