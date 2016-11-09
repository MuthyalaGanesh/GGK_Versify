import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Table, Popover, Button, Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import InputField from 'components/InputField/InputField'
import 'styles/commonStyles.scss'

export const Gateways = (props) => {
    const Gateways = props.gateways.gateway.Gateways;
    const editableGateway = props.gateways.EditableGateway; 
    const touched = props.formdata
    return (
            <div className="row tab-pane fade in active" id='gateway'>
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Gateway</h3>
                            <div className="box-tools pull-right">
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        <strong>Add New Gateway</strong>
                                    </Tooltip>}>
                                    <span className="fa fa-plus-circle fa-2x" onClick={props.AddGatewayModalToggle} ></span>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className="box-body"> 
                            <div className="margin-bottom-sm padding-top">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className={ Gateways.length > 0 ? "show" : "hide"}>                                                
                                            <div className=' table-responsive'>
                                                <Table id="results" striped bordered condensed hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>    
                                                            <th>URL</th>                                                         
                                                            <th colSpan={2}>Actions</th> 
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        Gateways.map((gateway, index) =>
                                                        (<tr key={index}>
                                                            <td className="text-align-col">{gateway.aliasName}</td>
                                                            <td className="text-align-col">{gateway.piInterfaceRootUrl}</td>
                                                            <td className="text-align-col">
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Edit {gateway.aliasName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className="fa fa-edit fa-2x" onClick={() => { props.EditGateway(index) } }></i>
                                                                </OverlayTrigger>                                                                 
                                                            </td>
                                                            <td>
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Delete {gateway.aliasName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className={!isNaN(gateway.id) && gateway.id== -1 ? "show fa fa-trash-o fa-2x" : "hide" } onClick={() => { props.DeleteGateway(index) } }></i>
                                                                </OverlayTrigger> 
                                                                
                                                            </td>
                                                        </tr>))
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
              {props.gateways.showAddModal ?  <Modal show={props.gateways.showAddModal}>
                <Modal.Header>
                    <Modal.Title>New Gateway</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <div className="row">
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="GatewayName" 
                                    defaultvalue={editableGateway.GatewayName} touched = {touched.hasOwnProperty('GatewayForm')?touched.GatewayForm.hasOwnProperty('fields') ? touched.GatewayForm.fields.hasOwnProperty('GatewayName') : false :false }>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>URL</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" touched = {touched.hasOwnProperty('GatewayForm')?touched.GatewayForm.hasOwnProperty('fields') ? touched.GatewayForm.fields.hasOwnProperty('GatewayURL') : false :false } className="form-control" name="GatewayURL"
                                    defaultvalue={editableGateway.GatewayURL} />
                                   
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Login</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="GatewayLogin"
                                    defaultvalue={editableGateway.GatewayLogin} touched = {touched.hasOwnProperty('GatewayForm')?touched.GatewayForm.hasOwnProperty('fields') ? touched.GatewayForm.fields.hasOwnProperty('GatewayLogin') : false :false }>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Password</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="GatewayPassword"
                                    defaultvalue={editableGateway.GatewayPassword} touched = {touched.hasOwnProperty('GatewayForm')?touched.GatewayForm.hasOwnProperty('fields') ? touched.GatewayForm.fields.hasOwnProperty('GatewayPassword') : false :false }>
                                    </Field>
                                </div>
                            </div>
                    </div> 
                        
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" type="button"  onClick={props.AddGatewayModalToggle}>Cancel</Button>
                    <Button className={props.gateways.AddNewGateway  ? "show btn btn-success" : "hide"} type="button" onClick={props.AddGateway}>Add</Button>
                    <Button className={props.gateways.AddNewGateway  ?  "hide" : "show btn btn-success"} type="button" onClick={props.UpdateGateway}>Save</Button>
                </Modal.Footer>
            </Modal> : null }
            </div>
        )
}

export default Gateways