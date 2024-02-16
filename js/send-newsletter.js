const mailPath1 = 'http://nastya03.zzz.com.ua/newsletter.php';

function formDataToObject(formData) {
  let jsonObject = {};
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

document.querySelectorAll('.send-form-newsletter').forEach((el) => {

  el.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = formDataToObject(new FormData(this))

    if(!validateEmail(data.email)){
      alert('Email no valid')
      return;
    }

    console.log(data)

    fetch(mailPath1, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' //application/json  multipart/form-data
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data),
      // body: params,
    })
      .then(response => response.json())
      .then(result => {
        // Обробка відповіді від сервера
        if (result.success) {
          alert("Ви добавленні в розсилку, на вказану вами пошту було відправлено повідомлення");
          clearForm(e)
        } else {
          alert("Ви не добавленні в розсилку виникла помилка:  " + result.message);
        }
      })
      .catch(error => {
        console.error('Помилка:', error);
      });
  })

})


