let cells;
let loose = false;
let size = 10;
let flagMode = false;
let bombs = [];
let numbers = [];
let difficulty = 0.1;
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
const boardSizeBtn = document.getElementById('boardSize');

init()

function init() {
    loose = false;
    initSize();
    initBoard();
    initBombs();
    initFlag();
    initNums();
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

function onCellClick(cell) {
    if(flagMode === false && cell.innerHTML === '🚩'){
        cell.innerHTML = '';
    }
    if(cell.classList.contains('opened') || loose) return;

    let coordinates = cell.getAttribute('cell-coordinates');
    if(bombs.includes(coordinates)){
        console.log("boom");
        setBomb(cell);
        loose = true;
    }

    let num = cell.getAttribute('cell-num');
    if (num != null){
        cell.classList.add('opened');
        cell.innerHTML = num;
        cell.style.color = numberColors[num-1];
        return;
    }
    

    checkNeighbours(coordinates);

    if(flagMode){
        setFlag(cell);
        return;
    }
    cell.classList.add('opened');
}

function checkNeighbours(coordinates){
    let coords = coordinates.split(',');
	let x = parseInt(coords[0]);
	let y = parseInt(coords[1]);
    setTimeout(() => {
		if (x > 0) {
			let targetW = document.querySelectorAll(`[cell-coordinates="${x-1},${y}"`)[0];
			onCellClick(targetW, `${x-1},${y}`);
		}
		if (x < size - 1) {
			let targetE = document.querySelectorAll(`[cell-coordinates="${x+1},${y}"`)[0];
			onCellClick(targetE, `${x+1},${y}`);
		}
		if (y > 0) {
			let targetN = document.querySelectorAll(`[cell-coordinates="${x},${y-1}"]`)[0];
			onCellClick(targetN, `${x},${y-1}`);
		}
		if (y < size - 1) {
			let targetS = document.querySelectorAll(`[cell-coordinates="${x},${y+1}"]`)[0];
			onCellClick(targetS, `${x},${y+1}`);
		}
		
		if (x > 0 && y > 0) {
			let targetNW = document.querySelectorAll(`[cell-coordinates="${x-1},${y-1}"`)[0];
			onCellClick(targetNW, `${x-1},${y-1}`);
		}
		if (x < size - 1 && y < boardSize - 1) {
			let targetSE = document.querySelectorAll(`[cell-coordinates="${x+1},${y+1}"`)[0];
			onCellClick(targetSE, `${x+1},${y+1}`);
		}
		
		if (y > 0 && x < boardSize - 1) {
			let targetNE = document.querySelectorAll(`[cell-coordinates="${x+1},${y-1}"]`)[0];
			onCellClick(targetNE, `${x+1},${y-1}`);
		}
		if (x > 0 && y < boardSize - 1) {
			let targetSW = document.querySelectorAll(`[cell-coordinates="${x-1},${y+1}"`)[0];
			onCellClick(targetSW, `${x-1},${y+1}`);
		}
	}, 10);

}

function setFlag(cell){
    cell.classList.remove("opened");
    cell.innerHTML = "🚩";
}

function setBomb(cell){
    cell.innerHTML = "💣";
}

function initNums(){
    numbers.forEach(num => {
        let coords = num.split(',');
		let tile = document.querySelectorAll(`[cell-coordinates="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
		let dataNum = parseInt(tile.getAttribute('cell-num'));
		if (!dataNum) dataNum = 0;
		tile.setAttribute('cell-num', dataNum + 1);
    });
}
function clear() {
    cells.forEach(cell => {
        cell.remove();
    });
}

function initSize() {
    boardSizeBtn.addEventListener('change', () => onSizeChanged());
}

function initFlag(){
    const flagModeButton = document.querySelector('.flagMode');
    flagModeButton.addEventListener('click', () => onFlagClick(flagModeButton));
}

function onFlagClick(flagModeButton){
    if(flagMode){
        flagMode = false;
        flagModeButton.classList.remove('selected');
    }
    else 
    {
        flagMode = true;
        flagModeButton.classList.add('selected');
    }
}

function onSizeChanged() {
    clear();
    size = boardSizeBtn.value;
    console.log('size changed to ->' + size);
    init();
}

function initBombs() {
    let x = 0;
    let y = 0;
    cells.forEach(cell => {
        cell.setAttribute('cell-coordinates', `${x},${y}`);
        let rnd = Math.random() < difficulty;
        if (rnd) {
            bombs.push(`${x},${y}`);
            if (x > 0) numbers.push(`${x - 1},${y}`);
            if (x < size - 1) numbers.push(`${x + 1},${y}`);
            if (y > 0) numbers.push(`${x},${y - 1}`);
            if (y < size - 1) numbers.push(`${x},${y + 1}`);

            if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
            if (x < size - 1 && y < size - 1) numbers.push(`${x + 1},${y + 1}`);

            if (y > 0 && x < size - 1) numbers.push(`${x + 1},${y - 1}`);
            if (x > 0 && y < size - 1) numbers.push(`${x - 1},${y + 1}`);
        }

        x++;
        if (x >= size) {
            x = 0;
            y++;
        }
        cell.addEventListener('click', () => onCellClick(cell));
    })

}