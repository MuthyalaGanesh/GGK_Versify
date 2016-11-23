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
export const BIND_BASIC_INITIALCREDENTIAL_VALUES = 'BIND_BASIC_INITIALCREDENTIAL_VALUES'
export const PRIMARY_MARKET_CHANGE_EVENT = 'PRIMARY_MARKET_CHANGE_EVENT'
export const CREDENTIAL_DROPDOWN_CHANGE_EVENT = 'CREDENTIAL_DROPDOWN_CHANGE_EVENT'
export const GET_LOCATION_TYPES = "GET_LOCATION_TYPES"
export const GET_OWNERS = "GET_OWNERS"
export const GET_PRIMARY_MARKETS = "GET_PRIMARY_MARKETS"
export const GET_TECHNOLOGY_TYPES = "GET_TECHNOLOGY_TYPES"
export const GET_FUEL_CLASSES = "GET_FUEL_CLASSES"
export const GET_TIME_ZONE = "GET_TIME_ZONE"
export const GET_DEFAULT_CREDENTIALDATA = "GET_DEFAULT_CREDENTIALDATA"

function bindTechnologyTypesOnEdit(technologyTypeId, technologyTypes) {
  return technologyTypes.filter(function(technologyType) {return technologyType.id == technologyTypeId;})[0] || technologyTypeId;
}

export function BindInitialValues(currentLocation, assignedLocationMappings, marketDrivendata) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      var locationId = currentLocation.Id;
      let locationObj = currentLocation;
      let technologyTypes = getState().basic.technologyTypes;
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
        technologyType: bindTechnologyTypesOnEdit(locationObj.TechnologyTypeId, technologyTypes),
        secondarytechnologyType: bindTechnologyTypesOnEdit(locationObj.SecondaryTechnologyTypeId, technologyTypes),
        primaryMarket: locationObj.PrimaryMarketId,
        fuelClass: locationObj.FuelClassId,
        owner: locationObj.OwnerOrgId,
        physicalTimezone: locationObj.PhysicalTz,
        ownerShipPercentage: locationObj.OwnershipPct,
      }

      dispatch({
        type: BIND_BASIC_INITIAL_VALUES,
        payload: {
          basicInfo: basicInfo,
          assignedLocationMappings: assignedLocationMappings,
          marketDrivendata: marketDrivendata
        }
      })
      dispatch({
        type: BIND_BASIC_INITIALCREDENTIAL_VALUES,
        payload: {
          assignedLocationMappings: assignedLocationMappings,
          marketDrivendata: marketDrivendata
        }
      })
    })
  }
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
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getMarketDrivenMappings(!!event ? event.id : null).then(function(response) {
        var data = response.data;
        var lcoationId = getState().form.BasicInfoForm.values.locationId || null;
        getOMSLocationwizardData(lcoationId).then(function(oms) {
          var assignedLocationMappings = oms.data.GetOMSLocationWizardDataResult.AssignedLocationMappings;
          var credentialBasicData = PrepareCredentialBasicData(data, assignedLocationMappings)
          dispatch({
            type: PRIMARY_MARKET_CHANGE_EVENT,
            payload: {
              marketDrivenMappings: data,
              assignedLocationMappings: assignedLocationMappings,
              credentialBasicData: credentialBasicData
            }
          });
        });
      });
    })
  }
};

export const ACTION_HANDLERS = {
  [BIND_BASIC_INITIAL_VALUES]: (state, action) => {

    // var locationId=action.payload.currentLocation.Id;
    // let locationObj =action.payload.currentLocation;
    // let assignedLocationMappings = action.payload.assignedLocationMappings;
    // let marketDrivendata = action.payload.marketDrivendata;
    // var basicInfo = {
    //   locationId: locationId,
    //   locationName: locationObj.Name,
    //   timezone: locationObj.Tz,
    //   parentLocation: locationObj.ParentId,
    //   locationType: locationObj.LocationType,
    //   createDate: locationObj.CreateDate,
    //   createUser: locationObj.CreateUser,
    //   updateUser: locationObj.UpdateUser,
    //   isOutageLevel: locationObj.IsOutageLevel,
    //   technologyType: locationObj.TechnologyTypeId,
    //   secondarytechnologyType: locationObj.SecondaryTechnologyTypeId,
    //   primaryMarket: locationObj.PrimaryMarketId,
    //   fuelClass: locationObj.FuelClassId,
    //   owner: locationObj.OwnerOrgId,
    //   physicalTimezone: locationObj.PhysicalTz,
    //   ownerShipPercentage: locationObj.OwnershipPct,
    // }
    // var credentialData = PrepareCredentialBasicData(marketDrivendata, assignedLocationMappings);
    return Object.assign({}, state, {
      BasicInfo: action.payload.basicInfo,
      InitialAssignedLocationMappings: action.payload.assignedLocationMappings,
      MarketDrivenMappings: action.payload.marketDrivendata
    });


  },
  [BIND_BASIC_INITIALCREDENTIAL_VALUES]: (state, action) => {
    var credentialData = PrepareCredentialBasicData(action.payload.marketDrivendata, action.payload.assignedLocationMappings);
    return Object.assign({}, state, {
      CredentialBasicData: credentialData.MarketDrivendata,
      CredentialInitialValues: credentialData.CredentialInitialValues,
    });
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
    return Object.assign({}, state, {
      CredentialBasicData: action.payload.credentialBasicData.MarketDrivendata,
      InitialAssignedLocationMappings: action.payload.assignedLocationMappings,
      MarketDrivenMappings: action.payload.marketDrivenMappings

    })
  },
  [GET_LOCATION_TYPES]: (state, action) => {
    return Object.assign({}, state, {
      locationTypes: action.payload
    })
  },
  [GET_OWNERS]: (state, action) => {
    return Object.assign({}, state, {
      owners: action.payload
    })
  },
  [GET_PRIMARY_MARKETS]: (state, action) => {
    return Object.assign({}, state, {
      primaryMarkets: action.payload
    })
  },
  [GET_DEFAULT_CREDENTIALDATA]: (state, action) => {
    return Object.assign({}, state, {
      CredentialBasicData: action.payload
    })
  },
  [GET_TECHNOLOGY_TYPES]: (state, action) => {
    return Object.assign({}, state, {
      technologyTypes: action.payload
    })
  },
  [GET_FUEL_CLASSES]: (state, action) => {
    return Object.assign({}, state, {
      fuelClasses: action.payload
    })
  },
  [GET_TIME_ZONE]: (state, action) => {
    return Object.assign({}, state, {
      timezones: action.payload
    })
  },
  ['EMPTY_BASIC_CREDENTIAL_INTIAL_VALUES']: (state, action) => {
    return Object.assign({}, state, {
      BasicInfo: {},
      CredentialInitialValues: {}
    })
  },
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}

function PrepareCredentialBasicData(data, assignedLocationMappings) {

  var marketDrivendata = [];
  var credentialInitialValues = {};
  _.each(data, (item) => {
    item.aliasNameDropDownItems = [];
    item.externalSystemLoginDropDownItems = [];
    var aliasNameDropDownItems = [];
    var externalSystemLoginDropDownItems = [];

    _.each(assignedLocationMappings, (wizardDataItem) => {
      if (item.IsDropDown) {

        if (wizardDataItem.ExternalSystemName == item.ExternalSystemName) {
          if (!!wizardDataItem.AliasName) {
            aliasNameDropDownItems.push({
              key: wizardDataItem.AliasName,
              value: wizardDataItem.AliasName,
              item: wizardDataItem
            });
          }
          if (!!wizardDataItem.ExternalSystemLogin) {
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
      getState().basic.locationTypes.length == 0 ?
        basicInfoDropdowns.getLocationTypes().then(function(response) {
          dispatch({
            type: GET_LOCATION_TYPES,
            payload: response.data
          });
        }) : null
    })
  }
}
export function getOwnersService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.owners.length == 0 ?
        basicInfoDropdowns.getOwners().then(function(response) {
          dispatch({
            type: GET_OWNERS,
            payload: response.data
          });
        }) : null
    })
  }
}

export function getPrimaryMarketsService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.primaryMarkets.length == 0 ?
        basicInfoDropdowns.getPrimaryMarkets().then(function(response) {
          dispatch({
            type: GET_PRIMARY_MARKETS,
            payload: response.data
          });
        }) : null
    })
  }
}
export function getDefaultCredentialBasicData() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.CredentialBasicData.length == 0 ?
        getMarketDrivenMappings().then(function(response) {
          dispatch({
            type: GET_DEFAULT_CREDENTIALDATA,
            payload: response.data
          });
        }) : null
    })
  }
}

export function getTechnologyTypesService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.technologyTypes.length == 0 ?
        basicInfoDropdowns.getTechnologyTypes().then(function(response) {
          dispatch({
            type: GET_TECHNOLOGY_TYPES,
            payload: response.data
          });
        }) : null
    })
  }
}
export function getFuelClassesService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.fuelClasses.length == 0 ?
        basicInfoDropdowns.getFuelClasses().then(function(response) {
          dispatch({
            type: GET_FUEL_CLASSES,
            payload: response.data
          });
        }) : null
    })
  }
}
export function getTimezonesService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().basic.timezones.length == 0 ?
        basicInfoDropdowns.getTimezones().then(function(response) {
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
        }) : null
    })
  }
}

const initialState = {
  error: null,
  locationTypes: [], //basicInfoDropdowns.getLocationTypes(),
  owners: [], // basicInfoDropdowns.getOwners(),
  primaryMarkets: [], //basicInfoDropdowns.getPrimaryMarkets(),
  technologyTypes: [], // basicInfoDropdowns.getTechnologyTypes(),
  fuelClasses: [], //basicInfoDropdowns.getFuelClasses(),
  timezones: [], //basicInfoDropdowns.getTimezones(),
  initial: true,
  BasicInfo: {},
  CredentialInitialValues: {},
  CredentialBasicData: [],
  InitialAssignedLocationMappings: [],
  MarketDrivenMappings: []
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}