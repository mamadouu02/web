import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import Error from './Error'

function MemberManager({ gid }) {
  const { token, count, setCount, backend } = useContext(AppContext)
  const [uid, setUid] = useState(1)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(backend + '/api/users/', {
      method: 'GET',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => setUsers(json.data))
  }, [])

  function addMember() {
    fetch(backend + '/api/mygroups/' + gid + '/' + uid, {
      method: 'PUT',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          setCount(count + 1)
          setError({
            status: json.status,
            message: "Membre ajouté"
          })
        } else {
          setError({
            status: json.status,
            message: "Échec de l'ajout"
          })
        }
      })
  }

  return (
    <div className='MemberManager'>
      <label>Ajouter un membre : </label>
      <select onChange={(e) => setUid(e.target.value)}>
        {users.map((user, index) => (
          <option key={index} value={user.id}>{user.email}</option>
        ))}
      </select>
      <Button onClickHandler={addMember} title='Ajouter' />
      {error ? <Error status={error.status} message={error.message}/> : null}
    </div>
  )
}

MemberManager.propTypes = {
  gid: PropTypes.number.isRequired
}

export default MemberManager