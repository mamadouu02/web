import { useContext } from 'react'
import { AppContext } from '../AppContext'
import LoginForm from '../components/LoginForm'

function LoginView() {
    const { setToken, setName, backend } = useContext(AppContext)

    async function checkLogin(login, password) {
        const res = await
          (await fetch(backend + '/login',
            {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({ email: login, password: password })
            })).json()
        setToken(res.token)
        setName(res.name)
      }

    return (
        <LoginForm onValidInfo={checkLogin} />
    )
}

export default LoginView