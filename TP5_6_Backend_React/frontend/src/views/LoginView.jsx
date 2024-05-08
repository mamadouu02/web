import { useContext } from 'react'
import { AppContext } from '../AppContext'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function LoginView() {
  const { setToken, backend } = useContext(AppContext)

  async function login(email, password) {
    const res = await fetch(backend + '/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await res.json()

    if (json.status) {
      setToken(json.token)
    }

    return json.status
  }

  async function register(name, email, password) {
    const res = await fetch(backend + '/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const json = await res.json()
    return json.status
  }

  return (
    <div>
      <LoginForm onValid={login} />
      <RegisterForm onValid={register} />
    </div>
  )
}

export default LoginView