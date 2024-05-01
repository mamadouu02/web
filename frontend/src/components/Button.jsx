import { PropTypes } from 'prop-types'

function Button({ clickFonction, title }) {
    return (
        <button onClick={clickFonction}>
            {title}
        </button>
    )
}

Button.propTypes = {
    clickFonction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default Button