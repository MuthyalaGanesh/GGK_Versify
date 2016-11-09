import React from 'react'
import { Field, reduxForm } from 'redux-form'
//helps in populating default values
export const InputField = (props) => {
	let input = props.touched?props.input.value:props.defaultvalue;
	return(
			<div>
        		<input {...props.input} value={input} className={props.className} readOnly={props.readOnly}/>
    		</div>
		)
}
export default InputField