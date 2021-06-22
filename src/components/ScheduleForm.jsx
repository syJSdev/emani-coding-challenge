import React, { useState } from 'react'
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Button,
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'

import CountrySelect from 'components/CountrySelect'
import NumberInput from 'components/NumberInput'
import { api } from 'utils'
import { useNotifications } from 'modules'

const ScheduleForm = () => {
  const [country, setCountry] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { showError, showSuccess } = useNotifications()

  const handleSelect = (value, item) => {
    setCountry({ value, item })
  }

  const handleChange = (value) => {
    setPhoneNumber(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const countryDialCode = (country?.item?.dial_code || '').replace(
      /[^0-9+]/,
      ''
    )
    if (!countryDialCode) {
      setErrorMsg('Country code is required.')
      return
    }
    if (!phoneNumber) {
      setErrorMsg('Phone number is required.')
      return
    }

    setErrorMsg('')

    api('/mit/public/send/number', {
      method: 'POST',
      payload: {
        phone_number: countryDialCode + phoneNumber
      }
    })
      .then(() => {
        showSuccess('Your request is submitted')
        return true
      })
      .catch((error) => {
        showError(error.message)
        return false
      })
  }

  return (
    <Card className="py-5 border-0 rounded-3">
      <CardBody className="py-5 m-auto">
        <Form className="p-5" onSubmit={handleSubmit}>
          <FormGroup>
            <Label
              for="schedule-form-phone-number-input"
              className="text-muted">
              Enter your phone number
            </Label>
            <Row form>
              <Col xs={12} md={3}>
                <CountrySelect
                  className="d-block w-100 h-64"
                  value={country?.value || ''}
                  onSelect={handleSelect}
                />
              </Col>
              <Col xs={12} md={9}>
                <NumberInput
                  type="text"
                  id="schedule-form-phone-number-input"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="h-64"
                  onChange={handleChange}
                  value={phoneNumber}
                />
              </Col>
            </Row>
            {errorMsg && <FormText color="danger">{errorMsg}</FormText>}
          </FormGroup>
          <div className="mt-5">
            <Button
              color="primary"
              type="submit"
              className="rounded-ellipse py-3 px-6 border-0 d-block m-auto">
              Schedule call back
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default ScheduleForm
