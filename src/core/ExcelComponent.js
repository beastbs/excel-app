import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }
  // Возвращает шаблон компонета
  toHTML() {
    return '';
  }

  init() {
    // console.log(this);
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
