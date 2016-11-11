import React from 'react'
import {input} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Table, Popover, Button, Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import DropdownList from 'react-widgets/lib/DropdownList'
import InputField from 'components/InputField/InputField'
import 'styles/commonStyles.scss'

const RenderDropdownList = ({ input, ...rest }) =>
  <DropdownList {...input}
    onBlur={() => input.onBlur()}
    value={input.value || rest.defaultValue} //requires value to be an array
    {...rest}/>

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
                                                                    <i className={!isNaN(data.id) && data.id== 0 ? "show fa fa-trash-o" : "hide" } onClick={() => { props.DeleteDataHistorian(index) } }></i>
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
                    <Modal.Title>New Data Historian</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                            <div className={props.dataHistorian.AddNewDataHistorian ||props.dataHistorian.EditableDataHistorian.id == 0 ? "col-xs-12 form-group show":"hide"}>
                                <div className="col-xs-6">
                                    <label>Metric</label>
                                </div>                                
                                <div className="col-xs-6">
                                     <Field component={RenderDropdownList} className="form-control" name="metric"  placeholder="Select a Metric"
                                             valueField='id' textField='displayName' data={metrics} defaultValue = {props.dataHistorian.EditableDataHistorian.metricId}/>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Tag</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="Tag" defaultvalue={props.dataHistorian.EditableDataHistorian.scadaTag}
                                         placeholder="Tag" touched = {touched.hasOwnProperty('DataHistorianForm')?touched.DataHistorianForm.hasOwnProperty('fields') ? touched.DataHistorianForm.fields.hasOwnProperty('Tag') : false :false }>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Gateway</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={RenderDropdownList} className="form-control" name="Gateway"  placeholder="Select Gateway"
                                             valueField='id' textField='aliasName' data={gateways} defaultValue = {props.dataHistorian.EditableDataHistorian.scadaServerId}/>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Is Digital Tag</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field name="isDigitalTag" component={RenderCheckBox} type="checkbox" defaultvalue = {props.dataHistorian.EditableDataHistorian.isDigitalState}/>                                           
                                </div>
                            </div>
                    </div>       
                </Modal.Body>
                <Modal.Footer>     
                    <div class="pull-right">  
                        {props.dataHistorian.AddNewDataHistorian  ?       
                            <button className="btn btn-success" type="button" onClick={props.AddDataHistorian}>Add</button> :
                            <button className="btn btn-success" type="button" onClick={props.UpdateAddDataHistorian}>Save</button>}
                        <button className="btn btn-warning" type="button"  onClick={props.AddDataHistorianModalToggle}>Cancel</button>  
                    </div>
                </Modal.Footer>
            </Modal>
            </div>
        )
}

export default DataHistorian