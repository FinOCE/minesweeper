import Game from './models/Game'

let game = new Game()
game.setDifficulty('BEGINNER')
game.create()
console.log(game)