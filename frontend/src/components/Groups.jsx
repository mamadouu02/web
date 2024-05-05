import { useContext, useState } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import ListGroups from '../components/ListGroups'
import Button from '../components/Button'
import InputField from '../components/InputField'
import Error from './Error'

function Groups({ onClickHandler }) {
  const { token, count, setCount, backend } = useContext(AppContext)
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState(null)

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
        if (json.status) {
          setCount(count + 1)
          setError({
            status: json.status,
            message: "Groupe créé"
          })
        } else {
          setError({
            status: json.status,
            message: "Échec de la création de groupe"
          })
        }
      })

    setGroupName("")
  }

  return (
    <fieldset className='Groups'>
      <legend>Mes groupes</legend>
      <ListGroups member={true} />
      <hr></hr>
      <ListGroups member={false} onClickHandler={onClickHandler} />
      <InputField
        type='text'
        value={groupName}
        placeholder='Nom du nouveau groupe'
        onChangeHandler={setGroupName}
      />
      {error ? <Error status={error.status} message={error.message} /> : null}
      <Button onClickHandler={newGroup} title='Créer' />
    </fieldset>
  )
}

Groups.propTypes = {
  onClickHandler: PropTypes.func
}

export default Groups