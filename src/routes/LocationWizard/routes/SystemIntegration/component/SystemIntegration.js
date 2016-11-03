import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'

export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.systemIntegrationTypes;
    function showTable() {
        if (props.systemIntegration.selectedSystemIntegrationTypes &&
            props.systemIntegration.selectedSystemIntegrationTypes.length > 0) {
            return "show";
        }
        return "hide";
    }
    function showNoResults() {
        if (props.systemIntegration.selectedSystemIntegrationTypes &&
            props.systemIntegration.selectedSystemIntegrationTypes.length > 0) {
            return "hide";
        }
        return "show";
    }
    return (
        <div>
            <Panel header = {
                <div>
                    <label>System Integration</label>
                    <span className="fa fa-plus-circle fa-2x" onClick={props.SystemIntegrationModal}></span>
                </div>
            }>
                <div className={showTable() }>
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
                                props.systemIntegration.selectedSystemIntegrationTypes.map(ssit =>
                                    <tr>
                                        <td className="align-text-col"><label>{ssit.Name}</label></td>
                                        <td><input type="text" className="form-control"/></td>
                                        <td className="align-text-col">
                                            <i className="fa fa-trash-o fa-2x" onClick={()=> {props.deleteSystemIntegration(ssit.Name)}}></i>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                <div className={showNoResults() }>
                    <h4 className="no-results-alert">You have no System Integration information yet</h4>
                </div>
            </Panel>

            <Modal show={props.systemIntegration.showAddSysIntegrationModal}>
                <form onSubmit={props.AddSystemIntegration}>
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
                                    <Field component="select" name="newSystemIntegration" className="form-control">
                                        <option value="">Select System Integration type </option>

                                        {
                                            systemIntegrationData.map((sid, index) =>
                                                (<option value={sid.Id} key={index}>{sid.DisplayName}</option>))
                                        }
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning" type="button" onClick={props.SystemIntegrationModal}>Close</button>
                        <button className="btn btn-success" type="submit">Add</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default SystemIntegration