import { useState } from 'react'
import { AppContext } from './AppContext'
import Accueil from './views/Accueil'
import LoginView from './views/LoginView'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(null)
  const [count, setCount] = useState(0)
  // const backend = 'https://web-application.osc-fr1.scalingo.io'
  const backend = 'http://localhost:3000'

  return (
    <AppContext.Provider value={{ token, setToken, login, setLogin, count, setCount, backend }}>
      <main>
        {token ? <Accueil /> : <LoginView />}
      </main>
    </AppContext.Provider>
  )
}

export default App
