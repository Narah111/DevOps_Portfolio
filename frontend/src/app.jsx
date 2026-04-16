import { BugProvider } from './context/BugContext'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <BugProvider>
      <Dashboard />
    </BugProvider>
  )
}

export default App