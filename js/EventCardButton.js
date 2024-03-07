//При натисканні на кнопки карточуи добавити в корзину або улюблені 
//добавляємо в localstorag і в header показуємо кількість записів в карточках 
// і позначаємо іншим кольором кнопки на карточці, щоб було видно що ми добавили товар
//
///


class EventCardButton {
  // #userNavInnerHeart;
  // #userNavInnerCart;
  // #buttonElementsCard;
  // #buttonElementsFavorites;

  constructor() {
    document.body.addEventListener('click', (event) => this.#handler(event));
    this.userNavInnerHeart = document.querySelector('.user-nav__inner-heart span');
    this.userNavInnerCart = document.querySelector('.user-nav__inner-cart span');
    this.buttonElementsCard = document.querySelectorAll('.button-cart');
    this.buttonElementsFavorites = document.querySelectorAll('.button-favorites');
    this.startChangeColorButtons();
    this.changeCounterHeaderCards();
  }

  #handler(event) {
    const eventTarget = event.target;

    //Click on button cart
    const btnAddCart = eventTarget?.closest('.button-cart')
    //Click on button favorites
    const buttonFavorites = eventTarget?.closest('.button-favorites')

    //If there was a click on the buttons
    if (btnAddCart || buttonFavorites) {

      event.preventDefault()
      //we find the envelope of the card
      const parentCart = btnAddCart?.closest('.categories-item, .shop-content-item') || buttonFavorites?.closest('.categories-item, .shop-content-item')

      // console.log('btnAddCart');
      // console.log(btnAddCart);
      // console.log('buttonFavorites');
      // console.log(buttonFavorites);
      // console.log('parentCart');
      // console.log(parentCart);

      //let's collect the data into the object from the card
      const cartObj = {
        id: parentCart?.dataset.id,
        title: parentCart.querySelector('.categories-item__title, .shop-content-item-title')?.innerText,
        price: (parentCart.querySelector('.categories-item__prise, .shop-content-item-prise')?.innerText)?.replace(/[^\d.]/g, ""),
        img: (parentCart.querySelector('.categories-item__img-box a picture, .shop-content-item a picture')?.outerHTML),
      }
      let dataLocal;
      //add or remove a product from localStorage
      if (btnAddCart) {
        dataLocalStorage.toggleObj(cartObj, 'dataCart');
        dataLocal = dataLocalStorage.getData('dataCart');
      }
      //add or remove a product from localStorage
      if (buttonFavorites) {
        dataLocalStorage.toggleObj(cartObj, 'dataFavorites');
        dataLocal = dataLocalStorage.getData('dataFavorites');
      }
      this.#changeColorButtons(cartObj.id, btnAddCart || buttonFavorites, dataLocal)
    }
  }

  //При старті обновляє лічильники в Header на значку корзина і улюблені
  changeCounterHeaderCards() {
    const dataFavorites = dataLocalStorage.getData('dataFavorites').length;
    const dataCart = dataLocalStorage.getData('dataCart').length;
    this.userNavInnerHeart.innerText = dataFavorites;
    this.userNavInnerCart.innerText = dataCart;
  }

  //При старті знаходить всі кнопки і поміяає які є добавлені в корзину або улюблені
  startChangeColorButtons() {
    const dataFavorites = dataLocalStorage.getData('dataFavorites');
    const dataCart = dataLocalStorage.getData('dataCart');

    if (dataFavorites && dataFavorites.length > 0) {
      this.buttonElementsFavorites.forEach(e => {
        const idCard = e?.closest('.categories-item, .shop-content-item')?.dataset.id;
        const isFindCart = dataFavorites.find(e => e.id === idCard);
        this.#changeColorSvgButtons(e, isFindCart);
      });
    }

    if (dataCart && dataCart.length > 0) {
      this.buttonElementsCard.forEach(e => {
        const idCard = e?.closest('.categories-item, .shop-content-item')?.dataset.id;
        const isFindCart = dataCart.find(e => e.id === idCard);
        this.#changeColorSvgButtons(e, isFindCart);
      });
    }

  }

  #changeColorSvgButtons(buttonClicked, isFindCart) {
    // const isFindCart = datalocalStorage.find(e => e.id === idCard);
    if (isFindCart) {
      buttonClicked.classList.add('is-add-card')
    } else {
      buttonClicked.classList.remove('is-add-card')
    }
  }

  #changeColorButtons(idCard, buttonClicked, dataLocal) {
    this.changeCounterHeaderCards();
    const isFindCart = dataLocal.find(e => e.id === idCard);
    this.#changeColorSvgButtons(buttonClicked, isFindCart);
  }



}

const eventCardButton = new EventCardButton();


