(() => {
    document.getElementById('accounts-create').onclick = createAccount;

    function createAccount() {
        window.ipc.on('local.createAccount', () => {
            // TODO -
        });
        window.ipc.send('local.createAccount', {});
    }
})();
