import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'
import InputField from 'components/InputField/InputField'

export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.unSelectedSystemIntegrationTypes;
    const touched = props.formdata
    return (
        <div className="row tab-pane fade in active" id="systemintegration">
            <div className="col-sm-12">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">System Integration</h3>
                        <div className="box-tools pull-right">
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <div className="col-sm-5 col-md-3 col-lg-3">
                                        <label className="control-label"> External System Name </label>
                                    </div>
                                    <div className="col-sm-5 col-md-7 col-lg-7">
                                        <div>
                                            { !props.systemIntegration.dropDownShow ? <Field component={InputField} name="newSystemIntegration"
                                                touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                                    touched.SystemIntegrationForm.hasOwnProperty('fields') ? touched.SystemIntegrationForm.fields.hasOwnProperty('newSystemIntegration') : false : false }
                                                className="form-control"/> :
                                                <Field component="select" name="newSystemIntegration" className="form-control">
                                                    <option value="">Select SystemIntegration</option>

                                                    {
                                                        systemIntegrationData.map((uc) => (
                                                            (uc.LocationMappingId < 0) ? <option value={uc.ExternalSystemName} key={uc.ExternalSystemName}>{uc.ExternalSystemName}</option> : null
                                                        ))
                                                    }
                                                </Field>
                                            }
                                        </div>

                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-1 col-lg-1"> <label className="control-label">
                                        {props.systemIntegration.dropDownShow
                                            ?
                                            <a onClick={props.toggleTypeahead} className="toggle-link"> Add Custom</a>
                                            : <a onClick={props.toggleTypeahead}  className="toggle-link">Add Predefined</a>}
                                    </label></div>
                                    <div className="col-xs-6 col-sm-6 col-md-1 col-lg-1 btn-top">
                                        <button className="btn btn-success" type="button" onClick={props.AddSystemIntegration}
                                            disabled={touched.hasOwnProperty('SystemIntegrationForm') && touched.SystemIntegrationForm.hasOwnProperty('values')
                                                && touched.SystemIntegrationForm.values.hasOwnProperty('newSystemIntegration')
                                                ? false : true}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin-bottom-sm padding-top">
                            {props.systemIntegration.selectedSystemIntegrationTypes &&
                                props.systemIntegration.selectedSystemIntegrationTypes.length >
                                0 ?
                                <div id="resultsDiv">
                                    <Table striped bordered condensed hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.systemIntegration.selectedSystemIntegrationTypes.map((ssit, i) =>
                                                    <tr key={i}>
                                                        <td className="align-text-col"><label>{ssit.ExternalSystemName}</label></td>
                                                        <td><Field component={InputField} name={`AliasName[${i}]`} onblur={()=>props.AliasGiven()}
                                                            touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                                                touched.SystemIntegrationForm.hasOwnProperty('values') ? touched.SystemIntegrationForm.values.hasOwnProperty("AliasName") : false : false }

                                                            className="form-control" defaultvalue={ssit.AliasName}/></td>
                                                        <td className="text-align-col text-center">
                                                            <i className="fa fa-trash-o fa-2x" onClick={() => props.deleteSystemIntegration(i) }></i>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div> : null}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SystemIntegration
