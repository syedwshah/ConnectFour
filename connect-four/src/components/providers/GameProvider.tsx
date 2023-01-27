import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { ChipColors } from '../Game/Slot'

export const [ROWS, COLS] = [6, 7]

const defaultGame: Game = {
  playerOne: [],
  playerTwo: [],
}

const defaultGameMeta: GameMeta = {
  history: {},
  turn: 0,
  currCols: {
    0: ROWS - 1,
    1: ROWS - 1,
    2: ROWS - 1,
    3: ROWS - 1,
    4: ROWS - 1,
    5: ROWS - 1,
    6: ROWS - 1,
  },
}

export interface GameContextType {
  game: Game
  gameMeta: GameMeta
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
  const newGame = useCallback(() => {
    setGame(defaultGame)
    setGameMeta(defaultGameMeta)
  }, [])

  const playerMove = useCallback(
    (newRow: number, newCol: number) => {
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
          [kvHelper(newRow, newCol)]: chip,
        },
        turn: turn + 1,

        currCols: {
          ...gameMeta.currCols,
          ...{
            [newCol]: gameMeta.currCols[newCol] - 1,
          },
        },
      })
    },
    [game, gameMeta]
  )

  const contextValue = useMemo(
    () => ({ game, playerMove, gameMeta, newGame }),
    [game, playerMove, gameMeta, newGame]
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
  currCols: Record<number, number>
}

// History is unideal type safety, since anything could go into the key of type string
// This is easiest way to obtain colors properly.
// Data is kept on type Game to maintain type safety.

// We may remove type Game and keep only GameMeta based on coding preferences
type History = Record<string, ChipColors>

export const kvHelper = (r: number, c: number) => `${r},${c}`

export { GameContext, GameProvider }
