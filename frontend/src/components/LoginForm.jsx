import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'

function LoginForm({ onValid }) {
  const { login } = useContext(AppContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    setEmail(login ? login : "")
  }, [login])

  function checkEmail(email) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return ""
    }

    return "Email invalide"
  }

  function handleLogin() {
    if (!checkEmail(email)) {
      onValid(email, password)
        .then(status => {
          if (!status) {
            setMessage("Échec de la connexion")
          }
        })
    }
  }

  return (
    <fieldset>
      <legend>Se connecter</legend>
      <InputField
        label='Email :'
        type='text'
        value={email}
        onChangeFunction={setEmail}
        onError={checkEmail}
      />
      <InputField
        label='Mot de passe :'
        type='password'
        value={password}
        onChangeFunction={setPassword}
        onError={() => ""}
      />
      <div style={{ color: "red" }}>{message}</div>
      <Button clickFonction={handleLogin} title='OK' />
    </fieldset>
  )
}

LoginForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default LoginForm