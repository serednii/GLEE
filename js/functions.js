function formDataToObject(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}

function clearForm(formElement) {
    formElement.target.querySelectorAll('input:not([type="hidden"]) ,textarea').forEach(e => {
        e.checked = e.defaultChecked;
        e.value = "";
    })
}




//Зменшує переданий елемент по ширині від діючого значення до 0
//Перший параметр сам елемент узел
//другий параметр калбек функція яка буде виконуватися коли елемент зменшиться до нуля, в ній добе запускати команди наприклад позабирати або дадоти класи 
const CollapsingTheElementByWidth = (element, callback) => {
    let widthPoppa = element.offsetWidth;
    const timerWidth = setInterval(() => {
        widthPoppa -= 5;
        element.style.width = widthPoppa + "px";
        if (widthPoppa <= 0) {
            element.style.width = "";
            callback();
            clearInterval(timerWidth);
        }
    }, 2);
}