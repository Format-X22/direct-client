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
        return { accounts: store.get('accounts') };
    }

    async createAccount() {
        const { public: publicKey, private: privateKey } = keygen();
        const idHash = crypto
            .createHash('sha256')
            .update(publicKey)
            .digest('hex');
        const accountId = `ID${idHash}`;
        const account = { accountId, publicKey, privateKey, isCurrent: false };
        const accounts = store.get('accounts');

        accounts.push(account);

        store.set('accounts', accounts);
    }

    async selectAccount({ accountId }) {
        const accounts = store.get('accounts');

        for (const account of accounts) {
            account.isCurrent = account.accountId === accountId;
        }

        store.set('accounts', accounts);
    }

    async exportAccount() {
        // TODO -
    }

    async importAccount() {
        // TODO -
    }

    async deleteAccount({ accountId }) {
        const accounts = store.get('accounts');
        const index = accounts.map(account => account.accountId).indexOf(accountId);

        accounts.splice(index, 1);

        store.set('accounts', accounts);
    }
}

module.exports = Local;
