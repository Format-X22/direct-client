(() => {
    const renderingTimeout = 500;

    window.ipc = require('electron').ipcRenderer;

    window.callTunnel = (point, data) => {
        return new Promise(resolve => {
            window.showLoading();
            window.ipc.on(point, (event, data) => handleResponse(data, resolve));
            setTimeout(() => window.ipc.send(point, data), renderingTimeout);
        });
    };

    function handleResponse(data, resolve) {
        if (data instanceof Error) {
            // TODO Notify about error
            window.hideLoading();
        } else {
            resolve(data);
        }
    }
})();
