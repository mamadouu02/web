import { useContext } from 'react'
import { AppContext } from '../AppContext'
import ListGroups from '../components/ListGroups'
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
        {login} | <Button clickHandler={logout} title={'Se déconnecter'} />
      </header>
      <fieldset className='Groups'>
        <legend>Mes groupes</legend>
        <ListGroups member={true} />
        <hr></hr>
        <ListGroups member={false} />
      </fieldset>
    </div>
  )
}

export default Accueil