import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'

function ListGroups({ member, counter }) {
  const { token, backend } = useContext(AppContext)
  const [groups, setGroups] = useState([])
  const endpoint = member ? '/api/groupsmember' : '/api/mygroups'

  useEffect(() => {
    fetch(backend + endpoint, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(json => setGroups(json.data))
  }, [counter])

  return (
    <div className={member ? 'ListGroupsMember' : 'ListMyGroups'}>
      <h4>{member ? "Groupes dont je suis membre" : "Groupes que j'administre"}</h4>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>{group.name}</li>
        ))}
      </ul>
    </div>
  )
}

ListGroups.propTypes = {
  member: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired
}

export default ListGroups