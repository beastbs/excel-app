const CODES = {
  A: 65,
  Z: 90
}; // Что бы мы и другие програмисты понимали что это за величины и к чему они относятся
// 65 + 1 или CODES.A - есть разница(последний вариант более понятен)

// Pure function - те fn которые зависят от входных параметров
function createRow(number, content) {
  return `
  <div class='row'>
    <div class='row-info'>${number ? number : ''}</div>
    <div class='row-data'>${content}</div>
  </div>
  `;
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const number = i + 1;
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(number, cells));
  }

  // console.log(rows.join(''));

  return rows.join('');
}
