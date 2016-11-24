import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import Select from 'react-select/lib/Select';

const DropdownListField = ({ input, ...rest }) =>
  // <DropdownList {...input}
  //     treeLine allowClear
  //   onBlur={() => input.onBlur()}
  //   value={input.value}
  //   onChange={(e)=>{  
  //       input.onChange(e);
  //       !!rest.onChangeEvent && rest.onChangeEvent(e);
  //    }}
  //   {...rest}/>
<Select 
        searchable={true} 
				options={rest.data} 
				clearable={true} 
				name={rest.name}
        disabled={rest.disabled || false} 
				value={input.value || rest.defaultvalue} 
				onChange={(e)=>{  
             input.onChange(e);
            !!rest.onChangeEvent && rest.onChangeEvent(e);
         }}
         {...rest}
				/>

export default DropdownListField;