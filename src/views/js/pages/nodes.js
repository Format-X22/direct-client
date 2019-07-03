(() => {
    const emptyPlaceholder = document.querySelector('#nodes [data-empty-placeholder]');
    const nodesTableContainer = document.getElementById('nodes-table-container');
    const nodesTableBody = document.getElementById('nodes-table-body');
    const templateRow = document.getElementById('nodes-template-row');
    const nodesDefaultsContainer = document.getElementById('nodes-defaults-container');
    const connectWindow = document.getElementById('nodes-connect-window');
    const connectString = document.getElementById('nodes-connect-string');

    const nodesStore = new Map();

    document.getElementById('nodes-defaults-connect').onclick = addDefault;
    document.getElementById('nodes-connect').onclick = showConnectWindow;
    document.getElementById('nodes-try-connect').onclick = add;
    document.getElementById('nodes-connect-window-close').onclick = closeConnectWindow;

    connectString.onkeyup = clearConnectStringInvalid;

    sync().catch(/* do nothing */);

    function showConnectWindow() {
        connectString.value = '';
        connectWindow.classList.add('d-block');
    }

    function closeConnectWindow() {
        clearConnectStringInvalid();
        connectWindow.classList.remove('d-block');
    }

    async function sync() {
        const { nodes } = await callTunnel('node.sync');

        nodesStore.clear();

        for (const node of nodes) {
            nodesStore.set(node.accountId, node);
        }

        renderNodes();
        window.hideLoading();
    }

    async function add() {
        const success = await callTunnel('node.add', { connectString: connectString.value });

        if (success) {
            await sync();
        } else {
            connectString.classList.add('is-invalid');
            window.hideLoading();
        }
    }

    async function remove(accountId) {
        await callTunnel('node.add', { accountId });
        await sync();
    }

    async function addDefault() {
        await callTunnel('node.addDefault');
        await sync();
    }

    function renderNodes() {
        clearNodesTable();

        // TODO -
    }

    function clearNodesTable() {
        const forRemove = [];

        for (const row of nodesTableBody.childNodes) {
            if (row.id !== 'nodes-template-row') {
                forRemove.push(row);
            }
        }

        for (const row of forRemove) {
            row.remove();
        }
    }

    function clearConnectStringInvalid() {
        connectString.classList.remove('is-invalid');
    }
})();
