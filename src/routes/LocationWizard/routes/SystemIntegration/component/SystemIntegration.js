import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'
import Typeahead from 'react-bootstrap-typeahead'
import systemIntegrationValidation from '../validation/systemIntegrationValidation'
import TypeaheadField from '../../../../../components/Typeahead/TypeaheadField'
export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.systemIntegrationTypes;

    return (
        <div>
            <Panel header = {
                <div>
                    <label>System Integration</label>
                </div>
            }>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="col-xs-4">
                            <label>External System Name</label>
                        </div>
                        <div className="col-xs-4">
                            <Field component={TypeaheadField} fieldOptions={systemIntegrationData}  name="newSystemIntegration" labelKey="Name"/>
                        </div>
                        <div className="col-xs-4">
                            <button className="btn btn-success" type="button" onClick={props.AddSystemIntegration}>Add</button>
                        </div>
                    </div>
                </div>

                <div className={props.systemIntegration.selectedSystemIntegrationTypes &&
                    props.systemIntegration.selectedSystemIntegrationTypes.length > 0 ? "show" : "hide" } id="resultsDiv">
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
                                        <td className="align-text-col" ><label>{ssit.Name}</label></td>
                                        <td><input type="text" className="form-control"/></td>
                                        <td className="align-text-col">
                                            <i className="fa fa-trash-o fa-2x" onClick={() => { props.deleteSystemIntegration(ssit.Name) } }></i>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Panel>
        </div>
    )
}

export default SystemIntegration