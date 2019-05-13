(() => {
    const menuLinks = document.querySelectorAll('[data-top-menu]');
    const accountsMenu = document.getElementById('account-menu');
    const containers = document.querySelectorAll('[data-page-container]');
    const accountsContainer = document.getElementById('accounts');
    const containersMap = new Map();
    const accountDisplay = document.getElementById('accounts-display-area');

    for (const container of containers) {
        containersMap.set(container.id, container);
    }

    menuLinks.forEach(menuItem => {
        menuItem.onclick = () => {
            deactivateMenu();
            hideContainers();

            menuItem.classList.add('active');
            containersMap.get(menuItem.dataset.topMenu).classList.remove('d-none');
        };
    });

    accountDisplay.onclick = () => {
        deactivateMenu();
        hideContainers();

        accountsMenu.classList.add('active');
        accountsContainer.classList.remove('d-none');
    };

    function deactivateMenu() {
        menuLinks.forEach(anotherItem => {
            anotherItem.classList.remove('active');
        });
    }

    function hideContainers() {
        containersMap.forEach(container => {
            container.classList.add('d-none');
        });
    }
})();
