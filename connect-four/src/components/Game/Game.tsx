import { CSSProperties, useContext } from 'react'
import { COLS, GameContext, historyKeyHelper, ROWS } from '../providers'

import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  const gameContext = useContext(GameContext)

  const history = gameContext.gameMeta.history

  const handleClick = (row: number, col: number) => {
    // if data exists don't run playerMove
    const dataExists = history[historyKeyHelper(row, col)]
    const r = gameContext.gameMeta.currCols[row]

    console.log(r)
    if (!dataExists) {
      gameContext.playerMove?.(row, col)
      // gameContext.rigidBody?.(row)
    } else if (r < 6) {
      gameContext.playerMove?.(r + row, col)
    }
  }

  return (
    <div id="game">
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {[...Array(ROWS)].map((_, rowIndex) => (
          <div style={styles.flex} key={rowIndex}>
            {[...Array(COLS)].map((_, colIndex) => (
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
