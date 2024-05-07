import { PropTypes } from 'prop-types'

function ErrorMessage({ status, message }) {
  return (
    <div className='Error' style={{ color: status ? 'green' : 'red' }}>{message}</div>
  )
}

ErrorMessage.propTypes = {
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default ErrorMessage