// Позволит проще работать с DOM-деревом в будуйщем

class Dom {
  constructor(selector) {
    // this.$$listeners = {};
    this.$nativeElement = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      // this - for chaining (one of js-patterns)
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  log(data) {
    console.log(!data ? this.$nativeElement : data);
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    // 1 решение
    // this.$$listeners[eventType] = callback;
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    // this.$nativeElement.removeEventListener(eventType, this.$$listeners[eventType]);
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  append(node) {
    // Проверка для того - если node - будет нативная нода
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }
}
// event.target - например
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
