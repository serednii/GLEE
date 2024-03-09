
class EventPopupCard {

  constructor() {
    this.blockParent = '.modal__card-cart ';
    this.cardItem = this.blockParent + '.modal__card-item';
    this.myNumberInput = '.my-number__input';
    this.myNumberMinus = '.my-number__minus';
    this.myNumberPlus = '.my-number__plus';

    eventBody.addHandlerClickFunction(this.handlerBodyClick.bind(this));
    eventBody.addHandlerInputFunction(this.handlerBodyInput.bind(this));
    // document.body.addEventListener('click', (event) => this.handlerBodyClick(event));
    // document.body.addEventListener('input', (event) => this.handlerBodyInput(event));
  }

  handlerBodyClick(event) {
    console.log('handlerBodyClick')
    const eventTarget = event.target;
    const nodeParent = eventTarget.closest(this.cardItem)
    if (nodeParent) {
      event.preventDefault()
      const input = nodeParent.querySelector(this.myNumberInput);
      const buttonMinus = nodeParent.querySelector(this.myNumberMinus);
      const buttonPlus = nodeParent.querySelector(this.myNumberPlus);

      if (eventTarget.closest('.remove-product')) {
        const cardParent = eventTarget.closest(this.cardItem);
        const idProduct = cardParent.dataset.id;
        // Видаляємо з локал сторкдж
        dataLocalStorage.deleteObj(idProduct, 'dataCart');
        // Робимо ререндеринг карточки
        this.renderPopupCart();
        // Міняємо лічильники на іконках
        eventCardButton.changeCounterHeaderCards();
        // Знімаємо кольори на кнопках
        eventCardButton.startChangeColorButtons();
        this.startTotalCostCards()
      }

      if (eventTarget == buttonPlus || eventTarget == buttonMinus) {
        const min = +input.getAttribute("min") || -9999999;
        const max = +input.getAttribute("max") || 9999999;
        const step = +input.getAttribute("step") || 1;
        const value = +input.value;

        if (eventTarget == buttonMinus) {
          const rez = value - step
          if (rez >= min) input.value = rez
        } else if (eventTarget == buttonPlus) {
          const rez = value + step
          if (rez <= max) input.value = rez
        }

        const obj = {
          min,
          max,
          step,
          value: +input.value,
          eventTarget,
          nodeParent,
          input,
          buttonMinus,
          buttonPlus,
        }
        this.priceUpdate(obj);
      }
    }
  }

  handlerBodyInput(event) {
    // event.preventDefault()
    const eventTarget = event.target;
    const nodeParent = eventTarget.closest(this.cardItem)
    if (nodeParent) {
      const input = nodeParent.querySelector(this.myNumberInput);
      const buttonMinus = nodeParent.querySelector(this.myNumberMinus);
      const buttonPlus = nodeParent.querySelector(this.myNumberPlus);

      if (input && buttonMinus && buttonPlus) {
        const min = +input.getAttribute("min") || -9999999;
        const max = +input.getAttribute("max") || 9999999;
        const step = +input.getAttribute("step") || 1;
        const value = +input.value;

        if (eventTarget === input) {
          console.log(value)
          if (value >= min && value <= max)
            input.value = value;
          else
            if (value > max)
              input.value = max;
            else if (value < min)
              input.value = min;
        }

        const obj = {
          min,
          max,
          step,
          value: +input.value,
          eventTarget,
          nodeParent,
          input,
          buttonMinus,
          buttonPlus,
        }

        this.priceUpdate(obj);
      }
    }
  }

  startTotalCostCards() {
    const priceCard = '.modal__card-price-number'
    const totalPrice = '.modal__card-sum'
    const modalCardList = document.querySelector(this.blockParent);
    if (modalCardList) {
      const modalCards = modalCardList?.querySelectorAll(this.blockParent + priceCard);
      const modalCardSum = modalCardList?.querySelector(this.blockParent + totalPrice); //Загальна сума всіх товарів
      const arrayFromNodeList = Array.from(modalCards);
      const totalCost = arrayFromNodeList.reduce((a, e) => a + +e.innerText, 0);
      modalCardSum && (modalCardSum.innerText = totalCost);
    }
  }

  priceUpdate(obj) {
    const modalCardWrap = obj.eventTarget.closest(this.cardItem); //Обгортка карточки
    const numberPrice = modalCardWrap?.querySelector(this.blockParent + '.modal__card-price-number'); //Загальна ціна товару карточки
    const numberDataPrice = numberPrice?.dataset.price; //Вартість одиниці товару
    numberPrice.innerText = `${obj.value * +numberDataPrice}`; //обновляємо ціну товару
    this.startTotalCostCards(); // Обновляємо ціну товарів
  }

  renderPopupCart() {
    const dataCarts = dataLocalStorage.getData('dataCart');
    const countProduct = '.modal__card-count-product span';
    const cardList = ".modal__card-list";
    const countProductElement = document.querySelector(this.blockParent + countProduct);
    if (dataCarts && countProductElement) {
      countProductElement.innerText = dataCarts.length

      const cards = document.querySelector(this.blockParent + cardList);
      cards.innerHTML = ''

      if (dataCarts.length > 0) {
        for (const dataCart of dataCarts) {
          const cartElement = `
        <li class="modal__card-item" data-id="${dataCart.id}">
        <div class="modal__card-wrap">
          <div class="modal__card-info">
            <div class="modal__card-img-box">
             ${dataCart.img}
            </div>
            <div class="modal__card-content">
              <h2 class="modal__card-title product-one__title">
              ${dataCart.title}
              </h2>
              <div class="modal__card-price product-one__price">
                <span class="modal__card-price-number" data-price="${dataCart.price}">${dataCart.price}</span>
                <span class="modal__card-price-currency">$</span>
              </div>
    
            </div>
          </div>
          <form class="modal__card-form" action="#">
            <div class="my-number">
              <button class="my-number__minus my-number__button">-</button>
              <input class="my-number__input" pattern="-?\d*" type="number" value="1" min="1" max="20">
              <button class="my-number__plus my-number__button">+</button>
            </div>
            <button class="modal__card-btn remove-product" type="submit">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" ><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
            </button>
          </form>
        </div>
      </li>
        `
          cards.insertAdjacentHTML("beforeend", cartElement);
        }
      } else {
        cards.insertAdjacentHTML("beforeend",
          `<li class="modal__card-item">
        <p class="modal__card-empty">
          У вас немає добавлених товарів
        </p>
      </li>
`
        );
      }
    }
  }

}

const eventPopupCard = new EventPopupCard();











