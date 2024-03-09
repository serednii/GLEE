



class EventBody {
  #handlerClickFunction = [];
  #handlerInputFunction = [];

  constructor() {
    document.body.addEventListener('click', (event) => this.handlerBodyClick(event));
    document.body.addEventListener('input', (event) => this.handlerBodyInput(event));
  }

  handlerBodyClick(event) {
    for (let keyFunction of this.#handlerClickFunction) {
      console.log('jjj')
      keyFunction(event)
    }
  }

  handlerBodyInput(event) {
    for (let keyFunction of this.#handlerInputFunction) {
      console.log('jjj')
      keyFunction(event)
    }
  }

  addHandlerClickFunction(callBack) {
    this.#handlerClickFunction.push(callBack)
    console.log(this.#handlerClickFunction)
  }

  addHandlerInputFunction(callBack) {
    this.#handlerInputFunction.push(callBack)
    console.log(this.#handlerInputFunction)
  }



}


const eventBody = new EventBody();











