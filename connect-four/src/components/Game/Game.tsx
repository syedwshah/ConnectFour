import { CSSProperties, useContext, useEffect, useState } from 'react'
import { COLS, GameContext, kvHelper, ROWS } from '../providers'

import { Slot } from './Slot'

export const Game = (): JSX.Element => {
  const gameContext = useContext(GameContext)
  const [winner, setWinner] = useState<string>()

  useEffect(() => {
    const board = gameContext.gameMeta.history

    if (gameContext.gameMeta.turn === ROWS * COLS) {
      setWinner('stalemate')
    }

    // if no winner, search winner
    if (!winner) {
      // horizontal
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
          const color: string = board[kvHelper(r, c)]
          if (
            color &&
            color === board[kvHelper(r, c + 1)] &&
            color === board[kvHelper(r, c + 2)] &&
            color === board[kvHelper(r, c + 3)]
          ) {
            setWinner(color)
          }
        }
      }
    }

    // vertical
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS - 3; r++) {
        const color: string = board[kvHelper(r, c)]
        if (
          color &&
          color === board[kvHelper(r + 1, c)] &&
          color === board[kvHelper(r + 2, c)] &&
          color === board[kvHelper(r + 3, c)]
        ) {
          setWinner(color)
          return
        }
      }
    }

    // neg-diagonal
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        const color: string = board[kvHelper(r, c)]
        if (
          color &&
          color === board[kvHelper(r + 1, c + 1)] &&
          color === board[kvHelper(r + 2, c + 2)] &&
          color === board[kvHelper(r + 3, c + 3)]
        ) {
          setWinner(color)
          return
        }
      }
    }

    /// diagonal
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        const color: string = board[kvHelper(r, c)]
        if (
          color &&
          color === board[kvHelper(r - 1, c + 1)] &&
          color === board[kvHelper(r - 2, c + 2)] &&
          color === board[kvHelper(r - 3, c + 3)]
        ) {
          setWinner(color)
          return
        }
      }
    }
  }, [
    gameContext.gameMeta.history,
    winner,
    setWinner,
    gameContext.gameMeta.turn,
  ])

  const turn = gameContext.gameMeta.turn
  const player = !(turn % 2) ? 'Player 1' : 'Player 2'
  const board = gameContext.gameMeta.history

  const handleClick = (row: number, col: number) => {
    const r = gameContext.gameMeta.currCols[col]

    if (r >= 0 && !winner) {
      gameContext.playerMove?.(r - row, col)
    }
  }

  return (
    <div id="game">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[...Array(ROWS)].map((_, rowIndex) => (
          <div style={styles.flex} key={rowIndex}>
            {[...Array(COLS)].map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}>
                <Slot
                  color={board[kvHelper(rowIndex, colIndex)]}
                  topRow={rowIndex === 0}
                  onClick={() => handleClick(rowIndex, colIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ margin: 12 }}>
        <p>{player}'s turn</p>
        <p>{turn} Chips Dropped </p>
        <p>winner: {winner}</p>

        <p>
          <b>How to play:</b> Hover cursor to top of board, click to drop chip
        </p>

        <button onClick={gameContext.newGame}>New Game</button>
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
  hoverChip: {
    backgroundColor: 'black',
  },
}
