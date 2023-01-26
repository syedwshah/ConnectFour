import { CSSProperties } from 'react'

import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  return (
    <div id="game">
      <div style={{ position: 'absolute' }}>
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {[...Array(6)].map((_, rowIndex) => (
            <div style={styles.flex} key={rowIndex}>
              {[...Array(7)].map((_, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  <Slot row={rowIndex} col={colIndex} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: '#fafafa',
  },
}
