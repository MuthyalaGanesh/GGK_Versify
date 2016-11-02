import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'styles/widgetStyle.scss'

const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    {...rest}/>

export const WorkFlow = (props) => { 
       const {workFlowItems} = props.workFlow 
    return (
            <div className="row tab-pane fade in active">
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
                                    <form >
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                                    <label className="control-label"> Assign WorkFlow </label>
                                                    <Field
                                                        component={renderMultiselect}
                                                        defaultValue={[]}
                                                        data={workFlowItems.map(workFlowItem =>workFlowItem.name)}
                                                        placeholder="Select WorkFlow"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default WorkFlow