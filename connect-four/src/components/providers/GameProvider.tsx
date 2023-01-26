import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

export const defaultGame: Game = {
  turn: 0,
  playerOne: [],
  playerTwo: [],
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

  const newGame = useCallback(() => defaultGame, [])

  const playerMove = useCallback(
    (newRow: number, newCol: number) => {
      // TODO(1): Chips should fall from column down to existing chip column
      // TODO(2): Prevent chip being placeed on existing Point
      if (!(game.turn % 2)) {
        setGame({
          ...game,
          turn: game.turn + 1,
          playerOne: [...game.playerOne, [newRow, newCol]],
        })
      } else {
        setGame({
          ...game,
          turn: game.turn + 1,
          playerTwo: [...game.playerTwo, [newRow, newCol]],
        })
      }
    },
    [game, setGame]
  )

  const gameData = useMemo(() => game, [game])

  const contextValue = useMemo(
    () => ({ game: gameData, newGame, playerMove }),
    [gameData, newGame, playerMove]
  )

  return <Provider value={contextValue}>{children}</Provider>
}

type Point = [row: number, col: number]

type Game = {
  turn: number
  playerOne: Point[]
  playerTwo: Point[]
}

export { GameContext, GameProvider }
