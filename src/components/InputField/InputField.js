import React from 'react'
import { Field, reduxForm } from 'redux-form'
//helps in populating default values
export const InputField = (props) => {
	let input = props.touched ? props.input.value : props.defaultvalue;
	return (
		<div>

			<input {...props.input} placeholder={props.placeholder} type={props.type} value={input} className={props.className} readOnly={props.readOnly} onBlur={(e) => { props.input.onBlur(e); if (props.hasOwnProperty('onblur')) { props.onblur() } } }/>
			{props.meta.touched && props.meta.error && <span className="errorMessage">{props.meta.error}</span>}
		</div>

	)
}
export default InputField