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
var currentLocation = null;

function findLocation(allLocations, locationId) {
  _.each(allLocations, (item) => {
    if (currentLocation != null) {
      return false;
    }
    if (item.Id == locationId) {
      if (currentLocation == null) {
        currentLocation = item;
        return false;
      }
    } else {
      findLocation(item.Children, locationId)
    }
  });
}

export const ACTION_HANDLERS = {
  [BIND_INITIAL_VALUES]: (state, action) => {
    var allLocationdata = basicInfoDropdowns.getLocations;
    findLocation(allLocationdata, action.payload);
    var locationObj = currentLocation;
    if (!!locationObj) {
      currentLocation = null;
      var basicInfo = {
        locationId: action.payload,
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
      var marketDrivendata = PrepareCredentialBasicData(locationObj.PrimaryMarketId);     
      var newState = Object.assign({}, state, {
        BasicInfo: basicInfo,
        CredentialBasicData: marketDrivendata
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
    var marketDrivendata = PrepareCredentialBasicData(!!action.payload ? action.payload.id : null)
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

function PrepareCredentialBasicData(marketId) {
  //get MarketDrivenMappings from API based on marketType ID
  var data = getMarketDrivenMappings(marketId);
  var omsLocationwizardData = getOMSLocationwizardData(marketId);
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
            item: wizardDataItem
          });
          externalSystemLoginDropDownItems.push({
            key: wizardDataItem.ExternalSystemLogin,
            value: wizardDataItem.ExternalSystemLogin,
            item: wizardDataItem
          });
        }
      }
    })
    item.aliasNameDropDownItems = _.uniqBy(aliasNameDropDownItems, 'key');
    item.externalSystemLoginDropDownItems = _.uniqBy(externalSystemLoginDropDownItems, 'key');
    marketDrivendata.push(item);
  });
  return marketDrivendata;
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
  CredentialInitialValues:{},
  CredentialBasicData: getMarketDrivenMappings()
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}