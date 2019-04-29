(() => {
    const emptyPlaceholder = document.querySelector('#accounts [data-empty-placeholder]');
    const accountsTableContainer = document.getElementById('accounts-table-container');
    const accountsTableBody = document.getElementById('accounts-table-body');
    const templateRow = document.getElementById('accounts-template-row');

    const accountsStore = new Map();
    let currentAccount;

    document.getElementById('accounts-create').onclick = createAccount;

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

    async function exportAccount() {
        // TODO -
    }

    async function importAccount() {
        // TODO -
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

        // TODO Render memo on top menu
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

        row.id = '';

        counter.innerText = index;
        id.innerText = account.accountId;
        // TODO -
        deleteAccountButton.onclick = deleteAccount.bind(null, account.accountId);

        if (account.isCurrent) {
            makeCurrentAccountButton.classList.add('d-none');
            isCurrentAccountButton.classList.remove('d-none');
        } else {
            makeCurrentAccountButton.classList.remove('d-none');
            isCurrentAccountButton.classList.add('d-none');
            makeCurrentAccountButton.onclick = makeCurrent.bind(null, account.accountId);
        }

        row.classList.remove('d-none');

        return row;
    }
})();
