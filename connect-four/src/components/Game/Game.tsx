import React, { useContext } from 'react'
import { GameContext } from '../providers'
import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  const gameContext = useContext(GameContext)

  // eslint-disable-next-line
  console.log('game data: ', gameContext.game)

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
