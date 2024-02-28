const btns = document.querySelectorAll('.btn-modal');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const modalCloseBtn = document.querySelectorAll('.modal-close-btn')


const CollapsingTheElementByWidth = (element, callback) => {
    let widthPoppa = element.offsetWidth;
    const timerWidth = setInterval(() => {
        widthPoppa -= 3;
        element.style.width = widthPoppa + "px";
        if (widthPoppa <= 0) {
            clearInterval(timerWidth);
            element.style.width = "";
            callback();
        }
    }, 1);
}

btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        modals.forEach((el) => {
            if (el.contains('modal--visible')) {
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

modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            if (el.classList.contains('modal--visible')) {
                CollapsingTheElementByWidth(el, () => el.classList.remove('modal--visible'))
            }
        });
    }
});

modalCloseBtn.forEach(e => {
    e.addEventListener('click', (e) => {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            CollapsingTheElementByWidth(el, () => el.classList.remove('modal--visible'))
        });
    })
})

