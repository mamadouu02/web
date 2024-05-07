import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import Button from './Button'
import ErrorMessage from './ErrorMessage'

function ListMembers({ gid }) {
  const { token, count, setCount, backend } = useContext(AppContext)
  const [members, setMembers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(backend + '/api/mygroups/' + gid, {
      method: 'GET',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => setMembers(json.data))
  }, [gid, count])

  function deleteMember(uid) {
    fetch(backend + '/api/mygroups/' + gid + '/' + uid, {
      method: 'DELETE',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          setCount(count + 1)
          setError({
            status: json.status,
            message: "Membre supprimé"
          })
        }
      })
  }

  return (
    <div className='ListMembers'>
      <h4>Liste des membres</h4>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member.email} <Button onClickHandler={() => deleteMember(member.id)} title='Supprimer' />
          </li>
        ))}
      </ul>
      {error ? <ErrorMessage status={error.status} message={error.message} /> : null}
    </div>
  )
}

ListMembers.propTypes = {
  gid: PropTypes.number.isRequired
}

export default ListMembers