import React from 'react'

import { Chip, ChipColors } from '../Chip'

interface Props {
  row?: number
  col?: number
  chip?: ChipColors
}

export const Slot = (props: Props): JSX.Element => {
  return (
    <div id="slot" style={styles.slot} onClick={() => null}>
      <div id="hole-punch" style={styles.holePunch}>
        {/* row-{_props.row}, col-{_props.col} */}
        <Chip color={props?.chip} />
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
