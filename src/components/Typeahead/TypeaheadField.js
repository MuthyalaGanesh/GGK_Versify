import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Typeahead from 'react-bootstrap-typeahead'

export const TypeaheadField = (props) => (
    <div>
        <Typeahead {...props.input} options={props.fieldOptions} value={props.input.value} labelKey={props.labelKey}/>
    </div>
)

export default TypeaheadField