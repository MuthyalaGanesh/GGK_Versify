import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
export const DatePickerField = (props) => (
    <div>
         <DateField {...props.input}  value={props.input.value} dateFormat="MM/DD/YYYY" defaultDate={props.defaultValue?new Date(props.defaultValue):null} />
    </div>
)

export default DatePickerField