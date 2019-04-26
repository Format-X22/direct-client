const keygen = require('keypair');
const crypto = require('crypto');
const core = require('gls-core-service');
const BasicController = core.controllers.Basic;

const Store = require('electron-store');
const store = new Store({ encryptionKey: 'just obfuscate for monkey fingers' });

class Local extends BasicController {
    constructor(...args) {
        super(...args);
        
        store.set('accounts', store.get('accounts') || []);
    }

    async getAccounts() {
        return { accounts: store.get('accounts').map(account => account.accountId) };
    }

    async createAccount() {
        const { public: publicKey, private: privateKey } = keygen();
        const idHash = crypto
            .createHash('sha256')
            .update(publicKey)
            .digest('hex');
        const accountId = `ID${idHash}`;
        const account = { accountId, publicKey, privateKey };
        const accounts = store.get('accounts');

        accounts.push(account);

        store.set('accounts', accounts);

        return { accountId };
    }

    async selectAccount() {
        // TODO -
    }

    async exportAccount() {
        // TODO -
    }

    async importAccount() {
        // TODO -
    }

    async destroyAccount() {
        // TODO -
    }
}

module.exports = Local;
