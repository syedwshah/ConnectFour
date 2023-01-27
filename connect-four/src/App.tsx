import { Game } from './components'
import { GameProvider } from './components/providers'

const App = (): JSX.Element => (
  <GameProvider>
    <Game />
  </GameProvider>
)

export default App
