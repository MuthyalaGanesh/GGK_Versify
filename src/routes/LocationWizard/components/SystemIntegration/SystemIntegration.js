import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'
import TypeaheadField from 'components/Typeahead/TypeaheadField'
import InputField from 'components/InputField/InputField'

export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.unSelectedSystemIntegrationTypes;
    const touched = props.formdata
    return (
        <div className="row tab-pane fade in active" id="systemintegration">
            <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">System Integration</h3>
                        <div className="box-tools pull-right">
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 form-group">
                                <div className="col-sm-3 col-md-3">
                                    <label className="control-label"> External System Name </label>
                                </div>

                                { !props.systemIntegration.typeaheadShow ? <div className="col-sm-7 col-md-7">
                                    <Field component={InputField} name="newSystemIntegration"
                                        touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                            touched.SystemIntegrationForm.hasOwnProperty('fields') ? touched.SystemIntegrationForm.fields.hasOwnProperty('newSystemIntegration') : false : false }
                                        className="form-control"/>
                                </div> :
                                    <Field component="select" name="newSystemIntegration" className="form-control">
                                        <option value="">Select SystemIntegration</option>

                                        {
                                            systemIntegrationData.map((uc) => (
                                                (uc.LocationMappingId < 0) ? <option value={uc.ExternalSystemName} key={uc.ExternalSystemName}>{uc.ExternalSystemName}</option> : null
                                            ))
                                        }
                                    </Field>
                                }
                                <span className={props.systemIntegration.typeaheadShow ? "fa fa-plus-circle" : "fa fa-times-circle"} onClick={props.toggleTypeahead}>
                                </span>
                                <div className="col-sm-2 col-md-2">
                                    <button className="btn btn-success" type="button" onClick={props.AddSystemIntegration}>Add</button>
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
                                                        <td><Field component={InputField} name="AliasName"
                                                            touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                                                touched.SystemIntegrationForm.hasOwnProperty('fields') ? touched.SystemIntegrationForm.fields.hasOwnProperty('AliasName') : false : false }
                                                            className="form-control" /></td>
                                                        <td className="align-text-col">
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
