/* global paper */

const cellSize = 20
const size = 30

const life = {
    board: [],
    borderX: function () { return (paper.view.size.width - size * cellSize) / 2 },
    borderY: function () { return (paper.view.size.height - size * cellSize) / 2 },

    coords: function (i, j) {
        let x = this.borderX() + i * cellSize
        let y = this.borderY() + j * cellSize
        return [x, y]
    },

    init: function () {
        for (let i = 0; i < size; i++) {
            this.board[i] = []

            for (let j = 0; j < size; j++) {
                this.board[i][j] = new Cell(i, j)
            }
        }
    },

    saveState: function () {
        for (const row of this.board) {
            for (const cell of row) {
                cell.saveState()
            }
        }
    },

    getPreviousState: function (i, j) {
        if ((0 <= i && i < size) && (0 <= j && j < size)) {
            return this.board[i][j].getPreviousState()
        }

        return 0
    },

    iterate: function () {
        this.saveState()

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = this.board[i][j]
                let aliveNeighbours = 0

                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        if (k || l) {
                            aliveNeighbours += this.getPreviousState(i + k, j + l)
                        }
                    }
                }

                if (cell.getPreviousState()) {
                    if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                        cell.die()
                    }
                } else {
                    if (aliveNeighbours == 3) {
                        cell.live()
                    }
                }
            }
        }
    }
}

class Cell {
    #i
    #j
    #state
    #previousState
    #shape

    constructor(i, j) {
        this.#i = i
        this.#j = j
        this.#state = 0
        this.#previousState = 0
        this.#shape = paper.Path.Circle({
            center: life.coords(this.#i, this.#j),
            radius: cellSize / 2,
            fillColor: 'white',
            strokeColor: 'blue'
        })
    }

    live() {
        this.#state = 1
        this.#shape.fillColor = 'cyan'
    }

    die() {
        this.#state = 0
        this.#shape.fillColor = 'white'
    }

    saveState() {
        this.#previousState = this.#state
    }

    getPreviousState() {
        return this.#previousState
    }
}

function onKeyUp(event) {
    if (event.key == 'g') {
        console.log("Step");
        life.iterate();
    }
}

function onFrame() {
    life.iterate()
}

window.addEventListener("keyup", onKeyUp);

window.addEventListener("load",
    function () {
        let canvas = document.getElementById("myCanvas")
        paper.setup(canvas)

        life.init()

        life.board[5][4].live();
        life.board[5][5].live();
        life.board[5][6].live();
        life.board[5][7].live();
        life.board[5][8].live();

        life.board[9][4].live();
        life.board[9][5].live();
        life.board[9][6].live();
        life.board[9][7].live();
        life.board[9][8].live();

        life.board[7][8].live();
        life.board[7][4].live();

        paper.view.setOnFrame(onFrame)
    }
)