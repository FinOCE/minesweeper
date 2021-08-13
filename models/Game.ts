export type Tile = number | 'BOMB'
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' | 'CUSTOM'

export default class Game {
    public state: Tile[]
    public difficulty?: Difficulty

    public width: number
    public height: number
    public mines: number

    constructor() {
        this.state = []

        this.width = 0
        this.height = 0
        this.mines = 0
    }

    public setDifficulty(difficulty: Difficulty, width?: number, height?: number, mines?: number): void {
        const parameters = {
            'BEGINNER':     {width:  9, height:  9, mines: 10},
            'INTERMEDIATE': {width: 16, height: 16, mines: 40},
            'EXPERT':       {width: 30, height: 16, mines: 99}
        }

        if (difficulty === 'CUSTOM') {
            if (!width || !height || !mines) throw 'Custom difficulty paramaters not specified'

            this.width = width
            this.height = height
            this.mines = mines
        } else {
            this.width = parameters[difficulty].width
            this.height = parameters[difficulty].height
            this.mines = parameters[difficulty].mines
        }

        this.difficulty = difficulty
    }

    public create(): void {
        if (!this.difficulty) throw 'No difficulty was set'

        let bombIndex = new Set<number>()
        let state = new Array<Tile>(this.width*this.height)

        while (bombIndex.size < this.mines) {
            let i = Math.round(Math.random()*this.width*this.height)
            bombIndex.add(i)
            state[i] = 'BOMB'
        }

        this.state = state

        for (let i = 0; i < this.state.length; i++) {
            this.state[i] = this.minesNearIndex(i)
        }
    }

    private minesNearIndex(index: number): Tile {
        if (this.state[index] === 'BOMB') return 'BOMB'

        let relativePosition = [
            -this.width - 1,    // top left
            -this.width,        // top
            -this.width + 1,    // top right
            -1,                 // left
            1,                  // right
            this.width - 1,     // bottom left
            this.width,         // bottom
            this.width + 1      // bottom right
        ]

        let minesNearby = 0

        for (let position of relativePosition) {
            if (this.state[index + position] === 'BOMB') minesNearby++
        }

        return minesNearby
    }
}