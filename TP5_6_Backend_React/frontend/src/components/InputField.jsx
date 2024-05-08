import { PropTypes } from 'prop-types'

function InputField({ label = '', type, value, placeholder = '', onChangeHandler = () => { }, onErrorHandler = () => { } }) {
  return (
    <div className='InputField'>
      <label>{label} </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <span style={{ color: "red" }}> {onErrorHandler(value)}</span>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onErrorHandler: PropTypes.func
}

export default InputField