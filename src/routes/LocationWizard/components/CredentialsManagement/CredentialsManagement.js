import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'

export const CredentialsManagement = (props) => {
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
                 
                  { !!props.marketDrivenMappings && props.marketDrivenMappings.length >0
                      ?  <div className="row">
                      {props.marketDrivenMappings.map(fieldElement =>
                            <div className="col-sm-12 col-md-6 form-group">                                
                                <label className="control-label" id={fieldElement.DisplayName}> {fieldElement.DisplayName} </label>
                                <Field name={fieldElement.DisplayName}
                                    component="input"
                                    className="form-control"
                                    type="text"
                                    placeholder={fieldElement.DisplayName}>
                                </Field>
                            </div>                        )}
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