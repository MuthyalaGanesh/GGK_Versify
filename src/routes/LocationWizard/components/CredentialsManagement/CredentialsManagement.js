import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import CreatableDropdownListField from 'components/DropdownList/CreatableDropdownListField'
export const CredentialsManagement = (props) => {
    const {formdata} = props
return (
<div className="row tab-pane fade in active" id="credentialsmanagement">
    <div className="col-xs-12">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">Credentials Management</h3>
                <div className="box-tools pull-right">
                </div>
            </div>
            <div className="box-body">
                <div className="margin-bottom-sm padding-top">
                    
                    { !!props.basic.CredentialBasicData && props.basic.CredentialBasicData.length >0
                    ?  <div className="row">
                        {props.basic.CredentialBasicData.map((fieldElement, i) =>
                        <div className="col-sm-12 col-md-6 form-group">
                            <label className="control-label" id={fieldElement.DisplayName}> {fieldElement.DisplayName} * </label>
                            {!fieldElement.IsDropDown
                            ?
                            <Field name={fieldElement.DisplayName}
                            component="input"
                            className={props.basic.error && (formdata.CredentialsManagementForm.hasOwnProperty('values') ? !formdata.CredentialsManagementForm.values.hasOwnProperty(`${fieldElement.DisplayName}`)  : true)
                            ? "form-control error"
                            :"form-control control-border"}
                            
                            type="text"
                            placeholder={fieldElement.DisplayName}>
                            </Field>
                            : <Field name={fieldElement.DisplayName}
                            component={CreatableDropdownListField}                                                                          
                             className={props.basic.error && (formdata.CredentialsManagementForm.hasOwnProperty('values') ? formdata.CredentialsManagementForm.values.hasOwnProperty(`${fieldElement.DisplayName}`)?  (formdata.CredentialsManagementForm.values[`${fieldElement.DisplayName}`] == null ): true : true)
                            ? "error"
                            :"control-border"}
                             onChangeEvent={(e)=>props.onCredentialDropdownChangeEvent(e)}   
                            data={fieldElement.Field == "AliasName"
                            ?fieldElement.aliasNameDropDownItems
                            :fieldElement.externalSystemLoginDropDownItems
                            }
                            valueKey='key'
                            labelKey='value'
                            placeholder={fieldElement.DisplayName}>
                            </Field>
                            }
                         {i%2 == 0? <div className='clear'></div>:null}                            
                        </div> 
                                   )}
                    </div>
                    : <div className="row">
                        <h6 style={{'textAlign':'center'}}>
                        This section will be loaded based on selection of Primary Market type
                        </h6>
                    </div>
                    
                    }
                    
                    
                    
                </div>
            </div>
        </div>
    </div>
</div>
)
}
export default CredentialsManagement