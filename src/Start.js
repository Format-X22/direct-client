const { app, BrowserWindow } = require('electron');

class Start {
    constructor() {
        this._mainWindow = null;
    }

    start() {
        app.on('ready', this._createMainWindow.bind(this));
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
        app.on('activate', () => {
            if (this._mainWindow === null) {
                this._createMainWindow();
            }
        });
    }

    _createMainWindow() {
        this._mainWindow = new BrowserWindow({
            width: 1024,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
            },
        });
        this._mainWindow.loadFile('./src/index.html');
        this._mainWindow.on('closed', function() {
            this._mainWindow = null;
        });
    }
}

module.exports = Start;
