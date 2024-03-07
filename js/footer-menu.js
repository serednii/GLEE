$(function () {
  //--------------------------------------------------------

  function mediaQuery(x) {
    if (x.matches) { // If media query matches
      $('.footer-top__list, .footer-top__text').attr("style", "display:none");
      $('.footer-top__title').attr('aria-label', 'Open menu');

      //тільки при меншому екрані за 768px включати виключати меню
      $('.footer-top__title').on('click', function () {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
        // Переключение атрибута "disabled" элемента с id="myButton"
        $(this).attr('aria-label', function (_, attr) {
          return attr === 'Open menu' ? 'Close menu' : 'Open menu';
        });

      });

    } else {
      $('.footer-top__list, .footer-top__text').attr("style", "display:block");
      $('.footer-top__title').removeAttr('aria-label');
      $('.footer-top__title').off('click');//Видаляємо оброботчик подій
    }
  }

  // Create a MediaQueryList object
  var x = window.matchMedia("(max-width: 600px)")

  // Call listener function at run time
  mediaQuery(x);

  // Attach listener function on state changes
  x.addEventListener("change", function () {
    mediaQuery(x);
  });
  //--------------------------------------------------------




});


