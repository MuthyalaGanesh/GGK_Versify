import React from 'react'
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

export const DataHistorian = (props) => { 
    const metrics = props.dataHistorian.metrics;
    const gateways = props.dataHistorian.gateways.Gateways;
    const dataHistorian = props.dataHistorian.dataHistorian;
    return (
            <div className="row tab-pane fade in active" id="datahistorian">
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
                                                            <td className="text-align-col">
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Edit {data.metricName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className="fa fa-edit fa-2x" onClick={() => { props.EditGateway(index) } }></i>
                                                                </OverlayTrigger>                                                                 
                                                            </td>
                                                            <td>
                                                                <OverlayTrigger placement="left" overlay={
                                                                    <Tooltip id="tooltip">
                                                                        <strong>Delete {data.metricName}</strong>
                                                                    </Tooltip>}>
                                                                    <i className={!isNaN(data.id) && data.id== 0 ? "show fa fa-trash-o fa-2x" : "hide" } onClick={() => { props.DeleteGateway(index) } }></i>
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
                            <div className={props.dataHistorian.AddNewDataHistorian?"show col-xs-12 form-group":"Hide"}>
                                <div className="col-xs-6">
                                    <label>metric</label>
                                </div>                                
                                <div className="col-xs-6">
                                    <Field component={RenderDropdownList} className="form-control" name="metric"  data={metrics} 
                                            valueField='id' textField='displayName' placeholder="Select metric"/>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Tag</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" className="form-control" name="Tag">
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Gateway</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component="select" className="form-control"  name = "Gateway">
                                            <option value="">Select a Gateway</option>
                                            {                                                
                                                gateways.map(gateway =>
                                                <option value={gateway} key={gateway.id}>{gateway.aliasName}</option>)
                                            }
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Is Digital Tag</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field name="isDigitalTag" 
                                            component='input' type="checkbox"
                                         text='Allow Outages at Location'/>                                           
                                </div>
                            </div>
                    </div>       
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" type="button"  onClick={props.AddDataHistorianModalToggle}>Cancel</Button>                    
                    <Button className={props.dataHistorian.AddNewDataHistorian ? "show btn btn-success" : "hide"} type="button" onClick={props.AddDataHistorian}>Add</Button>
                    <Button className={props.dataHistorian.AddNewDataHistorian ?  "hide" : "show btn btn-success"} type="button" onClick={props.UpdateAddDataHistorian}>Save</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
}

export default DataHistorian