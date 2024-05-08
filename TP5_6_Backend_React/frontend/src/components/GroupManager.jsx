import { PropTypes } from 'prop-types'
import MemberManager from './MemberManager'
import ListMembers from './ListMembers'

function GroupManager({ group }) {

  return (
    <fieldset className='GroupManager'>
      <legend>Administration &quot;{group.name}&quot;</legend>
      <MemberManager gid={group.id} />
      <hr></hr>
      <ListMembers gid={group.id} />
    </fieldset>
  )
}

GroupManager.propTypes = {
  group: PropTypes.object.isRequired
}

export default GroupManager