(() => {
    const emptyPlaceholder = document.querySelector('#accounts [data-empty-placeholder]');
    const accountsTableContainer = document.getElementById('accounts-table-container');
    const accountsTableBody = document.getElementById('accounts-table-body');
    const templateRow = document.getElementById('accounts-template-row');
    const exportWindow = document.getElementById('accounts-export-window');
    const exportAccountId = document.getElementById('accounts-export-account-id');
    const exportPublicKey = document.getElementById('accounts-export-public-key');
    const exportPrivateKey = document.getElementById('accounts-export-private-key');
    const importWindow = document.getElementById('accounts-import-window');
    const importPublicKey = document.getElementById('accounts-import-public-key');
    const importPrivateKey = document.getElementById('accounts-import-private-key');
    const topDisplay = document.getElementById('accounts-top-display');
    const topDisplayImage = document.getElementById('accounts-top-display-image');
    const deleteAccountWindow = document.getElementById('accounts-delete-accept-window');

    const accountsStore = new Map();
    let accountForDelete = null;

    document.getElementById('accounts-create').onclick = createAccount;
    document.getElementById('accounts-import').onclick = showImportAccountWindow;
    document.getElementById('accounts-import-start').onclick = importAccount;
    document.getElementById('accounts-export-window-close').onclick = closeExportAccountWindow;
    document.getElementById('accounts-import-window-close').onclick = closeImportAccountWindow;
    document.getElementById('accounts-delete-accept').onclick = acceptDeleteAccount;
    document.getElementById('accounts-delete-close').onclick = closeDeleteAccountWindow;

    importPublicKey.onkeyup = clearImportPublicKey;
    importPrivateKey.onkeyup = clearImportPrivateKey;

    getAccounts().catch(/* do nothing */);

    async function getAccounts() {
        const { accounts } = await callTunnel('local.getAccounts');

        accountsStore.clear();

        for (const account of accounts) {
            accountsStore.set(account.accountId, account);
        }

        renderAccounts();
        window.hideLoading();
    }

    async function createAccount() {
        await callTunnel('local.createAccount');
        await getAccounts();
    }

    async function deleteAccount(accountId) {
        await callTunnel('local.deleteAccount', { accountId });
        await getAccounts();
    }

    async function makeCurrent(accountId) {
        await callTunnel('local.selectAccount', { accountId });
        await getAccounts();
    }

    async function exportAccount(account) {
        exportAccountId.value = account.accountId;
        exportPublicKey.value = account.publicKey;
        exportPrivateKey.value = account.privateKey;

        exportWindow.classList.add('d-block');
    }

    function closeExportAccountWindow() {
        exportWindow.classList.remove('d-block');
    }

    async function importAccount() {
        clearImportPublicKey();
        clearImportPrivateKey();

        const publicKey = importPublicKey.value;

        if (!publicKey) {
            importPublicKey.classList.add('is-invalid');
            return;
        }

        const privateKey = importPrivateKey.value;

        if (!privateKey) {
            importPrivateKey.classList.add('is-invalid');
            return;
        }

        await callTunnel('local.importAccount', { publicKey, privateKey });
        await getAccounts();
        closeImportAccountWindow();

        importPublicKey.value = '';
        importPrivateKey.value = '';
    }

    function showImportAccountWindow() {
        clearImportPublicKey();
        clearImportPrivateKey();
        importWindow.classList.add('d-block');
    }

    function closeImportAccountWindow() {
        importWindow.classList.remove('d-block');
    }

    function showDeleteAccountAcceptWindow(accountId) {
        accountForDelete = accountId;
        deleteAccountWindow.classList.add('d-block');
    }

    async function acceptDeleteAccount() {
        await deleteAccount(accountForDelete);
        accountForDelete = null;
        deleteAccountWindow.classList.remove('d-block');
    }

    function closeDeleteAccountWindow() {
        accountForDelete = null;
        deleteAccountWindow.classList.remove('d-block');
    }

    function clearAccountsTable() {
        const forRemove = [];

        for (const row of accountsTableBody.childNodes) {
            if (row.id !== 'accounts-template-row') {
                forRemove.push(row);
            }
        }

        for (const row of forRemove) {
            row.remove();
        }
    }

    function renderAccounts() {
        clearAccountsTable();

        topDisplay.classList.add('d-none');

        if (accountsStore.size) {
            emptyPlaceholder.classList.add('d-none');
            accountsTableContainer.classList.remove('d-none');
        } else {
            emptyPlaceholder.classList.remove('d-none');
            accountsTableContainer.classList.add('d-none');
            return;
        }

        const accountsArray = [...accountsStore.values()];

        for (let i = 0; i < accountsArray.length; i++) {
            const row = makeAccountRow(accountsArray[i], i + 1);

            accountsTableBody.appendChild(row);
        }
    }

    function makeAccountRow(account, index) {
        const row = templateRow.cloneNode(true);
        const [counter, memo, id, control] = row.childNodes;
        const [
            makeCurrentAccountButton,
            isCurrentAccountButton,
            exportAccountButton,
            deleteAccountButton,
        ] = control.childNodes;
        const memoSrc = makeMemoSrc(account.accountId);

        row.id = '';

        counter.innerText = index;
        id.innerText = account.accountId;
        memo.childNodes[0].src = memoSrc;

        exportAccountButton.onclick = exportAccount.bind(null, account);
        deleteAccountButton.onclick = showDeleteAccountAcceptWindow.bind(null, account.accountId);

        if (account.isCurrent) {
            makeCurrentAccountButton.classList.add('d-none');
            isCurrentAccountButton.classList.remove('d-none');
            topDisplayImage.src = memoSrc;
            topDisplay.classList.remove('d-none');
        } else {
            makeCurrentAccountButton.classList.remove('d-none');
            isCurrentAccountButton.classList.add('d-none');
            makeCurrentAccountButton.onclick = makeCurrent.bind(null, account.accountId);
        }

        row.classList.remove('d-none');

        return row;
    }

    function makeMemoSrc(accountId) {
        const canvas = window.blockies.create({ seed: accountId });

        return canvas.toDataURL('image/png');
    }

    function clearImportPublicKey() {
        importPublicKey.classList.remove('is-invalid');
    }

    function clearImportPrivateKey() {
        importPrivateKey.classList.remove('is-invalid');
    }
})();
