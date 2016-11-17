import {
  basicInfoDropdowns,
  getMarketDrivenMappings,
  getOMSLocationwizardData

} from 'api/locationWizardApi'
import {
  React,
  dispatch
} from 'react'
import _ from 'lodash';

export const ON_PARENT_LOCATION_SELECT = 'ON_PARENT_LOCATION_SELECT'
export const BIND_INITIAL_VALUES = 'BIND_INITIAL_VALUES'
export const PRIMARY_MARKET_CHANGE_EVENT = 'PRIMARY_MARKET_CHANGE_EVENT'
export const CREDENTIAL_DROPDOWN_CHANGE_EVENT = 'CREDENTIAL_DROPDOWN_CHANGE_EVENT'


export function BindInitialValues(locationId) {
  return {
    type: BIND_INITIAL_VALUES,
    payload: locationId
  };
};

export function onCredentialDropdownChangeEvent(event) {
  
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: CREDENTIAL_DROPDOWN_CHANGE_EVENT, 
        payload:{ formData: getState().form.CredentialsManagementForm, selected:event }})
      
    })
  }
};

export function onChangeEvent(event) {
  return {
    type: PRIMARY_MARKET_CHANGE_EVENT,
    payload: event
  };
};

export const ACTION_HANDLERS = {
  [BIND_INITIAL_VALUES]: (state, action) => {
    console.log("BIND_INITIAL_VALUES:", action.payload);
    return Object.assign({}, state, {
      BasicInfo: {
        locationId: action.payload,
        locationName: "TEST LOCATION"
      }
    })
  },
  [CREDENTIAL_DROPDOWN_CHANGE_EVENT]:(state, action) => {
    console.log("CREDENTIAL_DROPDOWN_CHANGE_EVENT:", action.payload);
    var stateObj =[];
    try{
       var dropdownItem = action.payload.selected;
       stateObj = action.payload.formData;
       stateObj.values['Encrypted Password']= dropdownItem.item.ExternalSystemPwd;
    }catch(e){

    }
    
    return Object.assign({}, state, {
     stateObj
    })
  },
  [PRIMARY_MARKET_CHANGE_EVENT]: (state, action) => {
    //get MarketDrivenMappings from API based on marketType ID
    var data = getMarketDrivenMappings(!!action.payload ? action.payload.id : null);
    var omsLocationwizardData = getOMSLocationwizardData(!!action.payload ? action.payload.id : null);
    var marketDrivendata = [];
    _.each(data, (item) => {
      item.aliasNameDropDownItems = [];
      item.externalSystemLoginDropDownItems = [];
      var aliasNameDropDownItems = [];
      var externalSystemLoginDropDownItems = [];

      _.each(omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings, (wizardDataItem) => {
        if (item.IsDropDown) {
          var dropdownItem = _(wizardDataItem).find(function(x) {
            return x => x.ExternalSystemName === item.ExternalSystemName && x.Field === item.Field
          });
          if (!!dropdownItem && dropdownItem != '') {
            aliasNameDropDownItems.push({
              key: wizardDataItem.AliasName,
              value: wizardDataItem.AliasName,
              item:wizardDataItem
            });
            externalSystemLoginDropDownItems.push({
              key: wizardDataItem.ExternalSystemLogin,
              value: wizardDataItem.ExternalSystemLogin,
              item:wizardDataItem              
            });
          }
        }
      })
      item.aliasNameDropDownItems = _.uniqBy(aliasNameDropDownItems, 'key');
      item.externalSystemLoginDropDownItems = _.uniqBy(externalSystemLoginDropDownItems, 'key');
      marketDrivendata.push(item);
    });

    return Object.assign({}, state, {
      CredentialBasicData: marketDrivendata
    })
  },
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}


const initialState = {
  error: null,
  locationTypes: basicInfoDropdowns.getLocationTypes,
  owners: basicInfoDropdowns.getOwners,
  primaryMarkets: basicInfoDropdowns.getPrimaryMarkets,
  technologyTypes: basicInfoDropdowns.getTechnologyTypes,
  fuelClasses: basicInfoDropdowns.getFuelClasses,
  timezones: basicInfoDropdowns.getTimezones,
  initial: true,
  BasicInfo: {},
  CredentialBasicData: getMarketDrivenMappings()
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}