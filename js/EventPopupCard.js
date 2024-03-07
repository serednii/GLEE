



class EventPopupCard {
  // #numberBlockParent;
  // #callBack;
  constructor(numberBlockParent, callBack = undefined) {
    this.numberBlockParent = numberBlockParent;
    this.callBack = callBack;

    document.body.addEventListener('click', (event) => this.handlerBodyClick(event));
    document.body.addEventListener('input', (event) => this.handlerBodyInput(event));
  }

  handlerBodyClick(event) {
    const eventTarget = event.target;
    const nodeParent = eventTarget.closest(this.numberBlockParent)
    if (nodeParent) {
      event.preventDefault()
      const input = nodeParent.querySelector('.my-number__input');
      const buttonMinus = nodeParent.querySelector('.my-number__minus');
      const buttonPlus = nodeParent.querySelector('.my-number__plus');

      if (eventTarget.closest('.remove-product')) {
        const cardParent = eventTarget.closest('.modal__card-item');
        const idProduct = cardParent.dataset.id;
        // Видаляємо з локал сторкдж
        dataLocalStorage.deleteObj(idProduct, 'dataCart');
        // Робимо ререндеринг карточки
        this.renderPopupCart();
        // Міняємо лічильники на іконках
        eventCardButton.changeCounterHeaderCards();
        // Знімаємо кольори на кнопках
        eventCardButton.startChangeColorButtons();

      }

      if (input && buttonMinus && buttonPlus) {
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
        this.callBack && this.callBack(obj);
      }
      // console.log(event.target)
    }
  }

  handlerBodyInput(event) {
    // event.preventDefault()
    const eventTarget = event.target;
    const nodeParent = eventTarget.closest(this.numberBlockParent)
    if (nodeParent) {
      const input = nodeParent.querySelector('.my-number__input');
      const buttonMinus = nodeParent.querySelector('.my-number__minus');
      const buttonPlus = nodeParent.querySelector('.my-number__plus');

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

        this.callBack && this.callBack(obj);
      }
    }
  }

  //Обчисляємо загальну суму віх карточок
  totalCostCards(eventTarget, parentList, priceCard, totalPrice) {
    const modalCardList = eventTarget?.closest(parentList);
    const modalCards = modalCardList?.querySelectorAll(priceCard);
    const modalCardSum = modalCardList?.querySelector(totalPrice); //Загальна сума всіх товарів
    const arrayFromNodeList = Array.from(modalCards);
    const totalCost = arrayFromNodeList.reduce((a, e) => a + +e.innerText, 0);
    modalCardSum.innerText = totalCost;
  }

  startTotalCostCards(parentList, priceCard, totalPrice) {
    const modalCardList = document.querySelector(parentList);
    if (modalCardList) {
      const modalCards = modalCardList?.querySelectorAll(priceCard);
      const modalCardSum = modalCardList?.querySelector(totalPrice); //Загальна сума всіх товарів
      const arrayFromNodeList = Array.from(modalCards);
      const totalCost = arrayFromNodeList.reduce((a, e) => a + +e.innerText, 0);
      modalCardSum && (modalCardSum.innerText = totalCost);
    }
  }

  renderPopupCart() {
    const dataCarts = dataLocalStorage.getData('dataCart');
    const countProduct = document.querySelector('.modal__card-cart-count-product span');
    if (dataCarts && countProduct) {
      countProduct.innerText = dataCarts.length

      var cards = document.querySelector(".modal__card-list-cart");
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
      </li>`
        );
      }


    }


  }

}

function printObj(obj) {

  // buttonMinus
  // : 
  // button.my-number__minus.my-number__button
  // buttonPlus
  // : 
  // button.my-number__plus.my-number__button
  // eventTarget
  // : 
  // input.my-number__input
  // input
  // : 
  // input.my-number__input
  // max
  // : 
  // 20
  // min
  // : 
  // -20
  // nodeParent
  // : 
  // div.my-number
  // step
  // :
  // 1
  // value
  // :
  // "04"

  const modalCardWrap = obj.eventTarget.closest('.modal__card-wrap'); //Обгортка карточки
  const numberPrice = modalCardWrap?.querySelector('.modal__card-price-number'); //Загальна ціна товару карточки
  const numberDataPrice = numberPrice?.dataset.price; //Вартість одиниці товару
  numberPrice.innerText = `${obj.value * +numberDataPrice}`;
  eventPopupCard.startTotalCostCards('.modal__card-cart', '.modal__card-price-number', '.modal__card-sum');
}

const eventPopupCard = new EventPopupCard('.modal__card-form', printObj);
// numberCounter('.my-number', printObj);











