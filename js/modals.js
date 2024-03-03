const btns = document.querySelectorAll('.btn-modal');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const modalCloseBtn = document.querySelectorAll('.modal-close-btn')


const showInformationSendMail = (message, path) => {
    const modals = document.querySelectorAll('.modal');
    const modalOverlay = document.querySelector('.modal-overlay ');
    modals.forEach((el) => {
        el.classList.remove('modal--visible');
    });

    const modalVisible = document.querySelector(`[data-target="${path}"]`);
    console.log(modalVisible.querySelector('.modal-message'))
    if (modalVisible) {
        modalVisible.querySelector('.modal-message__content').innerText = message
        modalVisible.classList.add('modal--visible');
        modalOverlay?.classList.add('modal-overlay--visible');
    }

}


btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');
        console.log(path)
        document.body.style.overflowY = 'hidden';

        modals.forEach((el) => {
            if (el.classList.contains('modal--visible')) {
                el.classList.add('modal--out-visible');
                setTimeout(() => {
                    el.classList.remove('modal--out-visible');
                    el.classList.remove('modal--visible');
                }, 500);
            }
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal-overlay--visible');
    });
});

modalOverlay && modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        document.body.style.overflowY = 'auto';
        // modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            if (el.classList.contains('modal--visible')) {
                CollapsingTheElementByWidth(el, () => {
                    el.classList.remove('modal--visible');
                    modalOverlay.classList.remove('modal-overlay--visible');
                })
            }
        });
    }
});

modalCloseBtn.forEach(e => {
    e.addEventListener('click', (e) => {
        document.body.style.overflowY = 'auto';
        // modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            if (el.classList.contains('modal--visible')) {
                CollapsingTheElementByWidth(el, () => {
                    el.classList.remove('modal--visible');
                    modalOverlay.classList.remove('modal-overlay--visible');
                })
            }
        });
    })
})



