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
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
}

export interface GameContextType {
  game: Game
  gameMeta: GameMeta
  currentColor?: ChipColors
  newGame?: () => void
  playerMove?: (newRow: number, newCol: number) => void
  // rigidBody?: (newCol: number) => void
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
        // update how cols stack
        currCols: {
          ...gameMeta.currCols,
          ...{
            [newCol]: gameMeta.currCols[newCol] + 1,
          },
        },
      })
    },
    [game, gameMeta]
  )

  // needs to be its own set state, or deleted
  // const rigidBody = useCallback(
  //   (col: number) => {
  //     setGameMeta({
  //       ...gameMeta,
  //       currCols: {
  //         ...gameMeta.currCols,
  //         ...{
  //           [col]: gameMeta.currCols[col] + 1,
  //         },
  //       },
  //     })
  //   },
  //   [gameMeta]
  // )

  const contextValue = useMemo(
    () => ({ game, playerMove, gameMeta }),
    [game, playerMove, gameMeta]
  )
  // const contextValue = useMemo(
  //   () => ({ game, playerMove, gameMeta, rigidBody }),
  //   [game, playerMove, gameMeta, rigidBody]
  // )

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

export const historyKeyHelper = (r: number, c: number) => `${r},${c}`

export { GameContext, GameProvider }
