import { useContext, useState } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'
import Error from './Error'

function RegisterForm({ onValid }) {
  const { setLogin } = useContext(AppContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)

  function checkEmail(email) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return ""
    }

    return "Email invalide"
  }

  function checkPassword(password) {
    if (password.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)) {
      return ""
    }

    return "Mot de passe faible"
  }

  function checkConfirmPassword(confirmPassword) {
    if (confirmPassword === password) {
      return ""
    }

    return "Les mots de passe ne correspondent pas"
  }

  function registerHandler() {
    if (!checkEmail(email) && !checkPassword(password) && !checkConfirmPassword(confirmPassword)) {
      onValid(name, email, password)
        .then(status => {
          if (status) {
            setLogin(email)
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setError({
              status: status,
              message: "Enregistrement réussi"
            })
          } else {
            setError({
              status: status,
              message: "Échec de l'enregistrement"
            })
          }
        })
    }
  }

  return (
    <fieldset className='RegisterForm'>
      <legend>S&apos;enregistrer</legend>
      <InputField
        label='Nom :'
        type='text'
        value={name}
        onChangeHandler={setName}
      />
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
        onErrorHandler={checkPassword}
      />
      <InputField
        label='Confirmez votre mot de passe :'
        type='password'
        value={confirmPassword}
        onChangeHandler={setConfirmPassword}
        onErrorHandler={checkConfirmPassword}
      />
      {error ? <Error status={error.status} message={error.message} /> : null}
      <Button onClickHandler={registerHandler} title='OK' />
    </fieldset>
  )
}

RegisterForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default RegisterForm