//При фокусі на кнопки в вспливаючому меню карточки, показуємо вспливаюче меню
document.querySelectorAll('.button-focus').forEach(el => {

    el.addEventListener('focus', function (e) {//показуєм меню при фокусі
        this.closest('.categories-item__hover-links').style.opacity = "1"
    });

    el.addEventListener('blur', function (e) {//ховаєм меню при втраті фокуса
        this.closest('.categories-item__hover-links').style.opacity = ""
    });

})