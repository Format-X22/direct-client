(() => {
    const emptyPlaceholder = document.querySelector('#accounts [data-empty-placeholder]');
    const accountsTableContainer = document.getElementById('accounts-table-container');
    const accountsTableBody = document.getElementById('accounts-table-body');
    const templateRow = document.getElementById('accounts-template-row');

    let accountsStore = [];

    document.getElementById('accounts-create').onclick = createAccount;

    getAccounts().catch(/* do nothing */);

    async function getAccounts() {
        const { accounts } = await callTunnel('local.getAccounts');

        accountsStore = accounts;

        renderAccounts();
        window.hideLoading();
    }

    async function createAccount() {
        const { accountId } = await callTunnel('local.createAccount');

        accountsStore.push(accountId);

        appendAccount(accountId);
        window.hideLoading();
    }

    function renderAccounts() {
        if (!accountsStore.length) {
            return;
        }

        emptyPlaceholder.classList.add('d-none');

        for (let i = 0; i < accountsStore.length; i++) {
            const row = makeAccountRow(accountsStore[i], i + 1);

            accountsTableBody.appendChild(row);
        }

        accountsTableContainer.classList.remove('d-none');
    }

    function makeAccountRow(accountId, index) {
        const row = templateRow.cloneNode(true);
        const [counter, memo, id, control] = row.childNodes;

        counter.innerText = index;
        id.innerText = accountId;
        // TODO -

        row.classList.remove('d-none');

        return row;
    }

    function appendAccount(accountId) {
        const row = makeAccountRow(accountId, accountsStore.length);

        accountsTableBody.appendChild(row);
    }
})();
