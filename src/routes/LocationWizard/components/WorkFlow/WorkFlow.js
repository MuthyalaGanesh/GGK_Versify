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
                                                        labelKey='name'                                             
                                                        valueKey='id'
                                                        multi = {true}
                                                        placeholder="Select WorkFlow"/>
                                                </div>
                                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                        <span id="select-all" onClick={props.selectAll}>Select All</span>
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