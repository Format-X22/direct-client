class TopNavigation {
    constructor() {
        this._accountsMenuElement = document.getElementById('top-accounts');
        this._assetsMenuElement = document.getElementById('top-assets');
        this._exchangesMenuElement = document.getElementById('top-exchanges');
        this._historyMenuElement = document.getElementById('top-history');
        this._controlMenuElement = document.getElementById('top-control');

        this._mainMenuElements = [
            this._accountsMenuElement,
            this._assetsMenuElement,
            this._exchangesMenuElement,
            this._historyMenuElement,
            this._controlMenuElement,
        ];

        this._currentAccountMenuElement = document.getElementById('top-current-account');
        this._currentAccountMenuValueElement = document.getElementById('top-current-account-value');
    }

    activateAccountsPage() {
        this._deactivateAllMenu();
        this._activateMenuItem(this._accountsMenuElement);
        // TODO -
    }

    activateAssetsPage() {
        this._deactivateAllMenu();
        this._activateMenuItem(this._assetsMenuElement);
        // TODO -
    }

    activateExchangesPage() {
        this._deactivateAllMenu();
        this._activateMenuItem(this._exchangesMenuElement);
        // TODO -
    }

    activateHistoryPage() {
        this._deactivateAllMenu();
        this._activateMenuItem(this._historyMenuElement);
        // TODO -
    }

    activateControlPage() {
        this._deactivateAllMenu();
        this._activateMenuItem(this._controlMenuElement);
        // TODO -
    }

    _deactivateAllMenu() {
        for (const element of this._mainMenuElements) {
            element.classList.remove('active');
        }
    }

    _activateMenuItem(item) {
        item.classList.add('active');
    }
}

module.exports = TopNavigation;
