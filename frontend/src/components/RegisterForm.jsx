import { useContext, useState } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import InputField from './InputField'

function RegisterForm({ onValid }) {
  const { setLogin } = useContext(AppContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function errorMessage() {
    let err = ""

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      err += "Email invalide. "
    }

    if (!password.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)) {
      err += "Mot de passe faible. "
    }

    if (confirmPassword != password) {
      err += "Les mots de passe ne correspondent pas."
    }

    return err
  }

  function handleRegister() {
    if (errorMessage().length === 0) {
      onValid(name, email, password)
        .then(status => {
          if (status) {
            setLogin(email)
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
          }
        })
    }
  }

  return (
    <fieldset>
      <legend>S&apos;enregistrer</legend>
      <InputField
        label='Nom :'
        type='text'
        value={name}
        onChangeFunction={setName}
      />
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
      <InputField
        label='Confirmez votre mot de passe :'
        type='password'
        value={confirmPassword}
        onChangeFunction={setConfirmPassword}
      />
      <Button clickFonction={handleRegister} title='OK' />
      <div style={{ color: "red" }}> {errorMessage()}</div>
    </fieldset>
  )
}

RegisterForm.propTypes = {
  onValid: PropTypes.func.isRequired
}

export default RegisterForm