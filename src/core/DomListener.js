import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      // this - ссылается на instance класса - и через []
      // получаем доступ до instance этого класса
      // console.log(this);

      if (!this[method]) {
        const name = this.name || '';
        throw new Error(`Method ${method} is not emplemented in ${name} Component!`);
      }

      // 2 Способ - переопределяем эти методы(onInput, onClick) - всегда будет
      // забаинден на свой контекст - куда бы мы его не передавали
      this[method] = this[method].bind(this); // те ссылка на fn остается та же

      // Метод bind - создает новую fn - и поэтому fn ниже и в removeDOMListeners - РАЗНЫЕ
      // И поэтому СОБЫТИЯ НЕ удаляются (advanced js)
      // The same like addEventListener method;
      // this.$root.on(listener, this[method].bind(this));

      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach( (listener) => {
      const method = getMethodName(listener);

      // Теперь этот метод this[method] - с текущим контекстом
      this.$root.off(listener, this[method]);
    });
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

