import React from 'react'
import {input} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Table, Popover, Button, Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import DropdownListField from 'components/DropdownList/DropdownListField'
import InputField from 'components/InputField/InputField'
import 'styles/commonStyles.scss'

 const RenderCheckBox = ({ input, ...rest })=>{
    console.log(rest.defaultvalue)
    return(
        <input 
            onChange={(e)=>{ input.onChange(e)}}
            value={input.value}
            defaultChecked = {rest.defaultvalue}
            {...rest}/>
        ) }
       

export const DataHistorian = (props) => { 
    const metrics = props.dataHistorian.metrics;
    const gateways = props.dataHistorian.gateways.Gateways;
    const dataHistorian = props.dataHistorian.dataHistorian;
    const touched = props.formdata;
    const error = props.dataHistorian.error
    const validations = props.dataHistorian.validationMessages
    return (
            <div className="row tab-pane fade in active" id="datahistorian">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Data Historian</h3>
                            <div className="box-tools pull-right">
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip id="tooltip">
                                        <strong>Add Data Historian</strong>
                                    </Tooltip>}>
                                    <i className="fa fa-plus-circle fa-2x" onClick={props.AddDataHistorianModalToggle}></i>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className="box-body"> 
                            <div className="margin-bottom-sm padding-top">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className={ dataHistorian.length > 0 ? "show" : "hide"}>                                                
                                            <div className=' table-responsive'>
                                                <Table id="results" striped bordered condensed hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Metric</th>    
                                                            <th>Description</th> 
                                                            <th>Tag</th>                                                        
                                                            <th colSpan={2}>Actions</th> 
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        dataHistorian.map((data, index) =>
                                                        (<tr key={index}>
                                                            <td className="text-align-col">{data.metricName}</td>
                                                            <td className="text-align-col">{data.metricDescription}</td>
                                                            <td className="text-align-col">{data.scadaTag}</td>
                                                            <td className="text-align-col text-center">
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Edit {data.metricName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className="fa fa-edit" onClick={() => { props.EditDataHistorian(index) } }></i>
                                                                </OverlayTrigger>                                                                 
                                                            </td>
                                                            <td className="text-align-col text-center">
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Delete {data.metricName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className={!data.isDefault ? "show fa fa-trash-o" : "hide" } onClick={() => { props.ConfirmDataDelete(index) } }></i>
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
                <Modal show={props.dataHistorian.showAddDataHistorianModal}>
                <Modal.Header>
                            {props.dataHistorian.AddNewDataHistorian  ?       
                            <Modal.Title>New Data Historian</Modal.Title> :
                            <Modal.Title>Edit Data Historian</Modal.Title>}                    
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                            <div className={props.dataHistorian.AddNewDataHistorian || !props.dataHistorian.EditableDataHistorian.isDefault ? "col-xs-12 form-group show":"hide"}>
                                <div className="col-xs-6">
                                    <label>Metric *</label>
                                </div>                                
                                <div className="col-xs-6">
                                    <Field component={DropdownListField} name = 'metric'
                                                        data={metrics} 
                                                        defaultvalue = {props.dataHistorian.EditableDataHistorian.metricId}                                                   
                                                        labelKey='displayName'
                                                        clearable = {props.dataHistorian.EditableDataHistorian.metricId ? false : true}                                          
                                                        valueKey='id'
                                                        placeholder="Select a Metric"
                                                        onChangeEvent = {props.validateData}/> 
                                    {error && validations.Metric && <span className="errorMessage">{validations.Metric}</span>}
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Tag *</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="Tag" onblur ={props.validateData}
                                         placeholder="Tag" touched = {1}>
                                    </Field>
                                    {error && validations.Tag && <span className="errorMessage">{validations.Tag}</span>}
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Gateway *</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DropdownListField} name = 'Gateway'
                                                        data={gateways} 
                                                        defaultvalue = {props.dataHistorian.EditableDataHistorian.scadaServerId}                                                   
                                                        labelKey='aliasName'  
                                                        clearable = {props.dataHistorian.EditableDataHistorian.scadaServerId ? false : true}                                           
                                                        valueKey='id'
                                                        placeholder="Select Gateway"
                                                        onChangeEvent = {props.validateData}/> 
                                    {error && validations.Gateway && <span className="errorMessage">{validations.Gateway}</span>}
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6 row">
                                    <label className="checkbox-inline control-label" onClick={props.ClickedIsDigitalTag}>
                                        <Field name="isDigitalTag" component={RenderCheckBox} type="checkbox" defaultvalue = {props.dataHistorian.EditableDataHistorian.isDigitalState}/>
                                        Is Digital Tag
                                    </label>
                                </div>
                            </div>
                    </div>       
                </Modal.Body>
                <Modal.Footer>  
                        {props.dataHistorian.AddNewDataHistorian  ?       
                            <button className="btn btn-success" type="button" onClick={props.AddDataHistorian}>Add</button> :
                            <button className="btn btn-success" type="button" onClick={props.UpdateAddDataHistorian}>Save</button>}
                        <button className="btn btn-warning" type="button"  onClick={props.AddDataHistorianModalToggle}>Cancel</button>  
                   
                </Modal.Footer>
            </Modal>
            <Modal show={props.dataHistorian.showDataDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, want to delete this Data Historian?
                </Modal.Body>
                <Modal.Footer>
                    <div className="pull-right">
                        <button className="btn btn-warning" type="button" onClick={props.CloseDataConfirmation}>Close</button>
                        <button className="btn btn-danger" type="button" onClick={props.DeleteDataHistorian}>Delete</button>
                    </div>
                </Modal.Footer>
            </Modal>
            </div>
        )
}

export default DataHistorian