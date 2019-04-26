(() => {
    const loadingMask = document.getElementById('loading-mask');

    window.showLoading = () => {
        loadingMask.classList.remove('d-none');
    };

    window.hideLoading = () => {
        loadingMask.classList.add('d-none');
    };
})();
