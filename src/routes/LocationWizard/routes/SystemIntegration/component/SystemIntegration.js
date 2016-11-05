import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'
import Typeahead from 'react-bootstrap-typeahead'

// import TypeaheadField from '../../../src/components/TypeaheadField'

const TypeaheadField = (props) => (
    <div>
        <Typeahead {...props.input} options={props.fieldOptions} value={props.input.value} labelKey={props.labelKey}/>
    </div>
)
export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.systemIntegrationTypes;

    return (
        <div>
            <Panel header = {
                <div>
                    <label>System Integration</label>
                    <span className="fa fa-plus-circle fa-2x" onClick={props.SystemIntegrationModal}></span>
                </div>
            }>
                <div className={props.systemIntegration.selectedSystemIntegrationTypes &&
                                props.systemIntegration.selectedSystemIntegrationTypes.length > 0?"show":"hide" }>
                    <Table striped bordered condensed hover>
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
                <div className={props.systemIntegration.selectedSystemIntegrationTypes &&
                                    props.systemIntegration.selectedSystemIntegrationTypes.length > 0?"hide":"show" }>
                    <h4 className="no-results-alert">You have no System Integration information yet</h4>
                </div>
            </Panel>

            <Modal show={props.systemIntegration.showAddSysIntegrationModal}>
                <Modal.Header>
                    <Modal.Title>New System Integration Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="col-xs-6">
                                <label>External System Name</label>
                            </div>
                            <div className="col-xs-6">
                                <Field component={TypeaheadField} fieldOptions={systemIntegrationData}  name="newSystemIntegration" labelKey="Name"/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning" type="button" onClick={props.SystemIntegrationModal}>Close</button>
                    <button className="btn btn-success" type="button" onClick={props.AddSystemIntegration}>Add</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SystemIntegration