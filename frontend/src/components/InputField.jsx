import { PropTypes } from 'prop-types'

function InputField({ label, type, value, onChangeFunction }) {
  return (
    <div>
      <label>{label} </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)} />
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFunction: PropTypes.func.isRequired,
}

export default InputField