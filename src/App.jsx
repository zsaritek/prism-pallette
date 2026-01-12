import './App.css'
import { AppShell } from './app/AppShell.jsx'
import { TokensProvider } from './features/tokens/TokensContext.jsx'

function App() {
  return (
    <TokensProvider>
      <AppShell />
    </TokensProvider>
  )
}

export default App
