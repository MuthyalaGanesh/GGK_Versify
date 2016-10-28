import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../validations/basicInfoValidation'
import {Panel, ControlLabel, Checkbox} from 'react-bootstrap/lib'
import 'styles/basicInfoStyles.scss'

export const BasicInfo = (props) => {
    const {locationTypes} = props.basic
return (
  <div className="row tab-pane fade in active" id="home">
    <div className="col-xs-12">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">Basic Information</h3>
                <div className="box-tools pull-right">
                    &nbsp;
                </div>
            </div>
            <div className="box-body">
                <div className="margin-bottom-sm padding-top">
                    <div className="row">
                        <form onSubmit={props.basicInfoSubmit} onChange={props.onchange}>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <label className="control-label"> Name </label>
                                        <Field name="locationName" component="input" className="form-control" type="text" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <Checkbox name="allowOutages">
                                            Allow Outages at Location
                                        </Checkbox>
                                    </div>     
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label className="control-label"> Parent Location </label>
                                        <Field name="parentLocation" component="select" className="form-control">
                                            <option></option>
                                            <option value="ff0000">Red</option>
                                            <option value="00ff00">Green</option>
                                            <option value="0000ff">Blue</option>
                                        </Field>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <label className="control-label"> Type </label>
                                        <Field name="type" component="select" className="form-control">
                                          <option value="">Select a type...</option>
                                             {
                                                 locationTypes.map(locationType =>
                                                <option value={locationType.id} key={locationType.id}>{locationType.displayName}</option>)
                                            }
                                        </Field>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <label className="control-label"> Name </label>
                                        <Field name="locationName1" component="input" className="form-control" type="text" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <label className="control-label"> Name </label>
                                        <Field name="locationName2" component="input" className="form-control" type="text" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                        <label className="control-label"> Name </label>
                                        <Field name="locationName3" component="input" className="form-control" type="text" />
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

export default BasicInfo



