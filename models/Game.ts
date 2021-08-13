export type Tile = number | 'B'
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

    public print(): void {
        let displayString = ''

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let tile = this.state[y*this.width + x]

                displayString += tile === 'B'
                    ? 'X '
                    : tile === 0
                        ? '  '
                        : `${tile} `
            }

            displayString += '\n'
        }

        console.log(displayString)
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
            state[i] = 'B'
        }

        this.state = state

        for (let i = 0; i < this.state.length; i++) {
            this.state[i] = this.minesNearIndex(i)
        }
    }

    private minesNearIndex(index: number): Tile {
        if (this.state[index] === 'B') return 'B'

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
            if (this.state[index + position] === 'B' && !this.isTooFarAway(index, position)) minesNearby++
        }

        return minesNearby
    }

    private isTooFarAway(index: number, position: number): boolean {
        return ([
            index % this.width - 1,
            index % this.width,
            index % this.width + 1
        ].indexOf((index + position) % this.width)) === -1
    }
}