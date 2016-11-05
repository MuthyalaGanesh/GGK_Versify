import React from 'react'
import { Field, reduxForm } from 'redux-form'
//helps in populating default values
export const InputField = (props) => (
    <div>
        <input {...props.input} value={props.defaultValue} className={props.className} readOnly={props.readOnly}/>
    </div>
)

export default InputField