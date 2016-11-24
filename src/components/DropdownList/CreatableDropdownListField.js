import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import Select from 'react-select/lib/Select';

const CreatableDropdownListField = ({ input, ...rest }) =>
<Select.Creatable 
        searchable={true} 
				options={rest.data} 
				clearable={true} 
				name={rest.name}
        disabled={rest.disabled || false} 
				value={input.value || rest.defaultValue} 
				onChange={(e)=>{  
             input.onChange(e);
            !!rest.onChangeEvent && rest.onChangeEvent(e);
         }}
         {...rest}
				/>

export default CreatableDropdownListField;