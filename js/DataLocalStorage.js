class DataLocalStorage {

  addData(data, key) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  toggleObj(obj, key) {
    let data = this.getData(key);
    const isObj = data.find((objEl) => objEl.id === obj.id);
    if (isObj) {
      this.deleteObj(obj.id, key);
      return 'deleted';
    } else {
      data.push(obj);
      this.addData(data, key);
      return 'added';
    }
  }

  getData(key) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  deleteObj(id, key) {
    const newClearData = this.getData(key)?.filter((obj) => obj.id !== id);
    this.addData(newClearData, key);
  }
}

const dataLocalStorage = new DataLocalStorage();

















// // console.log(dataLocalStorage.getData('dataCart'))
// // // dataLocalStorage.deleteObj(1, 'dataCart')
// // // dataLocalStorage.deleteObj(4, 'dataCart')
// // dataLocalStorage.deleteObj(5, 'dataCart')
// // console.log(dataLocalStorage.getData('dataCart'))
// const ooobj = {
//   id: 1,
//   title: 'Pendant lamp',
//   price: 23,
//   img: `<picture>
//   <source srcset="images/product/chair-7.webp" type="image/webp">
//   <source srcset="images/product/chair-7.avif" type="image/avif">
//   <img class="modal__card-img" src="images/product/chair-7.jpg" alt="chair images">
// </picture>`,

// }
// setInterval(() => {
//   console.log(dataLocalStorage.toggleObj(ooobj, 'dataCart'))

// }, 2000)
