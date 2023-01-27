import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { ChipColors } from '../Game/Slot'

const defaultGame: Game = {
  playerOne: [],
  playerTwo: [],
}

export interface GameContextType {
  game: Game
  turn: number
  newGame?: () => void
  playerMove?: (newRow: number, newCol: number) => ChipColors
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
      // TODO(1): Chips should fall from column down to existing chip column
      // TODO(2): Prevent chip being placeed on existing Point

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

      setTurn(turn + 1)

      return chip
    },
    [game, turn]
  )

  const contextValue = useMemo(
    () => ({ game, playerMove, turn }),
    [game, playerMove, turn]
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

export { GameContext, GameProvider }
