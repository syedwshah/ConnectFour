import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

const defaultGame: Game = {
  playerOne: { row: [], col: [] },
  playerTwo: { row: [], col: [] },
}

export interface GameContextType {
  game: Game
  turn: number
  newGame?: () => void
  playerMove?: (newRow: number, newCol: number) => void
}

const GameContext = createContext<GameContextType>({
  game: defaultGame,
  turn: 0,
})

interface Props {
  children?: ReactNode
}

const GameProvider = ({ children }: Props): JSX.Element => {
  const { Provider } = GameContext

  const [turn, setTurn] = useState(0)
  const [game, setGame] = useState<Game>(defaultGame)

  // TODO: newGame
  // const newGame = useCallback(() => defaultGame, [])

  const playerMove = useCallback(
    (newRow: number, newCol: number) => {
      const { playerOne, playerTwo } = game

      // TODO(1): Chips should fall from column down to existing chip column
      // TODO(2): Prevent chip being placeed on existing Point

      const slotTaken =
        (playerOne.row.includes(newRow) && playerOne.col.includes(newCol)) ||
        (playerTwo.row.includes(newRow) && playerTwo.col.includes(newCol))

      const player = !(turn % 2) ? 'playerOne' : 'playerTwo'

      if (!slotTaken) {
        setGame({
          ...game,
          [player]: {
            row: [...game[player].row, newRow],
            col: [...game[player].col, newCol],
          },
        })
        setTurn(turn + 1)
      } else {
        //TODO: make sure there is still a row available
        setGame({
          ...game,
          [player]: {
            row: [...game[player].row, newRow + 1],
            col: [...game[player].col, newCol],
          },
        })
        setTurn(turn + 1)
      }
    },
    [game, setGame, turn, setTurn]
  )

  const contextValue = useMemo(
    () => ({ game, playerMove, turn }),
    [game, playerMove, turn]
  )

  return <Provider value={contextValue}>{children}</Provider>
}

interface Position {
  row: number[]
  col: number[]
}

type Game = {
  playerOne: Position
  playerTwo: Position
}

export { GameContext, GameProvider }
