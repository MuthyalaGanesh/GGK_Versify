import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
export const DatePickerField = (props) =>{
console.log(props.defaultValue)
 return(
    <div>
    <DateField onChange={props.input.onChange}
    			value ={props.input.value || props.defaultValue }
         	
        	dateFormat="MM/DD/YYYY"           
        	footer={false}          
        	updateOnDateClick={true}          
        	collapseOnDateClick={true}          
        	 />
 </div>        
)
}
export default DatePickerField