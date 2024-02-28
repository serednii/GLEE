const sendMailPatch = 'http://glee.smm.zzz.com.ua/send-mail.php';



document.querySelectorAll('.send-form-mail').forEach((el) => {

  el.addEventListener('submit', function (e) {
    console.log(e.target)
    e.preventDefault()
    const data = formDataToObject(new FormData(this))

    if (!validateEmail(data.email)) {
      alert('Email no valid')
      return;
    }


    fetch(sendMailPatch, {
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
          // alert("Письмо отправлено");
          showInformationSendMail("Letter sent", 'send-message-popup');
          clearForm(e)
          // e.target.querySelectorAll('textarea').forEach(e => e.value = "")
        } else {
          // alert("The message was not sent, there was an error:  " + result.message);
          showInformationSendMail("The message was not sent, there was an error:  " + result.message, 'send-message-popup');
        }
      })
      .catch(error => {
        console.error('Помилка:', error);
      });
  })

})


