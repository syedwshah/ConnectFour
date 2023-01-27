import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { ChipColors } from '../Game/Slot'

const defaultGame: Game = {
  playerOne: [],
  playerTwo: [],
}

const defaultGameMeta: GameMeta = {
  history: {},
  turn: 0,
}

export interface GameContextType {
  game: Game
  gameMeta: GameMeta
  currentColor?: ChipColors
  newGame?: () => void
  playerMove?: (newRow: number, newCol: number) => void
}

const GameContext = createContext<GameContextType>({
  game: defaultGame,
  gameMeta: defaultGameMeta,
})

interface Props {
  children?: ReactNode
}

const GameProvider = ({ children }: Props): JSX.Element => {
  const { Provider } = GameContext

  const [gameMeta, setGameMeta] = useState<GameMeta>(defaultGameMeta)
  const [game, setGame] = useState<Game>(defaultGame)

  // TODO: newGame
  // const newGame = useCallback(() => defaultGame, [])

  const playerMove = useCallback(
    (newRow: number, newCol: number) => {
      // TODO(1): Chips should fall from column down to existing chip column
      // TODO(2): Prevent chip being placeed on existing Point

      const turn = gameMeta.turn

      const player = !(turn % 2) ? 'playerOne' : 'playerTwo'
      const chip = !(turn % 2) ? ChipColors.YELLOW : ChipColors.RED

      setGame({
        ...game,
        [player]: [
          ...game[player],
          {
            row: newRow,
            col: newCol,
            chip: chip,
          },
        ],
      })

      setGameMeta({
        ...gameMeta,
        history: {
          ...gameMeta.history,
          [historyKeyHelper(newRow, newCol)]: chip,
        },
        turn: turn + 1,
      })
    },
    [game, gameMeta]
  )

  const contextValue = useMemo(
    () => ({ game, playerMove, gameMeta }),
    [game, playerMove, gameMeta]
  )

  return <Provider value={contextValue}>{children}</Provider>
}

type DroppedChip = {
  row: number
  col: number
  chip?: ChipColors
}

type Game = {
  playerOne: DroppedChip[]
  playerTwo: DroppedChip[]
}

type GameMeta = {
  history: History
  turn: number
}

// Data is kept on type Game to maintain type safety.
// We could completely remove type Game and keep only GameMeta since
// History is unideal type safety, but it is easiest way to obtain colors properly
type History = Record<string, ChipColors>

export const historyKeyHelper = (r: number, c: number) => `${r},${c}`

export { GameContext, GameProvider }
