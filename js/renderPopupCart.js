// const renderPopupCart = () => {
//   const dataCarts = dataLocalStorage.getData('dataCart')
//   const countProduct = document.querySelector('.modal__card-cart-count-product span')
//   countProduct.innerText = dataCarts.length

//   var cards = document.querySelector(".modal__card-list-cart");
//   cards.innerHTML = ''
//   // console.log(cards)
//   for (let i = 0; i < dataCarts.length; i++) {
//     const dataCart = dataCarts[i];
//     const cartElement = `
//     <li class="modal__card-item" data-id="${dataCart.id}">
//     <div class="modal__card-wrap">
//       <div class="modal__card-info">
//         <div class="modal__card-img-box">
//          ${dataCart.img}
//         </div>
//         <div class="modal__card-content">
//           <h2 class="modal__card-title product-one__title">
//           ${dataCart.title}
//           </h2>
//           <div class="modal__card-price product-one__price">
//             <span class="modal__card-price-number" data-price="${dataCart.price}">${dataCart.price}</span>
//             <span class="modal__card-price-currency">$</span>
//           </div>

//         </div>
//       </div>
//       <form class="modal__card-form" action="#">
//         <div class="my-number">
//           <button class="my-number__minus my-number__button">-</button>
//           <input class="my-number__input" pattern="-?\d*" type="number" value="1" min="1" max="20">
//           <button class="my-number__plus my-number__button">+</button>
//         </div>
//         <button class="modal__card-btn remove-product" type="submit">
//         <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" ><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
//         </button>
//       </form>
//     </div>
//   </li>
//     `
//     cards.insertAdjacentHTML("beforeend", cartElement);
//   }

// }