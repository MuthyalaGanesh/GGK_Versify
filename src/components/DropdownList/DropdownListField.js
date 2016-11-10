import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'

const DropdownListField = ({ input, ...rest }) =>
  <DropdownList {...input}
    onBlur={() => input.onBlur()}
    value={input.value}
    onChange={(e)=>{
        
        input.onChange(e);
        rest.primaryMarketChangeEvent(e);
     }}
    {...rest}/>

export default DropdownListField;