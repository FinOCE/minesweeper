import {Tile as TileValue} from '../models/Game'
import styles from '../styles/tile.module.sass'

export interface TileProps {
    value: TileValue,
    index: number
}

export default function Tile({value, index}: TileProps) {
    let v = value === 'B'
        ? 'X'
        : value === 0
            ? '.' // alignment issues with no character atm
            : value
    
    return (
        <div className={styles.tile} data-index={index}>
            {v}
        </div>
    )
}