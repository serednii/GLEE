function clearForm(formElement){
    formElement.target.querySelectorAll('input:not([type="hidden"]) ,textarea').forEach(e => {
        e.checked  = e.defaultChecked;
        e.value = "";
    })
}