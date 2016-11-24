import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

export const DatePickerField = (props) => (
    <div>
        <DateTimePicker {...props.input} value={props.value} defaultValue={props.defaultValue?new Date(props.defaultValue):null} time={false}/>
    </div>
)

export default DatePickerField