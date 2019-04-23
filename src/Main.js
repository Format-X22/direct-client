const electron = require('electron');
const app = electron.app;
const Window = electron.BrowserWindow;
const core = require('gls-core-service');
const stats = core.utils.statsClient;
const BasicMain = core.services.BasicMain;

class Main extends BasicMain {
    constructor() {
        super(stats);

        this.addNested(); // TODO -
        this._mainWindow = null;
    }

    async boot() {
        app.on('ready', this._createMainWindow.bind(this));
        app.on('window-all-closed', () => app.quit());
        app.on('activate', () => {
            if (this._mainWindow === null) {
                this._createMainWindow();
            }
        });
    }

    _createMainWindow() {
        this._mainWindow = new Window({
            width: 1024,
            height: 600,
            webPreferences: {},
        });
        this._mainWindow.loadFile('./src/view/index.html');
        this._mainWindow.on('closed', function() {
            this._mainWindow = null;
        });
    }
}

module.exports = Main;
