import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DropdownListField from 'components/DropdownList/DropdownListField'
import validate from '../../validations/basicInfoValidation'
import {Panel, ControlLabel, Checkbox, Button,FormGroup, Tooltip,OverlayTrigger } from 'react-bootstrap/lib'
import 'styles/basicInfoStyles.scss'
import ParentLocationField from 'components/ParentLocationField/ParentLocationField'

export const BasicInfo = (props) => {
    const {
        locationTypes,
        primaryMarkets,
        locations,
        owners,
        technologyTypes,
        fuelClasses,
        timezones,        
        error
    } = props.basic
    
const {formdata} = props;
return (
<div className="row tab-pane fade in active" id="basicinfo">
    <div className="col-xs-12">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">Basic Information</h3>
                <div className="box-tools pull-right">
                </div>
            </div>
            <div className="box-body">
                <div className="margin-bottom-sm padding-top">
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="row">
                             <Field name="LocationId"
                                           component="input"                                           
                                           type="hidden"
                                           value={props.LocationId ||0}
                                           >
                                    </Field>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label">
                                        Name
                                    </label>

                                    <Field name="locationName"
                                           component="input"
                                           className={error && formdata.BasicInfoForm.values.locationName ==''
                                           ? "form-control error"
                                           :"form-control"}
                                           type="text"
                                           placeholder="Location Name">
                                    </Field>
                                </div>
                                <FormGroup className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group-checkbox">

                                    <label className="checkbox-inline control-label">
                                        <Field name="isOutageLevel"
                                               component='input' type="checkbox"
                                               text='Allow Outages at Location' className='checkbox' />
                                        &nbsp;&nbsp;Allow Outages at Location
                                    </label>

                                </FormGroup>


                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Parent Location </label>
                                    <Field name="parentLocation"
                                           component={ParentLocationField}
                                           parentLocations={props.parentLocations}>
                                    </Field>
                                    {props.basic.parentLocation && props.basic.parentLocation.touched && props.basic.parentLocation.error && <span className='errorMessage'>{props.basic.parentLocation.error}</span>}
                                    
                                </div>
                                <div className='clear'></div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Type </label>
                                    <Field component={DropdownListField}
                                           name="locationType"
                                           data={locationTypes}
                                           valueKey='id'
                                           labelKey='displayName'
                                           placeholder="Select location type">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Technology Type </label>
                                    <Field component={DropdownListField}
                                           name="technologyType"
                                           data={technologyTypes}
                                           valueKey='id'
                                           labelKey='name'
                                           placeholder="Select Technology type" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Secondary Technology Type </label>
                                    <Field component={DropdownListField}
                                           className={
                                           error && (!formdata.BasicInfoForm.values.hasOwnProperty('secondarytechnologyType')
                                           || (formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType))
                                           ?'error'
                                           :''
                                           }
                                           name="secondarytechnologyType"
                                           data={technologyTypes}
                                           valueKey='id'
                                           labelKey='name'
                                           placeholder="Select Technology type">
                                    </Field>
                                    { error && (formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType)
                                    ?   <span className='errorMessage'> Please select different technologyType </span>
                                    : null
                                    }
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Primary Market </label>
                                    <Field component={DropdownListField} onChangeEvent={props.onChangeEvent}
                                           name="primaryMarket"
                                           data={primaryMarkets}
                                           valueKey='id'
                                           labelKey='name'
                                           placeholder="Select primaryMarket type" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Fuel ClassName </label>
                                    <Field component={DropdownListField}
                                           name="fuelClass"
                                           data={fuelClasses}
                                           valueKey='id'
                                           labelKey='name'
                                           placeholder="Select Fuel className">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Owner </label>
                                    <Field component={DropdownListField}
                                           name="owner"
                                           data={owners}
                                           valueKey='id'
                                           labelKey='name'
                                           placeholder="Select Owner type">
                                    </Field>

                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> OwnerShip % </label>
                                    <Field name="ownerShipPercentage"
                                           component="input"
                                           className="form-control"
                                           type="text"
                                           placeholder="OwnerShip Percentage" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Timezone</label>
                                    <Field component={DropdownListField}
                                           name="timezone"
                                           data={timezones}
                                           valueKey='id'
                                           labelKey='value'
                                           placeholder="Select Timezone">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Physical Timezone </label>
                                    <Field component={DropdownListField}
                                           name="physicalTimezone"
                                           data={timezones}
                                           valueKey='id'
                                           labelKey='value'
                                           placeholder="Select Physical Timezone">
                                    </Field>
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

export default BasicInfo



