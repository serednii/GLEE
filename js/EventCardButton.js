//При натисканні на кнопки карточуи добавити в корзину або улюблені 
//добавляємо в localstorag і в header показуємо кількість записів в карточках 
// і позначаємо іншим кольором кнопки на карточці, щоб було видно що ми добавили товар
//

class EventCardButton {

  constructor() {
    this.classUserNavInnerHeart = '.user-nav__inner-heart span';
    this.classUserNavInnerCart = '.user-nav__inner-cart span';
    this.classButtonCard = '.button-cart';
    this.classButtonFavorites = '.button-favorites';
    this.userNavInnerHeart = document.querySelector(this.classUserNavInnerHeart);
    this.userNavInnerCart = document.querySelector(this.classUserNavInnerCart);
    this.buttonCard = document.querySelectorAll(this.classButtonCard);
    this.buttonFavorites = document.querySelectorAll(this.classButtonFavorites);

    eventBody.addHandlerClickFunction(this.#handler.bind(this))//привязуємося до оброботчика click на body
    this.startChangeColorButtons();
    this.changeCounterHeaderCards();
  }

  #handler(event) {
    const eventTarget = event.target;
    //Click on button cart
    const btnAddCart = eventTarget?.closest(this.classButtonCard)
    //Click on button favorites
    const buttonHeart = eventTarget?.closest(this.classButtonFavorites)

    //If there was a click on the buttons
    if (btnAddCart || buttonHeart) {
      event.preventDefault()
      //we find the envelope of the card
      const parentCart = btnAddCart?.closest('.categories-item, .shop-content-item') || buttonHeart?.closest('.categories-item, .shop-content-item')
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
      if (buttonHeart) {
        dataLocalStorage.toggleObj(cartObj, 'dataHeart');
        dataLocal = dataLocalStorage.getData('dataHeart');
      }
      this.startChangeColorButtons()
      this.changeCounterHeaderCards()

    }
  }

  //При старті обновляє лічильники в Header на значку корзина і улюблені
  changeCounterHeaderCards() {
    const dataHeart = dataLocalStorage.getData('dataHeart').length;
    const dataCart = dataLocalStorage.getData('dataCart').length;
    this.userNavInnerHeart.innerText = dataHeart;
    this.userNavInnerCart.innerText = dataCart;
  }

  //При старті знаходить всі кнопки і помічає які є добавлені в корзину або улюблені
  startChangeColorButtons() {
    const dataHeart = dataLocalStorage.getData('dataHeart');
    const dataCart = dataLocalStorage.getData('dataCart');
    if (dataHeart) {
      this.buttonFavorites.forEach(e => {
        const idCard = e?.closest('.categories-item, .shop-content-item')?.dataset.id;
        const isFindCart = dataHeart.find(e => e.id === idCard);
        this.#changeColorSvgButtons(e, isFindCart);
      });
    }

    if (dataCart) {
      this.buttonCard.forEach(e => {
        const idCard = e?.closest('.categories-item, .shop-content-item')?.dataset.id;
        const isFindCart = dataCart.find(e => e.id === idCard);
        this.#changeColorSvgButtons(e, isFindCart);
      });
    }
  }

  #changeColorSvgButtons(buttonClicked, isFindCart) {
    if (isFindCart) {
      buttonClicked.classList.add('is-add-card')
    } else {
      buttonClicked.classList.remove('is-add-card')
    }
  }

}

const eventCardButton = new EventCardButton();


