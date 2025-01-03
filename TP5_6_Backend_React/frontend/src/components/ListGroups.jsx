import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'

function ListGroups({ member, onClickHandler }) {
  const { token, count, backend } = useContext(AppContext)
  const [groups, setGroups] = useState([])
  const endpoint = member ? '/api/groupsmember' : '/api/mygroups'

  useEffect(() => {
    fetch(backend + endpoint, {
      method: 'GET',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => setGroups(json.data))
  }, [count])

  return (
    <div className={member ? 'ListGroupsMember' : 'ListMyGroups'}>
      <h4>{member ? "Groupes dont je suis membre" : "Groupes que j'administre"}</h4>
      <ul>
        {groups.map((group, index) => (
          <li key={index} onClick={() => {
            if (member) {
              onClickHandler.setGroupMember(group)
              onClickHandler.setGroup(null)
            } else {
              onClickHandler.setGroup(group)
              onClickHandler.setGroupMember(null)
            }
          }}>{group.name}</li>
        ))}
      </ul>
    </div>
  )
}

ListGroups.propTypes = {
  member: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.object.isRequired
}

export default ListGroups