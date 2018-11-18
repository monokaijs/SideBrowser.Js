const {
    app,
    BrowserWindow,
	Menu,
	Tray
} = require('electron');
const electron = require('electron');
let win;
var show = true;
 
app.on('ready', () => {
	
	var browser_width = 800;
	
    win = new BrowserWindow({
		y: 0,
        width: browser_width,
        height: 900,
		frame: false
    });
	var screenElectron = electron.screen;
	var mainScreen = screenElectron.getPrimaryDisplay();
	//var allScreens = screenElectron.getAllDisplays();
	win.setPosition(mainScreen.workAreaSize.width - browser_width, 0);
	win.setSize(browser_width, mainScreen.workAreaSize.height);
	var ToggleLoop = setInterval(() => {
		var mousePos = screenElectron.getCursorScreenPoint();
		if (!show) {
			if ((mainScreen.workAreaSize.width - mousePos.x) <= 2) {
				show = true;
				win.show();
			}
		} else {
			if ((mainScreen.workAreaSize.width - mousePos.x) > browser_width) {
				win.hide();
				show = false;
			}
		}
	}, 500);
	//win.setPosition(0, 0)
 
    win.loadFile('index.html');
 
    win.on('closed', () => {
        win = null;
    });
	win.setResizable(false);
	
	
	win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
});

win.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        win.hide();
    }

    return false;
});
tray = new Tray('sbjs.ico');
var contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click:  function(){
        win.show();
    } },
    { label: 'Options', click:  function(){
        win.show();
    } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
]);
 
    tray.setToolTip('Open GitSpector')
    tray.setContextMenu(contextMenu)
});