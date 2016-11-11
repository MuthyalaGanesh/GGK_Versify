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
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Name </label>
                                    <OverlayTrigger placement="top" overlay={
                                                    error && formdata.BasicInfoForm.values.locationName ==''
                                                    ?
                                                        <Tooltip placement="top" className="in" id="tooltip-top">
                                                        Please Enter Location Name
                                                        </Tooltip>
                                                       :<p></p>} >

                                               <Field name="locationName"
                                                   component="input"
                                                   className= {error && formdata.BasicInfoForm.values.locationName == ''
                                                       ? "form-control error"
                                                       :"form-control"}
                                                   type="text"
                                                   placeholder="Location Name">
                                                </Field>
                                        </OverlayTrigger>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Allow Outages at Location </label>
                                    <Field name="isOutageLevel"
                                           component='input' type="checkbox"
                                           text='Allow Outages at Location' className='checkbox'>
                                    </Field>
                                    
                                </div>                               
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Parent Location </label>
                                    <Field name="parentLocation"
                                           component={ParentLocationField}
                                           parentLocations={props.parentLocations}
                                           className="form-control">
                                    </Field>
                                </div>
                                 <div className='clear'></div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Type </label>
                                    <Field component={DropdownListField}
                                           className="form-control" name="locationType"
                                           data={locationTypes}
                                           valueField='id'
                                           textField='displayName'
                                           placeholder="Select location type">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Technology Type </label>
                                    <Field component={DropdownListField}
                                           className="form-control" name="technologyType"
                                           data={technologyTypes}
                                           valueField='id'
                                           textField='name'
                                           placeholder="Select Technology type" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Secondary Technology Type </label>
                                    { error && (formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType)
                                    ?   <div className='errorMessage'> Please selct different technologyType </div>
                                    : null
                                    }


                                    <Field component={DropdownListField}
                                           className={
                                           error && (!formdata.BasicInfoForm.values.hasOwnProperty('secondarytechnologyType')
                                           || (formdata.BasicInfoForm.values.secondarytechnologyType ==formdata.BasicInfoForm.values.technologyType))
                                           ?'form-control error'
                                           :'form-control'
                                           }
                                           name="secondarytechnologyType"
                                           data={technologyTypes}
                                           valueField='id'
                                           textField='name'
                                           placeholder="Select Technology type">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Primary Market </label>
                                    <Field component={DropdownListField} onChangeEvent={props.onChangeEvent}
                                           className="form-control" name="primaryMarket"
                                           data={primaryMarkets}
                                           valueField='id'
                                           textField='name'
                                           placeholder="Select primaryMarket type" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Owner </label>
                                    <Field component={DropdownListField}
                                           className="form-control" name="owner"
                                           data={owners}
                                           valueField='id'
                                           textField='name'
                                           placeholder="Select Owner type">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Fuel ClassName </label>
                                    <Field component={DropdownListField}
                                           className="form-control" name="fuelClass"
                                           data={fuelClasses}
                                           valueField='id'
                                           textField='name'
                                           placeholder="Select Fuel className">
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
                                           className="form-control" name="timezone"
                                           data={timezones}
                                           valueField='id'
                                           textField='value'
                                           placeholder="Select Timezone">
                                    </Field>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                                    <label className="control-label"> Physical Timezone </label>
                                    <Field component={DropdownListField}
                                           className="form-control" name="physicalTimezone"
                                           data={timezones}
                                           valueField='id'
                                           textField='value'
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



