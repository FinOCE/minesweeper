import {MouseEvent} from 'react'
import {Tile as TileValue} from '../models/Game'
import styles from '../styles/tile.module.sass'

export interface TileProps {
    value: TileValue,
    index: number,
    onClick: (e: MouseEvent, i: number) => void,
}

export default function Tile({value, index, onClick}: TileProps) {
    return (
        <div className={styles.tile} onClick={e => onClick(e, index)}>
            {value === 'B' ? 'X' : value === 0 ? '' : value}
        </div>
    )
}