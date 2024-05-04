import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'
import Error from './Error'

function LoginForm({ onValid }) {
  const { login, setLogin } = useContext(AppContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

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
            setError({
              status: status,
              message: "Échec de la connexion"
            })
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
      />
      {error ? <Error status={error.status} message={error.message}/> : null}
      <Button onClickHandler={loginHandler} title='OK' />
    </fieldset>
  )
}

LoginForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default LoginForm