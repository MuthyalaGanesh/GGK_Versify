import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../validations/basicInfoValidation'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import 'styles/basicInfoStyles.scss'
import { Checkbox, RadioButtonGroup, SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';



export const BasicInfo = (props) => {
    const {locationTypes} = props
return (
            <div>
                <Panel header={<ControlLabel>Basic Information</ControlLabel>}>
                        <form onSubmit={props.basicInfoSubmit} onChange={props.onchange} >
                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                    <div className="col-sm-6 ">
                                         <div className="col-sm-4 basic-form-input">
                                                <label htmlFor="locationNamelocationName">locationName</label>
                                             <Field name="locationName" component="input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        
                                        <Field name="allowOutages" id="allowOutages" component="input" type="checkbox" label="AllowOutages"/>
                                    </div>
                            </div>
                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                            <label htmlFor="parentLocation">parentLocation </label>
                                             <Field name="parentLocation" component="input" type="text"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="type" component="select">
                                            <option></option>
                                            <option value="ff0000">Red</option>
                                            <option value="00ff00">Green</option>
                                            <option value="0000ff">Blue</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                  
                </Panel>
            </div>

        )
    
}

export default BasicInfo



