



class EventPopupHeart {
  constructor() {
    this.blockParent = '.modal__card-heart ';
    this.cardItem = this.blockParent + '.modal__card-item'
    eventBody.addHandlerClickFunction(this.handlerBodyClick.bind(this))

    // document.body.addEventListener('click', (event) => this.handlerBodyClick(event));
    // document.body.addEventListener('input', (event) => this.handlerBodyInput(event));
  }

  handlerBodyClick(event) {

    const eventTarget = event.target;
    const nodeParent = eventTarget.closest(this.cardItem)
    if (nodeParent) {
      event.preventDefault()
      if (eventTarget.closest('.remove-product')) {
        const cardParent = eventTarget.closest(this.cardItem);
        const idProduct = cardParent.dataset.id;
        // Видаляємо з локал сторкдж
        dataLocalStorage.deleteObj(idProduct, 'dataHeart');
        // Робимо ререндеринг карточки
        this.renderPopupHeart();
        // Міняємо лічильники на іконках
        eventCardButton.changeCounterHeaderCards();
        // Знімаємо кольори на кнопках
        eventCardButton.startChangeColorButtons();
      }
    }
  }

  renderPopupHeart() {
    const dataCarts = dataLocalStorage.getData('dataHeart');
    const countProduct = '.modal__card-count-product span';
    const cardList = ".modal__card-list";
    const countProductElement = document.querySelector(this.blockParent + countProduct);
    if (dataCarts && countProductElement) {
      countProductElement.innerText = dataCarts.length
      var cards = document.querySelector(this.blockParent + cardList);
      cards && (cards.innerHTML = '')

      if (dataCarts.length > 0) {
        for (const dataCart of dataCarts) {
          const cartElement = `

      <li class="modal__card-item" data-id="${dataCart.id}">
      <div class="modal__card-wrap">
        <div class="modal__card-info">
          <div class="modal__card-img-box">
          <div class="modal__card-img-box">
          ${dataCart.img}
         </div>
          </div>
          <div class="modal__card-content">
          <h2 class="modal__card-title product-one__title">
          ${dataCart.title}
          </h2>
            <div class="modal__card-price product-one__price">
              <span class="modal__card-price-number" data-price="${dataCart.price}">23</span>
              <span class="modal__card-price-currency">$</span>
            </div>
          </div>
        </div>

        <button class="modal__card-btn remove-product" type="submit">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px"
            width="30px">
            <path
              d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z">
            </path>
          </svg>
        </button>
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


const eventPopupHeart = new EventPopupHeart();












