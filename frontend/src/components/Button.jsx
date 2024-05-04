import { PropTypes } from 'prop-types'

function Button({ clickHandler, title }) {
  return (
    <button onClick={clickHandler}>
      {title}
    </button>
  )
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Button