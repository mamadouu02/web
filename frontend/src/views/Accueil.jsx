import { useContext } from 'react'
import { AppContext } from '../AppContext'
import Groups from '../components/Groups'
import Button from '../components/Button'

function Accueil() {
  const { setToken, login, setLogin } = useContext(AppContext)

  function logout() {
    setToken(null)
    setLogin(null)
  }

  return (
    <div className='Home'>
      <header>
        {login} | <Button onClickHandler={logout} title={'Se déconnecter'} />
      </header>
      <Groups />
    </div>
  )
}

export default Accueil