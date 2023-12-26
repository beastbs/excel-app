import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div> 
    <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    // Теряем контекст - тк этот метод в другом референсе вызывается в
    // другом контексте - из за чего в этом методе нет доступа к $root
    console.log(this);
    console.log('Formula: onInput', event.target.textContent.trim());
  }

  onClick(event) {
    console.log('Formula: onClick', event.target);
  }
}
