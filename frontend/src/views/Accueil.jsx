import { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Button from '../components/Button'
import Groups from '../components/Groups'
import GroupManager from '../components/GroupManager'
import GroupMessages from '../components/GroupMessages'

function Accueil() {
  const { setToken, login, setLogin } = useContext(AppContext)
  const [group, setGroup] = useState(null)
  const [groupMember, setGroupMember] = useState(null)

  function logout() {
    setToken(null)
    setLogin(null)
  }

  return (
    <div className='Home'>
      <header>
        {login} | <Button onClickHandler={logout} title={'Se déconnecter'} />
      </header>
      <Groups onClickHandler={{ setGroup, setGroupMember }} />
      {group ? <GroupManager group={group} /> : null}
      {groupMember ? <GroupMessages group={groupMember}/> : null}
    </div>
  )
}

export default Accueil