// TODO Nodes page
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

        this._accountsContainerElement = document.getElementById('container-accounts');
        this._assetsContainerElement = document.getElementById('container-assets');
        this._exchangesContainerElement = document.getElementById('container-exchanges');
        this._historyContainerElement = document.getElementById('container-history');
        this._controlContainerElement = document.getElementById('container-control');

        this._containerElements = [
            this._accountsContainerElement,
            this._assetsContainerElement,
            this._exchangesContainerElement,
            this._historyContainerElement,
            this._controlContainerElement,
        ];
    }

    activateAccountsPage() {
        this._toggle(this._accountsMenuElement, this._accountsContainerElement);
    }

    activateAssetsPage() {
        this._toggle(this._assetsMenuElement, this._assetsContainerElement);
    }

    activateExchangesPage() {
        this._toggle(this._exchangesMenuElement, this._exchangesContainerElement);
    }

    activateHistoryPage() {
        this._toggle(this._historyMenuElement, this._historyContainerElement);
    }

    activateControlPage() {
        this._toggle(this._controlMenuElement, this._controlContainerElement);
    }

    _toggle(menu, container) {
        this._deactivateAllMenu();
        this._activateMenuItem(menu);
        this._deactivateAllContainers();
        this._activateContainer(container);
    }

    _deactivateAllMenu() {
        for (const element of this._mainMenuElements) {
            element.classList.remove('active');
        }
    }

    _deactivateAllContainers() {
        for (const element of this._containerElements) {
            element.classList.add('d-none');
        }
    }

    _activateMenuItem(item) {
        item.classList.add('active');
    }

    _activateContainer(item) {
        item.classList.remove('d-none');
    }
}

module.exports = TopNavigation;
