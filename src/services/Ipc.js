const electron = require('electron');
const tunnel = electron.ipcMain;
const core = require('gls-core-service');
const BasicService = core.services.Basic;
const Local = require('../controllers/Local');

class Ipc extends BasicService {
    constructor(...args) {
        super(...args);

        this._local = new Local();
    }

    async start() {
        this._handel('local.getAccounts', this._local.getAccounts, this._local);
        this._handel('local.createAccount', this._local.createAccount, this._local);
        this._handel('local.selectAccount', this._local.selectAccount, this._local);
        this._handel('local.exportAccount', this._local.exportAccount, this._local);
        this._handel('local.importAccount', this._local.importAccount, this._local);
        this._handel('local.destroyAccount', this._local.destroyAccount, this._local);
    }

    _handel(point, handler, scope) {
        tunnel.on(point, (event, data) => {
            handler.call(scope, data).then(
                (responseData) => {
                    event.sender.send(point, responseData);
                },
                error => {
                    event.sender.send(point, new Error(error));
                }
            );
        });
    }
}

module.exports = Ipc;
