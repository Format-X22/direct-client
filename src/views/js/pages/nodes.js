(() => {
    const emptyPlaceholder = document.querySelector('#nodes [data-empty-placeholder]');
    const nodesTableContainer = document.getElementById('nodes-table-container');
    const templateRow = document.getElementById('nodes-template-row');
    const nodesDefaultsContainer = document.getElementById('nodes-defaults-container');
    const connectWindow = document.getElementById('nodes-connect-window');

    const nodesStore = new Map();

    document.getElementById('nodes-defaults-connect').onclick = addDefault;
    document.getElementById('nodes-connect').onclick = showConnectWindow;
    document.getElementById('nodes-try-connect').onclick = add;
    document.getElementById('nodes-connect-window-close').onclick = closeConnectWindow;

    sync().catch(/* do nothing */);

    function showConnectWindow() {
        connectWindow.classList.add('d-block');
    }

    function closeConnectWindow() {
        connectWindow.classList.remove('d-block');
    }

    async function sync() {
        // TODO -
        renderNodes();
        window.hideLoading();
    }

    async function add() {
        // TODO -
        await sync();
    }

    async function remove() {
        // TODO -
        await sync();
    }

    async function addDefault() {
        // TODO -
        await sync();
    }

    function renderNodes() {
        clearNodesTable();

        // TODO -
    }

    function clearNodesTable() {
        // TODO -
    }
})();
