export type Tile = number | 'BOMB'

export default class Game {
    public state: Tile[]
    public width: number
    public height: number

    constructor(width: number, height: number, bombs: number) {
        this.state = []

        this.width = width
        this.height = height

        this.create(bombs)
    }

    private create(bombs: number): void {
        let bombIndex = new Set<number>()
        let state = new Array<Tile>(this.width*this.height)

        while (bombIndex.size < bombs) {
            let i = Math.round(Math.random()*this.width*this.height)
            bombIndex.add(i)
            state[i] = 'BOMB'
        }

        this.state = state

        for (let i = 0; i < this.state.length; i++) {
            this.state[i] = this.bombsNearIndex(i)
        }
    }

    private bombsNearIndex(index: number): Tile {
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

        let bombsNearby = 0

        for (let position of relativePosition) {
            if (this.state[index + position] === 'BOMB') bombsNearby++
        }

        return bombsNearby
    }
}