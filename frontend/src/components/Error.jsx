import { PropTypes } from 'prop-types'

function Error({ status, message }) {
  return (
    <div className='Error' style={{ color: status ? 'green' : 'red' }}>{message}</div>
  )
}

Error.propTypes = {
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Error