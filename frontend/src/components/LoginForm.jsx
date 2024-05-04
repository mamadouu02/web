import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'

function LoginForm({ onValid }) {
  const { login, setLogin } = useContext(AppContext)
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

  function loginHandler() {
    if (!checkEmail(email)) {
      onValid(email, password)
        .then(status => {
          if (status) {
            setLogin(email)
          } else {
            setMessage("Échec de la connexion")
          }
        })
    }
  }

  return (
    <fieldset className='LoginForm'>
      <legend>Se connecter</legend>
      <InputField
        label='Email :'
        type='text'
        value={email}
        onChangeHandler={setEmail}
        onErrorHandler={checkEmail}
      />
      <InputField
        label='Mot de passe :'
        type='password'
        value={password}
        onChangeHandler={setPassword}
        onErrorHandler={() => ""}
      />
      <div style={{ color: "red" }}>{message}</div>
      <Button clickHandler={loginHandler} title='OK' />
    </fieldset>
  )
}

LoginForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default LoginForm