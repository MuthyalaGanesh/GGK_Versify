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
              {error ?  <div className='col-sm-12 errorMessage' style={{textAlign:'center'}}> Please complete the  highlighted fields </div> : null }
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
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? !formdata.BasicInfoForm.values.hasOwnProperty('locationName')  : true)
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
                  parentLocations={props.location.parentLocations}>
                  </Field>
                  
                  
                </div>
                <div className='clear'></div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Type </label>
                  <Field component={DropdownListField}
                  name="locationType"
                  data={locationTypes}
                  valueKey='id'
                  labelKey='displayName'
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('locationType')?  (formdata.BasicInfoForm.values.locationType == null ): true : true)
                  ? "error"
                  :null}
                  placeholder="Select location type">
                  </Field>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Technology Type </label>
                  <Field component={DropdownListField}
                  name="technologyType"
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('technologyType')?  (formdata.BasicInfoForm.values.technologyType == null ): true : true)
                  ? "error"
                  :null}
                  data={technologyTypes}
                  valueKey='id'
                  labelKey='name'
                  placeholder="Select Technology type" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Secondary Technology Type { error && formdata.BasicInfoForm.hasOwnProperty('values') && formdata.BasicInfoForm.values.hasOwnProperty('secondarytechnologyType')&& formdata.BasicInfoForm.values.secondarytechnologyType != null &&(formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType)
                  ?   <span className='errorMessage' style ={{float:'right'}}> Please select different technologyType </span>
                  : null
                  }</label>
                  <Field component={DropdownListField}
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('secondarytechnologyType') ? (formdata.BasicInfoForm.values.secondarytechnologyType == null )? true:(formdata.BasicInfoForm.values.secondarytechnologyType == formdata.BasicInfoForm.values.technologyType) :true : true)
                  ? "error"
                  :null}
                  name="secondarytechnologyType"
                  data={technologyTypes}
                  valueKey='id'
                  labelKey='name'
                  placeholder="Select Technology type">
                  </Field>
                  
                </div>
                <div className='clear'></div>                
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Primary Market </label>
                  <Field component={DropdownListField} onChangeEvent={props.onChangeEvent}
                  name="primaryMarket"
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('primaryMarket')?  (formdata.BasicInfoForm.values.primaryMarket == null ): true : true)
                  ? "error"
                  :null}
                  data={primaryMarkets}
                  valueKey='id'
                  labelKey='name'
                  placeholder="Select primaryMarket type" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Fuel ClassName </label>
                  <Field component={DropdownListField}
                  name="fuelClass"
                  className={error &&(formdata.BasicInfoForm.hasOwnProperty('values') ?  formdata.BasicInfoForm.values.hasOwnProperty('fuelClass')?  (formdata.BasicInfoForm.values.fuelClass == null ): true : true)
                  ? "error"
                  : null}
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
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('owner')?  (formdata.BasicInfoForm.values.owner == null ): true : true)
                  ? "error"
                  :null}
                  data={owners}
                  valueKey='id'
                  labelKey='name'
                  placeholder="Select Owner type">
                  </Field>
                </div>
                <div className='clear'></div>                
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> OwnerShip % { error && formdata.BasicInfoForm.hasOwnProperty('values') && formdata.BasicInfoForm.values.hasOwnProperty('ownerShipPercentage')&& (parseInt(formdata.BasicInfoForm.values.ownerShipPercentage )> 100  || parseInt(formdata.BasicInfoForm.values.ownerShipPercentage) < 0 )?   <span className='errorMessage' style={{float:'right'}}> Please give valid input </span>
                  : null
                  } </label>

                  <Field name="ownerShipPercentage"
                  component="input"
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('ownerShipPercentage') ? (parseInt(formdata.BasicInfoForm.values.ownerShipPercentage ) > 100):true : true)
                  ? "form-control error"
                  :null}
                  type="text"
                  placeholder="OwnerShip Percentage" />
                </div>
                 
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group">
                  <label className="control-label"> Timezone</label>
                  <Field component={DropdownListField}
                  name="timezone"
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('timezone')?  (formdata.BasicInfoForm.values.timezone == null ): true : true)
                  ? "error"
                  : null}
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
                  className={error && (formdata.BasicInfoForm.hasOwnProperty('values') ? formdata.BasicInfoForm.values.hasOwnProperty('physicalTimezone')?  (formdata.BasicInfoForm.values.physicalTimezone == null ): true : true)
                  ? "error"
                  : null}
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