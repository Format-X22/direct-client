const electron = require('electron');
const tunnel = electron.ipcMain;
const core = require('gls-core-service');
const BasicService = core.services.Basic;
const Local = require('../controllers/Local');
const Node = require('../controllers/Node');

class Ipc extends BasicService {
    constructor(...args) {
        super(...args);

        this._local = new Local();
        this._node = new Node();
    }

    async start() {
        this._handel('local.getAccounts', this._local.getAccounts, this._local);
        this._handel('local.createAccount', this._local.createAccount, this._local);
        this._handel('local.selectAccount', this._local.selectAccount, this._local);
        this._handel('local.importAccount', this._local.importAccount, this._local);
        this._handel('local.deleteAccount', this._local.deleteAccount, this._local);

        this._handel('node.sync', this._node.sync, this._node);
        this._handel('node.add', this._node.add, this._node);
        this._handel('node.remove', this._node.remove, this._node);
        this._handel('node.addDefault', this._node.addDefault, this._node);
        this._handel('node.addKnown', this._node.addKnown, this._node);
        this._handel('node.removeKnown', this._node.removeKnown, this._node);
    }

    _handel(point, handler, scope) {
        tunnel.on(point, (event, data) => {
            handler.call(scope, data).then(
                responseData => {
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
