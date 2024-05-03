import { PropTypes } from 'prop-types'

function InputField({ label, type, value, onChangeFunction, onError }) {
  return (
    <div>
      <label>{label} </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
      />
      <span style={{ color: "red" }}> { onError(value)}</span>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFunction: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default InputField