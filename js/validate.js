// https://www.internet-technologies.ru/articles/validaciya-formy-registracii-s-pomoschyu-javascript.html

const validateEmail = (email => email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))

document.querySelectorAll('.validate-email').forEach(el => el.addEventListener('input', function (e) {
    if (validateEmail(this.value)) {
        e.target.style.backgroundColor = "white"
    } else {
        e.target.style.backgroundColor = "red"
    }
}
));

//Функция, отвечающая за валидацию имени пользователя
function allLetter(uname) {
    const letters = /^[A-Za-z]+$/;
    if (uname.value.match(letters)) {
        return true;
    }
    else {
        alert('Username must have alphabetcharactersonly');
        uname.focus();
        return false;
    }
}


//Функция, отвечающая за валидацию имени пользователя
function allLetter(uname) {
    const letters = /^[A-Za-z]+$/;
    if (uname.value.match(letters)) {
        return true;
    }
    else {
        alert('Username must have alphabetcharactersonly');
        uname.focus();
        return false;
    }
}


