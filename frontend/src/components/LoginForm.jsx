import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'

function LoginForm({ onValid }) {
  const { login } = useContext(AppContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setEmail(login ? login : "")
  }, [login])

  function errorMessage() {
    let err = ""

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      err += "Email invalide."
    }

    return err
  }

  function handleLogin() {
    if (errorMessage().length === 0) {
      onValid(email, password)
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
      />
      <InputField
        label='Mot de passe :'
        type='password'
        value={password}
        onChangeFunction={setPassword}
      />
      <Button clickFonction={handleLogin} title='OK' />
      <div style={{ color: "red" }}> {errorMessage()}</div>
    </fieldset>
  )
}

LoginForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default LoginForm