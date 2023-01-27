import React, { useState } from 'react'

import { ChipColors, Chip } from './Chip'

interface Props {
  color?: ChipColors
  topRow: boolean
  onClick?: () => void
}

export const Slot = (props: Props): JSX.Element => {
  const [hover, setHover] = useState(false)

  return (
    <div
      id="slot"
      style={{
        ...styles.slot,
        ...{ cursor: props.topRow ? 'pointer' : 'auto' },
        ...{ backgroundColor: props.topRow && hover ? 'blue' : 'cyan' },
      }}
      onClick={props.topRow ? props.onClick : undefined}
    >
      <div
        id="hole-punch"
        style={{
          ...styles.holePunch,
          ...{ cursor: props.topRow ? 'pointer' : 'auto' },
        }}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => setHover(false)}
      >
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
  },
}
