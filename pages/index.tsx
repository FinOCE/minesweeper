import {MouseEvent} from 'react'
import Game from '../models/Game'
import Tile from '../components/Tile'
import styles from '../styles/index.module.sass'
import tileStyle from '../styles/tile.module.sass'

export default function index() {
    let game = new Game()
    game.setDifficulty('BEGINNER')
    game.create()

    return (
        <div id={styles.page}>
            <div id={styles.game} style={{gridTemplateColumns: `repeat(${game.width}, auto)`}}>
                {game.state.map((tile, i) => {
                    return (
                        <Tile
                            value={tile}
                            index={i}
                            key={i}
                            onClick={(e: MouseEvent, i: number) => {
                                e.currentTarget.classList.add(tileStyle.checked)
                                console.log(game.clearNearbyEmpties(i))
                            }}
                         />
                    )
                })}
            </div>
        </div>
    )
}