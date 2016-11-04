import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const InputField = (props) => (
    <div>
        <input {...props.input} value={props.defaultValue} className={props.className} readOnly={props.readOnly}/>
    </div>
)

export default InputField