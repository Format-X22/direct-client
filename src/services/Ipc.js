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
        tunnel.on('local.createAccount', this._local.createAccount.bind(this._local));
        // TODO -
    }
}

module.exports = Ipc;
