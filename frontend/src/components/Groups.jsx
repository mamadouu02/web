import { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import ListGroups from '../components/ListGroups'
import Button from '../components/Button'
import InputField from '../components/InputField'

function Groups() {
  const { token, backend } = useContext(AppContext)
  const [groupName, setGroupName] = useState("")
  const [counter, setCounter] = useState(0)
  const [status, setStatus] = useState(true)

  function newGroup() {
    fetch(backend + '/api/mygroups', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({ name: groupName })
    })
      .then(res => res.json())
      .then(json => {
        setStatus(json.status)
        if (json.status) {
          setCounter(counter + 1)
        }
      }
    )

    setGroupName("")
  }

  function onErrorHandler() {
    if (status) {
      return ""
    }

    return "Échec de la création de groupe"
  }

  return (
    <fieldset className='Groups'>
      <legend>Mes groupes</legend>
      <ListGroups member={true} counter={counter} />
      <hr></hr>
      <ListGroups member={false} counter={counter}/>
      <InputField
        type='text'
        value={groupName}
        placeholder='Nom du nouveau groupe'
        onChangeHandler={setGroupName}
        onErrorHandler={onErrorHandler}
      />
      <Button onClickHandler={newGroup} title='Créer' />
    </fieldset>
  )
}

export default Groups