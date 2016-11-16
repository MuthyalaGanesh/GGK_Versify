import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import DropdownListField from 'components/DropdownList/DropdownListField'
import { Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import 'styles/widgetStyle.scss'

export const WorkFlow = (props) => { 
       const {workFlowItems} = props.workFlow 
    return (
            <div className="row tab-pane fade in active" id='workflow'>
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">WorkFlow</h3>
                            <div className="box-tools pull-right">
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
                                                        component={DropdownListField}
                                                        defaultValue={props.workFlow.defaultWorkFlow}
                                                        name = 'workFlowItem'
                                                        data={workFlowItems}                                                                                                              
                                                        labelKey='WorkflowGroupName'                                             
                                                        valueKey='WorkflowGroupId'
                                                        multi = {true}
                                                        placeholder="Select WorkFlow"
                                                        onChangeEvent = {props.workFlowChange}/>
                                                        <div className="col-lg-12">
                                                            <span className="select-all pull-left" onClick={props.selectAll}>Select All</span>
                                                            <span className="deselect-all pull-right" onClick={props.removeAll}>Deselect All</span>
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
            </div>
        )
}

export default WorkFlow