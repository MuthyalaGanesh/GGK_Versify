import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const TextAreaField = (props) => (
    <div>
        <textarea {...props.input} rows={props.rows} value={props.input.value} className={props.className} readOnly={props.readOnly}/>
    </div>
)

export default TextAreaField