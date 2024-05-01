import { useState } from 'react'
import Button from './Button'
import InputField from './InputField'
import { PropTypes } from 'prop-types'

function LoginForm({ onValidInfo }) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    function errorMessage() {
        let err = ""

        if (!login.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            err += "Email invalide."
        }

        return err
    }

    function connect() {
        if (errorMessage().length === 0) {
            onValidInfo(login, password)
        }
    }

    return (
        <fieldset>
            <legend>Se connecter</legend>
            <InputField label='Email :' type='text' value={login} onChangeFunction={setLogin} />
            <InputField label='Password :' type='password' value={password} onChangeFunction={setPassword} />
            <Button clickFonction={connect} title='OK' />
            <div style={{ color: "red" }}> {errorMessage()}</div>
        </fieldset>
    )
}

LoginForm.propTypes = {
    onValidInfo: PropTypes.func.isRequired
}

export default LoginForm