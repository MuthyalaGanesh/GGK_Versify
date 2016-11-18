import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'
import InputField from 'components/InputField/InputField'
import CreatableDropdownListField from 'components/DropdownList/CreatableDropdownListField'

export const SystemIntegration = (props) => {
    const systemIntegrationData = [];
    props.systemIntegration.unSelectedSystemIntegrationTypes.map((ssit) => {
        var valuePresence = 1;
        props.systemIntegration.selectedSystemIntegrationTypes.map((sel) => {
            if (ssit.ExternalSystemName == sel.ExternalSystemName) {
                valuePresence++
            }
        })
        if (valuePresence == 1 && ssit.LocationMappingId < 0) {
            systemIntegrationData.push(ssit)
        }
    })

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
                                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 form-group">
                                        <label className="control-label"> External System Name </label>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-group">

                                        <Field component={CreatableDropdownListField}
                                            name="newSystemIntegration"
                                            data={systemIntegrationData}
                                            valueKey='ExternalSystemName'
                                            labelKey='ExternalSystemName'
                                            placeholder="Select System Integration"
                                            touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                                touched.SystemIntegrationForm.hasOwnProperty('fields') ? touched.SystemIntegrationForm.fields.hasOwnProperty('newSystemIntegration') : false : false }>
                                        </Field>

                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 form-group btn-top">
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
                                                <th className="align-text-col">Name</th>
                                                <th className="align-text-col">Description</th>
                                                <th className="align-text-col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.systemIntegration.selectedSystemIntegrationTypes.map((ssit, i) =>
                                                    <tr key={i}>
                                                        <td className="align-text-col"><label>{ssit.ExternalSystemName}</label></td>
                                                        <td><Field component={InputField} name={`AliasName[${i}]`} onblur={() => props.AliasGiven() }
                                                            touched = {touched.hasOwnProperty('SystemIntegrationForm') ?
                                                                touched.SystemIntegrationForm.hasOwnProperty('values') ? touched.SystemIntegrationForm.values.hasOwnProperty("AliasName") ? touched.SystemIntegrationForm.values.AliasName[i] : false : false : false }

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
