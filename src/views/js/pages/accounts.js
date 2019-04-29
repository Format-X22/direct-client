(() => {
    const emptyPlaceholder = document.querySelector('#accounts [data-empty-placeholder]');
    const accountsTableContainer = document.getElementById('accounts-table-container');
    const accountsTableBody = document.getElementById('accounts-table-body');
    const templateRow = document.getElementById('accounts-template-row');

    let accountsStore = new Set();

    document.getElementById('accounts-create').onclick = createAccount;

    getAccounts().catch(/* do nothing */);

    async function getAccounts() {
        const { accounts } = await callTunnel('local.getAccounts');

        accountsStore = new Set(accounts);

        renderAccounts();
        window.hideLoading();
    }

    async function createAccount() {
        const { accountId } = await callTunnel('local.createAccount');

        accountsStore.add(accountId);

        renderAccounts();
        window.hideLoading();
    }

    async function deleteAccount(accountId) {
        await callTunnel('local.deleteAccount');

        accountsStore.delete(accountId);

        renderAccounts();
        window.hideLoading();
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

        const accountsArray = [...accountsStore];

        for (let i = 0; i < accountsArray.length; i++) {
            const row = makeAccountRow(accountsArray[i], i + 1);

            accountsTableBody.appendChild(row);
        }
    }

    function makeAccountRow(accountId, index) {
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
        id.innerText = accountId;
        // TODO -
        deleteAccountButton.onclick = deleteAccount.bind(null, accountId);

        row.classList.remove('d-none');

        return row;
    }
})();
