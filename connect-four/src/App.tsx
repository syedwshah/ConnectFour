import { Game } from './components'
import { GameProvider } from './providers/GameProvider'

const App = (): JSX.Element => (
  <GameProvider>
    <Game />
  </GameProvider>
)

export default App
