import { useContext } from 'react'
import { AppContext } from '../AppContext'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function LoginView() {
  const { setToken, setName } = useContext(AppContext)
  const backend = 'https://web-application.osc-fr1.scalingo.io'

  async function login(email, password) {
    const res = await fetch(backend + '/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()

    if (data.status) {
      setToken(data.token)
      setName(data.name)
    }

    return data.status
  }

  async function register(name, email, password) {
    const res = await fetch(backend + '/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    return data.status
  }

  return (
    <div>
      <LoginForm onValid={login} />
      <RegisterForm onValid={register} />
    </div>
  )
}

export default LoginView