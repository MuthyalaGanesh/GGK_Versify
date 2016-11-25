import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Typeahead from 'react-bootstrap-typeahead'
import './Typeaheadstyles.scss'
class TypeaheadField extends React.Component  {

	render(){
		return (	
			<Typeahead options={this.props.searchLocationList}
                             minLength = "1"
                             ref='typeahead'
                             placeholder={"Search Location"}
                             labelKey={"name"} 
                             onChange={(e)=>{this.props.leftMenuDropdownClickEvent(e[0].id,e); this.refs.typeahead.getInstance().clear()}}/>
			)
	}

}
export default TypeaheadField