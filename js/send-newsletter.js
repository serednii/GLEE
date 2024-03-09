const newsletterPatch = 'http://glee.smm.zzz.com.ua/newsletter.php';



document.querySelectorAll('.send-form-newsletter').forEach((el) => {

  el.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = formDataToObject(new FormData(this))

    if (!validateEmail(data.email)) {
      alert('Email no valid')
      return;
    }

    fetch(newsletterPatch, {
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
          showInformationSendMail("You have been added to the mailing list, a confirmation has been sent to the email you specified", 'send-message-popup');
          clearForm(e);
        } else {
          showInformationSendMail("You are not added to the newsletter, an error occurred, please try again later:  " + result.message, 'send-message-popup');

        }
      })
      .catch(error => {
        console.error('Помилка:', error);
      });
  })

})


