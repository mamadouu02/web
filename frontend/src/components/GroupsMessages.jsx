import { PropTypes } from 'prop-types'
import ListMessages from './ListMessages'

function GroupMessages({ group }) {

  return (
    <fieldset className='GroupMessages'>
      <legend>Discussion sur le groupe &quot;{group.name}&quot;</legend>
      <ListMessages gid={group.id} />
    </fieldset>
  )
}

GroupMessages.propTypes = {
  group: PropTypes.object.isRequired
}

export default GroupMessages