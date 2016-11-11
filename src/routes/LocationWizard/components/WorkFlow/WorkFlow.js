import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import Multiselect from 'react-widgets/lib/Multiselect'
import { Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import 'styles/widgetStyle.scss'

const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || rest.defaultValue} // requires value to be an array
    {...rest}/>

export const WorkFlow = (props) => { 
       const {workFlowItems} = props.workFlow 
    return (
            <div className="row tab-pane fade in active" id='workflow'>
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">WorkFlow</h3>
                            <div className="box-tools pull-right">
                            &nbsp;
                            </div>
                        </div>
                        <div className="box-body"> 
                            <div className="margin-bottom-sm padding-top">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row">                                                
                                            <div className="form-group">
                                                <div className="col-sm-5 col-md-3 col-lg-3">
                                                    <label className="control-label"> Assign WorkFlow </label>
                                                </div>
                                                <div className="col-sm-5 col-md-7 col-lg-7 MultipleSelect">
                                                    <Field
                                                        component={renderMultiselect}
                                                        defaultValue={props.workFlow.defaultWorkFlow}
                                                        name = 'workFlowItem'
                                                        data={workFlowItems}                                                                                                              
                                                        textField='name'                                             
                                                        valueField='id'
                                                        placeholder="Select WorkFlow"/>
                                                </div>
                                                <div className="col-sm-1 col-md-1 col-lg-1">
                                                    <OverlayTrigger placement="bottom" overlay={
                                                        <Tooltip id="tooltip">
                                                            <strong>Select All</strong>
                                                        </Tooltip>}>
                                                        <i id='success' className="fa fa-check fa-2x" onClick={props.selectAll}></i>
                                                    </OverlayTrigger>
                                                </div>
                                                <div className="col-sm-1 col-md-1 col-lg-1">
                                                    <OverlayTrigger placement="bottom" overlay={
                                                        <Tooltip id="tooltip">
                                                            <strong>Remove All</strong>
                                                        </Tooltip>}>
                                                        <i id='danger' className="fa fa-times fa-2x" onClick={props.removeAll}></i>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default WorkFlow