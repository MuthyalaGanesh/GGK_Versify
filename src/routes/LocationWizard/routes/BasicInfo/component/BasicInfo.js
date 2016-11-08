import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../validations/basicInfoValidation'
import {Panel, ControlLabel, Checkbox, Button,FormGroup, Tooltip,OverlayTrigger } from 'react-bootstrap/lib'
import 'styles/basicInfoStyles.scss'
import ParentLocationField from '../../../../../components/ParentLocationField/ParentLocationField'

export const BasicInfo = (props) => {
    const {
        locationTypes,
        primaryMarkets,
        locations,
        parentLocations,
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
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" > Name </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                        <OverlayTrigger placement="top" overlay={
                                            error && formdata.BasicInfoForm.values.locationName === ''
                                                       ? 
                                                        <Tooltip placement="top" className="in" id="tooltip-top">
                                                        Please Enter Location Name
                                                        </Tooltip> 
                                                       :<p></p>} >
                                                       <Field name="locationName" 
                                                   component="input" 
                                                   className= {error && formdata.BasicInfoForm.values.locationName === ''
                                                       ? "form-control error"
                                                       :"form-control"} 
                                                   type="text" 
                                                   placeholder="Location Name" />
                                        </OverlayTrigger>                                                   
                                        </div>
                                    </div>
                                    <FormGroup  className="col-sm-12 col-md-6">
                                            <Field name="isOutageLevel" 
                                            component='input' type="checkbox"
                                         text='Allow Outages at Location'/>
                                            <label className="control-label" > &nbsp;&nbsp;Allow Outages at Location </label>
                                         
                                    </FormGroup>     
                                    <div className='clear'></div>                              
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="parentLocation"> Parent Location</label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field 
                                            name="parentLocation" 
                                            component={ParentLocationField} 
                                            onParentLoCationSelect ={props.onParentLoCationSelect}
                                            parentLocations={parentLocations}
                                            className="form-control">                                                
                                            </Field>
                                        </div>
                                    </div>
                                    <div className='clear'></div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="locationType"> Type </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="locationType" component="select" className="form-control">
                                                <option value="">Select a type...</option>
                                                {
                                                locationTypes.map(locationType =>
                                                <option value={locationType.id} key={locationType.id}>{locationType.displayName}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="technologyType"> Technology type </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="technologyType" component="select" className="form-control">
                                                <option value="">Select a Technology type...</option>
                                                {
                                                technologyTypes.map(technologyType =>
                                                <option value={technologyType.id} key={technologyType.id}>{technologyType.name}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="primaryMarket"> Primary Market </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">

                                            <Field name="primaryMarket" component="select" className="form-control">
                                                <option value="">Select a Technology type...</option>
                                                {
                                                primaryMarkets.map(primaryMarket =>
                                                <option value={primaryMarket.id} key={primaryMarket.id}>{primaryMarket.name}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="secondarytechnologyType"> Secondary Technology type </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                        { error && (formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType)
                                            ?   <div className='errorMessage'> Please selct different technologyType </div> 
                                            : null
                                        }

                                         { error && (!formdata.BasicInfoForm.values.hasOwnProperty('secondarytechnologyType') || (formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType))
                                     
                                            ?

                                             <Field name="secondarytechnologyType" component="select" className="form-control error">
                                                <option value="">Select a Technology type...</option>
                                                {
                                                technologyTypes.map(technologyType =>
                                                <option value={technologyType.id} key={technologyType.id}>{technologyType.name}</option>)
                                                }
                                            </Field>
                                            :
                                             <Field name="secondarytechnologyType" component="select" className="form-control">
                                                <option value="">Select a Technology type...</option>
                                                {
                                                technologyTypes.map(technologyType =>
                                                <option value={technologyType.id} key={technologyType.id}>{technologyType.name}</option>)
                                                }
                                            </Field>

                                            }
                                           
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="owner"> Owner </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="owner" component="select" className="form-control">
                                                <option value="">Select Owner...</option>
                                                {
                                                owners.map(owner =>
                                                <option value={owner.id} key={owner.id}>{owner.name}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="fuelClass"> Fuel Class </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="fuelClass" component="select" className="form-control">
                                                <option value="">Select Fuel Class</option>
                                                {
                                                fuelClasses.map(fuelClass =>
                                                <option value={fuelClass.id} key={fuelClass.id}>{fuelClass.name}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="ownerShipPercentage"> Ownership % </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="ownerShipPercentage" component="input" className="form-control" type="text" placeholder="OwnerShip Percentage" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="timezone"> Timezone </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="timezone" component="select" className="form-control">
                                                <option value="">Select Timezone</option>
                                                {
                                                timezones.map(timezone =>
                                                <option value={timezone.id} key={timezone.id}>{timezone.value}</option>)
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 form-group">
                                        <div className="col-sm-5 col-md-5">
                                            <label className="control-label" id="physicalTimezone"> Physical Timezone </label>
                                        </div>
                                        <div className="col-sm-7 col-md-7">
                                            <Field name="physicalTimezone" component="select" className="form-control">
                                                <option value="">Select Physical Timezone</option>
                                                {
                                                timezones.map(timezone =>
                                                <option value={timezone.id} key={timezone.id}>{timezone.value}</option>)
                                                }
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
</div>
        )
    
}

export default BasicInfo



