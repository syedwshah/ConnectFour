import React, { useContext } from 'react'
import { GameContext } from '../../providers'
import { ChipColors, Chip } from './Chip'

interface Props {
  color?: ChipColors
  onClick?: () => void
}

export const Slot = (props: Props): JSX.Element => {
  // if its position is in the data, use that color
  const gameContext = useContext(GameContext)
  // const [color, setColor] = useState<ChipColors | undefined>()

  const _turn = gameContext.gameMeta.turn

  return (
    <div id="slot" style={styles.slot} onClick={props.onClick}>
      <div id="hole-punch" style={styles.holePunch}>
        <Chip color={props.color} />
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
