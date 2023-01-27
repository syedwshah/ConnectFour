import { CSSProperties, useContext } from 'react'
import { GameContext, historyKeyHelper } from '../providers'

import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  const gameContext = useContext(GameContext)

  const history = gameContext.gameMeta.history

  // const turn = gameContext.turn

  // const color = gameContext.game[!(turn % 2) ? 'playerOne' : 'playerTwo']
  const handleClick = (row: number, col: number) => {
    // if data exists don't run playerMove

    const dataExists = history[historyKeyHelper(row, col)]

    if (!dataExists) {
      return gameContext.playerMove?.(row, col)
    } else {
      gameContext.playerMove?.(row + 1, col)
    }
  }

  return (
    <div id="game">
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {[...Array(6)].map((_, rowIndex) => (
          <div style={styles.flex} key={rowIndex}>
            {[...Array(7)].map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}>
                <Slot
                  onClick={() => handleClick(rowIndex, colIndex)}
                  color={
                    gameContext.gameMeta.history[
                      historyKeyHelper(rowIndex, colIndex)
                    ]
                  }
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
