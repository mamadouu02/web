import { PropTypes } from 'prop-types'

function Button({ onClickHandler, title }) {
  return (
    <button onClick={onClickHandler}>
      {title}
    </button>
  )
}

Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Button