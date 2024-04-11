let cells;
let size = 10;
const boardSizeBtn = document.getElementById('boardSize');

init()

function init() {
    initSize();
    initBoard();
}

function initBoard() {
    let board = document.querySelector('.board');
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
    document.documentElement.style.setProperty('--board-size', size);
}

function clear() {
    cells.forEach(cell => {
        cell.remove();
    });
}

function initSize() {
    boardSizeBtn.addEventListener('change', () => onSizeChanged());
}

function onSizeChanged() {
    clear();
    size = boardSizeBtn.value;
    console.log('size changed to ->' + size);
    init();
}