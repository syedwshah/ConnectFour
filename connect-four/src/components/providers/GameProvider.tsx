import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

export const defaultGame: Game = {
  turn: 0,
  playerOne: {
    row: [],
    col: [],
  },
  playerTwo: {
    row: [],
    col: [],
  },
}

export interface GameContextType {
  game: Game
  newGame?: () => void
  playerMove?: (newRow: number, newCol: number) => void
}

const GameContext = createContext<GameContextType>({
  game: defaultGame,
})

interface Props {
  children?: ReactNode
}

const GameProvider = ({ children }: Props): JSX.Element => {
  const { Provider } = GameContext

  const [game, setGame] = useState<Game>(defaultGame)
  // TODO: replace turn state with game state since it contains player and turn data

  // const newGame = useMemo(() => defaultGame, [])
  const newGame = useCallback(() => defaultGame, [])

  const playerMove = useCallback(
    (newRow: number, newCol: number) => {
      // update row and col data:
      // TODO: change row, col to Point to simplify algos
      // odd number

      // TODO: prevent player from placing chip on another player's chip
      // TODO: Prevent chip being placeed on existing Point
      if (!(game.turn % 2)) {
        setGame({
          ...game,

          playerOne: {
            row: [...game.playerOne.row, newRow],
            col: [...game.playerOne.col, newCol],
          },
          turn: game.turn + 1,
        })
      } else {
        setGame({
          ...game,
          playerTwo: {
            row: [...game.playerTwo.row, newRow],
            col: [...game.playerTwo.col, newCol],
          },
          turn: game.turn + 1,
        })
      }
    },
    [game]
  )

  const gameData = useMemo(() => game, [game])

  const contextValue = useMemo(
    () => ({ game: gameData, newGame, playerMove }),
    [gameData, newGame, playerMove]
  )

  return <Provider value={contextValue}>{children}</Provider>
}

// Types may go into seperate directory
type Position = {
  row: number[]
  col: number[]
}

// type Point = [row: number, col: number]

type Game = {
  turn: number
  playerOne: Position
  playerTwo: Position
}

export { GameContext, GameProvider }
