import React, { useContext, useState } from 'react'
import { GameContext } from '../../providers'

import { ChipColors, Chip } from './Chip'

interface Props {
  row: number
  col: number
}

export const Slot = ({ row, col }: Props): JSX.Element => {
  const gameContext = useContext(GameContext)
  const [chip, _setChip] = useState<ChipColors | undefined>()

  // TODO: onClick of Slot component should trigger gameContext.PlayerMove(), which will change chip color based on
  // turn being odd or even.

  return (
    <div
      id="slot"
      style={styles.slot}
      onClick={() => gameContext.playerMove?.(row, col)}
    >
      <div id="hole-punch" style={styles.holePunch}>
        {/* row-{_props.row}, col-{_props.col} */}

        {/* <Chip color={props?.chip} /> */}
        <Chip color={chip} />
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
