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
export const BIND_BASIC_INITIAL_VALUES = 'BIND_BASIC_INITIAL_VALUES'
export const PRIMARY_MARKET_CHANGE_EVENT = 'PRIMARY_MARKET_CHANGE_EVENT'
export const CREDENTIAL_DROPDOWN_CHANGE_EVENT = 'CREDENTIAL_DROPDOWN_CHANGE_EVENT'
export const GET_LOCATION_TYPES ="GET_LOCATION_TYPES"
export const GET_OWNERS ="GET_OWNERS"
export const GET_PRIMARY_MARKETS = "GET_PRIMARY_MARKETS"
export const GET_TECHNOLOGY_TYPES = "GET_TECHNOLOGY_TYPES"
export const GET_FUEL_CLASSES = "GET_FUEL_CLASSES"
export const GET_TIME_ZONE = "GET_TIME_ZONE"

export function BindInitialValues(currentlcoation) {
  return {
    type: BIND_BASIC_INITIAL_VALUES,
    payload: currentlcoation
  };
};

export function onCredentialDropdownChangeEvent(event) {

  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CREDENTIAL_DROPDOWN_CHANGE_EVENT,
        payload: {
          formData: getState().form.CredentialsManagementForm,
          selected: event
        }
      })

    })
  }
};

export function onPrimaryMarketChangeEvent(event) {
  return {
    type: PRIMARY_MARKET_CHANGE_EVENT,
    payload: event
  };
};

export const ACTION_HANDLERS = {
  [BIND_BASIC_INITIAL_VALUES]: (state, action) => {   
    
    if (!!action.payload) {
      var locationId=action.payload.Id;
      let locationObj =action.payload;
      var basicInfo = {
        locationId: locationId,
        locationName: locationObj.Name,
        timezone: locationObj.Tz,
        parentLocation: locationObj.ParentId,
        locationType: locationObj.LocationType,
        createDate: locationObj.CreateDate,
        createUser: locationObj.CreateUser,
        updateUser: locationObj.UpdateUser,
        isOutageLevel: locationObj.IsOutageLevel,
        technologyType: locationObj.TechnologyTypeId,
        secondarytechnologyType: locationObj.SecondaryTechnologyTypeId,
        primaryMarket: locationObj.PrimaryMarketId,
        fuelClass: locationObj.FuelClassId,
        owner: locationObj.OwnerOrgId,
        physicalTimezone: locationObj.PhysicalTz,
        ownerShipPercentage: locationObj.OwnershipPct,
      }
      var credentialData = PrepareCredentialBasicData(locationObj.PrimaryMarketId, locationId);
      var newState = Object.assign({}, state, {
        BasicInfo: basicInfo,
        CredentialBasicData: credentialData.MarketDrivendata,
        CredentialInitialValues: credentialData.CredentialInitialValues
      });
      return newState;
    }
    return Object.assign({}, state, {})

  },
  [CREDENTIAL_DROPDOWN_CHANGE_EVENT]: (state, action) => {
    var stateObj = [];
    try {
      var dropdownItem = action.payload.selected;
      stateObj = action.payload.formData;
      stateObj.values['Encrypted Password'] = dropdownItem.item.ExternalSystemPwd;
    } catch (e) {

    }

    return Object.assign({}, state, {
      stateObj
    })
  },
  [PRIMARY_MARKET_CHANGE_EVENT]: (state, action) => {
    var data = PrepareCredentialBasicData(!!action.payload ? action.payload.id : null)
    return Object.assign({}, state, {
      CredentialBasicData: data.MarketDrivendata
    })
  },
  [GET_LOCATION_TYPES]: (state,action) => {
      return Object.assign({}, state, {
      locationTypes: action.payload
    })
  },
  [GET_OWNERS]: (state,action) => {
    return Object.assign({}, state, {
      owners: action.payload
    })
  },
  [GET_PRIMARY_MARKETS]: (state,action) =>{
     return Object.assign({}, state, {
      primaryMarkets: action.payload
    })
  },
  [GET_TECHNOLOGY_TYPES]: (state,action) => {
     return Object.assign({}, state, {
      technologyTypes: action.payload
    })
   },
  [GET_FUEL_CLASSES]: (state,action) => {
     return Object.assign({}, state, {
      fuelClasses: action.payload
    })
   },
   [GET_TIME_ZONE]: (state,action) => {
     return Object.assign({}, state, {
      timezones: action.payload
    })
   },
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}

function PrepareCredentialBasicData(marketId, locationId = null) {
  //get MarketDrivenMappings from API based on marketType ID
  debugger;
  var data = getMarketDrivenMappings(marketId);
  var omsLocationwizardData = getOMSLocationwizardData(locationId);
  var marketDrivendata = [];
  var credentialInitialValues = {};
  _.each(data, (item) => {
    item.aliasNameDropDownItems = [];
    item.externalSystemLoginDropDownItems = [];
    var aliasNameDropDownItems = [];
    var externalSystemLoginDropDownItems = [];

    _.each(omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings, (wizardDataItem) => {
      if (item.IsDropDown) {
       
        if (wizardDataItem.ExternalSystemName == item.ExternalSystemName) {
          if(!!wizardDataItem.AliasName){
          aliasNameDropDownItems.push({
            key: wizardDataItem.AliasName,
            value: wizardDataItem.AliasName,
            item: wizardDataItem
          });
          }
          if(!!wizardDataItem.ExternalSystemLogin){
          externalSystemLoginDropDownItems.push({
            key: wizardDataItem.ExternalSystemLogin,
            value: wizardDataItem.ExternalSystemLogin,
            item: wizardDataItem
          });
          }
        }
      }
      
        if (wizardDataItem.LocationMappingId > 0) {
          if (wizardDataItem.ExternalSystemName == item.ExternalSystemName) {
          credentialInitialValues[item.DisplayName] = wizardDataItem[item.Field];
        }
      }
    })
    item.aliasNameDropDownItems = _.uniqBy(aliasNameDropDownItems, 'key');
    item.externalSystemLoginDropDownItems = _.uniqBy(externalSystemLoginDropDownItems, 'key');
    marketDrivendata.push(item);
  });
  return {
    MarketDrivendata: marketDrivendata,
    CredentialInitialValues: credentialInitialValues
  };
}

export function getLocationTypesService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getLocationTypes().then(function(response){
                dispatch({
                    type: GET_LOCATION_TYPES,
                    payload: response.data
                });
            })   
      })
  }
}
export function getOwnersService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getOwners().then(function(response){
                dispatch({
                    type: GET_OWNERS,
                    payload: response.data
                });
            })   
      })
  }
}

export function getPrimaryMarketsService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getPrimaryMarkets().then(function(response){
                dispatch({
                    type: GET_PRIMARY_MARKETS,
                    payload: response.data
                });
            })   
      })
  }
}
export function getTechnologyTypesService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getTechnologyTypes().then(function(response){
                dispatch({
                    type: GET_TECHNOLOGY_TYPES,
                    payload: response.data
                });
            })   
      })
  }
}
export function getFuelClassesService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getFuelClasses().then(function(response){
                dispatch({
                    type: GET_FUEL_CLASSES,
                    payload: response.data
                });
            })   
      })
  }
}
export function getTimezonesService() {
   return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getTimezones().then(function(response){
              var arrTimezones = [];
              response.data.GetTimeZonesResult.forEach(function(item, index) {
                arrTimezones.push({
                    id: item,
                    value: item
                });

              });
                dispatch({
                    type: GET_TIME_ZONE,
                    payload: arrTimezones
                });
            })   
      })
  }
}

const initialState = {
  error: null,
  locationTypes: [],//basicInfoDropdowns.getLocationTypes(),
  owners:[],// basicInfoDropdowns.getOwners(),
  primaryMarkets: [], //basicInfoDropdowns.getPrimaryMarkets(),
  technologyTypes:  [], // basicInfoDropdowns.getTechnologyTypes(),
  fuelClasses:  [], //basicInfoDropdowns.getFuelClasses(),
  timezones:  [], //basicInfoDropdowns.getTimezones(),
  initial: true,
  BasicInfo: {},
  CredentialInitialValues: {},
  CredentialBasicData: getMarketDrivenMappings()
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}