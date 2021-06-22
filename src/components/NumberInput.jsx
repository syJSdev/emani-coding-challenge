import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const NumberInput = ({
  placeholder,
  defaultValue,
  value,
  onChange,
  ...rest
}) => {
  const handleChange = (event) => {
    const number = event?.target?.value || ''
    onChange(number, event)
  }

  const handleKeyDown = (event) => {
    if (!/^[0-9]{1}$/.test(event.key)) event.preventDefault()
  }

  return (
    <Input
      type="text"
      {...rest}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={value}
    />
  )
}

NumberInput.defaultProps = {
  placeholder: 'Enter the numbers'
}

NumberInput.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default NumberInput
