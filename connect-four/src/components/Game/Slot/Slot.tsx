import React, { useContext, useState } from 'react'
import { GameContext } from '../../providers'

import { ChipColors, Chip } from './Chip'

interface Props {
  row: number
  col: number
}

export const Slot = (props: Props): JSX.Element => {
  const gameContext = useContext(GameContext)
  const [chip, setChip] = useState<ChipColors | undefined>()

  const { playerOne, playerTwo } = gameContext.game

  const filled = (row: number, col: number): boolean =>
    (playerOne.row.includes(row) && playerOne.col.includes(col)) ||
    (playerTwo.row.includes(row) && playerTwo.col.includes(col))

  const handleClick = () => {
    gameContext.playerMove?.(props.row, props.col)
    setChip(!(gameContext.turn % 2) ? ChipColors.YELLOW : ChipColors.RED)
  }

  return (
    <div id="slot" style={styles.slot} onClick={handleClick}>
      <div id="hole-punch" style={styles.holePunch}>
        <Chip color={filled(props.row, props.col) ? chip : undefined} />
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  slot: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'cyan',
    height: 64,
    width: 64,
  },
  holePunch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,
    borderRadius: '50%',
    backgroundColor: '#fafafa',
  },
}
