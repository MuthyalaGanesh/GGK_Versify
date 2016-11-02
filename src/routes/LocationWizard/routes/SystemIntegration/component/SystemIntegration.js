import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import 'styles/systemIntegrationStyles.scss'

export const SystemIntegration = (props) => {
    const systemIntegrationData = props.systemIntegration.systemIntegrationTypes;
const selectedData=props.systemIntegration.selectedSystemIntegrationTypes;
    return (
        <div>
            <Panel header = {
                <div>
                    <label>System Integration</label>
                    <span className="fa fa-plus-circle fa-2x" onClick={props.SystemIntegrationModal}></span>
                </div>
            }>
                    {selectedData}
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
                                                    <option value="">Select System Integration type</option>
                                                    
                                                    {
                                                        systemIntegrationData.map((sid,index)=>
                                                                        (<option value={sid.Id} key={index}>{sid.DisplayName}</option>))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-warning" onClick={props.SystemIntegrationModal}>Close</button>
                                <button className="btn btn-success" type="submit">Add</button>
                            </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}       

export default SystemIntegration