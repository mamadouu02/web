import { useState, useRef } from 'react'
import './App.css'

function App() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [token, setToken] = useState(null)

  async function login() {
    const res = await
      (await fetch("https://web-application.osc-fr1.scalingo.io/login",
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value })
        }
      )).json()
    setToken(res.token)
  }

  return (
    <fieldset>
      <legend>Se connecter</legend>
      <label>Email : </label>
      <input ref={emailRef} type="text" />
      <label>Mot de passe : </label>
      <input ref={passwordRef} type="password" />
      <button onClick={login}>OK</button>
      {token ? <span>Token : {token}</span> : null}
    </fieldset>
  )
}

export default App
