import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import InputField from '../../../../../components/InputField/InputField'
import 'styles/commonStyles.scss'

export const DataHistorian = (props) => { 

    return (
            <div className="row tab-pane fade in active">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Data Historian</h3>
                            <div className="box-tools pull-right">
                                <span className="fa fa-plus-circle fa-2x" onClick={props.AddDataHistorianModalToggle}></span>
                            </div>
                        </div>
                        <div className="box-body"> 
                            <div className="margin-bottom-sm padding-top">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row">                                                
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
                <Modal show={props.dataHistorian.showAddModal}>
                <Modal.Header>
                    <Modal.Title>New Data Historian</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Tag</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="newDataHistorianTag">
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>URL</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="newGateway">
                                    </Field>
                                </div>
                            </div>
                    </div>       
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" type="button"  onClick={props.AddDataHistorianModalToggle}>Cancel</Button>
                    <Button className="btn btn-success" type="button" >Add</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
}

export default DataHistorian