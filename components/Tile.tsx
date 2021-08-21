import {MouseEvent} from 'react'
import {Tile as TileValue} from '../models/Game'
import styles from '../styles/tile.module.sass'

export interface TileProps {
    value: TileValue,
    index: number,
    onClick: (e: MouseEvent, i: number) => void,
    onContextMenu: (e: MouseEvent, i: number) => void
}

export default function Tile({value, index, onClick, onContextMenu}: TileProps) {
    return (
        <div
            className={styles.tile}
            onClick={e => onClick(e, index)}
            onContextMenu={e => onContextMenu(e, index)}
            suppressHydrationWarning
        >
            {value === 'B' ? 'X' : value === 0 ? '' : value}
        </div>
    )
}