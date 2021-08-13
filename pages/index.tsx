import Game from '../models/Game'
import Tile from '../components/Tile'
import styles from '../styles/index.module.sass'

export default function index() {
    let game = new Game()
    game.setDifficulty('BEGINNER')
    game.create()

    return (
        <div id={styles.page}>
            <div id={styles.game}>
                {game.state.map((tile, i) => {

                    return (
                        <>
                            {i % game.width === 0 && i !== 0 ? <br /> : ''}
                            <Tile value={tile} index={i} />
                        </>
                    )
                })}
            </div>
        </div>
    )
}