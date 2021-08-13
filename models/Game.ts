export default class Game {
    public state: number[]
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
        let state = new Array<number>(this.width*this.height)

        while (bombIndex.size < bombs) {
            let i = Math.round(Math.random()*this.width*this.height)
            bombIndex.add(i)
            state[i] = 0
        }

        this.state = state
    }
}