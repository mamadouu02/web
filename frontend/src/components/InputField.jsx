import { PropTypes } from 'prop-types'

function InputField({ label, type, value, onChangeHandler, onErrorHandler }) {
  return (
    <div className='InputField'>
      <label>{label} </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <span style={{ color: "red" }}> { onErrorHandler(value)}</span>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onErrorHandler: PropTypes.func.isRequired
}

export default InputField