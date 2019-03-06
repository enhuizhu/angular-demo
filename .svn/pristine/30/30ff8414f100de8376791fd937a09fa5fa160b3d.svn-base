declare var fin: any;

let dropTargetWindow;

try {
  dropTargetWindow = fin ? new fin.desktop.Window({
    name: 'dropTarget',
    url: 'assets/dropTarget.html',
    defaultWidth: 1000,	// small
    defaultHeight: 800,
    minWidth: 1000,
    minHeight: 800,
    defaultTop: 0,
    defaultLeft: 0,
    frame: false,
    resizable: false,
    autoShow: false,	           // created as hidden
    alwaysOnTop: false,
    showTaskbarIcon: false,   // required so hidden from task bar
    drag: false,
    shadow: false,
    opacity: 0.01	// transparent, kinda
  }, function () {
  }) : null;
} catch (e) {
  dropTargetWindow = null;
}

class TearOutWindowService {
  static getHiddenWindow() {
    return dropTargetWindow;
  }
}

export default TearOutWindowService;
