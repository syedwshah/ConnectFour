import { createContext, ReactNode } from 'react'

export const defaultGame: Game = {
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
  newGame: () => void
  playerMove: () => void
}

const GameContext = createContext<GameContextType>({
  game: defaultGame,
  newGame: () => undefined,
  playerMove: () => undefined,
})

interface Props {
  children?: ReactNode
}

const GameProvider = ({ children }: Props): JSX.Element => {
  const { Provider } = GameContext

  //override
  const newGame = () => undefined
  const playerMove = () => undefined

  return (
    <Provider value={{ game: defaultGame, newGame, playerMove }}>
      {children}
    </Provider>
  )
}

export { GameContext, GameProvider }

type Position = {
  row: number[]
  col: number[]
}

interface Game {
  playerOne: Position
  playerTwo: Position
}
