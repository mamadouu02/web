import { useState } from 'react'
import { AppContext } from './AppContext'
import Accueil from './views/Accueil'
import LoginView from './views/LoginView'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(null)
  const [name, setName] = useState(null)

  return (
    <AppContext.Provider value={{ token, setToken, login, setLogin, name, setName }}>
      <main>
        {token ? <Accueil /> : <LoginView />}
      </main>
    </AppContext.Provider>
  )
}

export default App
