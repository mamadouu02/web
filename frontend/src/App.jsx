import { useState } from 'react'
import { AppContext } from './AppContext'
import Accueil from './views/Accueil'
import LoginView from './views/LoginView'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [name, setName] = useState(null)
  const backend = 'http://localhost:3000'

  return (
    <AppContext.Provider value={{ token, setToken, name, setName, backend }}>
      <main>
        {token ? <Accueil /> : <LoginView />}
      </main>
    </AppContext.Provider>
  )
}

export default App
