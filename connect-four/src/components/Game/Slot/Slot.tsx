import React, { useContext, useState } from 'react'
import { GameContext } from '../../providers'
import { ChipColors, Chip } from './Chip'

interface Props {
  // row: number
  // col: number
  color?: ChipColors
  onClick?: () => ChipColors | undefined
}

export const Slot = (props: Props): JSX.Element => {
  // if its position is in the data, use that color
  const gameContext = useContext(GameContext)
  const [color, setColor] = useState<ChipColors | undefined>()

  const _turn = gameContext.turn

  return (
    <div id="slot" style={styles.slot} onClick={() => setColor(props.onClick)}>
      <div id="hole-punch" style={styles.holePunch}>
        <Chip color={color} />
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
    padding: 2,
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
