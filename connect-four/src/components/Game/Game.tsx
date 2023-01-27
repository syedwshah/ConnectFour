import { CSSProperties, useContext } from 'react'
import { GameContext } from '../providers'

import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  const gameContext = useContext(GameContext)

  // const turn = gameContext.turn

  // const color = gameContext.game[!(turn % 2) ? 'playerOne' : 'playerTwo']
  const handleClick = (row: number, col: number) => {
    // if data exists don't run playerMove
    return gameContext.playerMove?.(row, col)
  }

  return (
    <div id="game">
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {[...Array(6)].map((_, rowIndex) => (
          <div style={styles.flex} key={rowIndex}>
            {[...Array(7)].map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}>
                <Slot
                  // row={rowIndex}
                  // col={colIndex}
                  // color={gameContext.game.playerOne[turn].chip}
                  onClick={() => handleClick(rowIndex, colIndex)}
                />
              </div>
            ))}
          </div>
        ))}
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
