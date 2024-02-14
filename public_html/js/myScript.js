const cellSize = 20
const size = 30

const life = {
    board: new Array(),
    borderX: function () { return (paper.view.size.width - size * cellSize) / 2 },
    borderY: function () { return (paper.view.size.height - size * cellSize) / 2 },

    coords: function (i, j) {
        x = this.borderX() + i * cellSize
        y = this.borderY() + j * cellSize
        return [x, y]
    },

    init: function() {
        for (let i = 0; i < size; i++) {
            this.board[i] = new Array()

            for (let j = 0; j < size; j++) {
                this.board[i][j] = new Cell(i, j)
            }
        }
    },
}

class Cell {
    #i
    #j
    #state = 0
    #previousState = 0
    #shape

    constructor(i, j) {
        this.#i = i
        this.#j = j
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
}

function onKeyUp(event) {
    // A Compléter
}

window.addEventListener("keyup", onKeyUp);

window.addEventListener("load",
    function () {
        let canvas = document.getElementById("myCanvas")
        paper.setup(canvas)
        // Placer le code à exécuter ici pour qu'il le soit une fois la page 
        // chargée dans son intégralité
        life.init()
    }
)