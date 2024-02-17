$(function () {

  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    fade: true,
    // autoplay: true,
    autoplaySpeed: 2000
  });

  // $('.menu__btn').on('click', function () {
  //   $('.menu__list').toggleClass('menu__list--active');
  //   $('.menu__btn').toggleClass('menu__btn--active');
  // });
  //--------------------------------------------------------

  $('.shop__filter-btn').on('click', function () {
    $('.shop__filters').slideToggle();
  });
  //--------------------------------------------------------



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


  $('.filter-price__input').ionRangeSlider({
    type: "double",
    prefix: "$",
    onStart: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);

    },
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);

    },

  });

  $('.product-slide__thumb').slick({
    asNavFor: '.product-slide__big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false
  });

  $('.product-slide__big').slick({
    asNavFor: '.product-slide__thumb',
    draggable: false,
    arrows: false,
    fade: true
  });

  $('.product-tabs__top-item').on('click', function (e) {
    e.preventDefault();
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  });

  $('.related__items').slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        }
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
    // autoplay: true,
    // autoplaySpeed: 2000
  });

  $('.select-style, .product-one__num').styler();

  $(".star").rateYo({
    starWidth: "11px",
    normalFill: "#d6d6d6",
    ratedFill: "#ffcc00",
    numStars: 5,
    readOnly: true,
    spacing: "8px",
    starSvg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px"height="16px" viewBox="0 0 18 16" version="1.1"><g id="surface1"><path  d="M 8.101562 0.554688 L 6.0625 4.695312 L 1.496094 5.359375 C 0.679688 5.476562 0.351562 6.488281 0.945312 7.066406 L 4.246094 10.285156  L 3.464844 14.832031 C 3.324219 15.652344 4.191406 16.269531 4.914062 15.882812 L 9 13.738281 L 13.085938 15.882812   C 13.808594 16.265625 14.675781 15.652344 14.535156 14.832031 L 13.753906 10.285156 L 17.054688 7.066406 C 17.648438  6.488281 17.320312 5.476562 16.503906 5.359375 L 11.9375 4.695312 L 9.898438 0.554688 C 9.53125 -0.179688 8.472656 -0.191406  8.101562 0.554688 Z M 8.101562 0.554688 " /></g></svg>'
  });


  // var mixer = mixitup('.categories__content');
  // var mixer1 = mixitup('.design__content');

  var containerEl1 = document.querySelector('[data-ref="container-1"]');
  var containerEl2 = document.querySelector('[data-ref="container-2"]');
  var config = {
    controls: {
      scope: 'local'
    }
  };

  // var mixer1 = mixitup(containerEl1, config);
  // var mixer2 = mixitup(containerEl2, config);
  console.log(containerEl1)
  console.log(containerEl2)

  containerEl1 && mixitup(containerEl1, config);
  containerEl2 && mixitup(containerEl2, config);

});


function screenParametr() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  $('.display-parametr').text(`${width}  ${height}`);
}

screenParametr()

window.addEventListener('resize', (e) => {
  screenParametr()
});