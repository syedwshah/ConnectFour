import React from 'react'

import { Slot } from '../Slot'

export const Game = (): JSX.Element => {
  return (
    <div id="game">
      <div style={{ position: 'absolute' }}>
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {[...Array(6)].map((_, row) => (
            <div style={styles.flex} key={row}>
              {[...Array(7)].map((_, col) => (
                <div key={`${row}-${col}`}>
                  <Slot row={row} col={col} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: '#fafafa',
  },
}