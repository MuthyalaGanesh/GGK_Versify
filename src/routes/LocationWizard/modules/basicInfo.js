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
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}

function PrepareCredentialBasicData(marketId, locationId = null) {
  //get MarketDrivenMappings from API based on marketType ID
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


const initialState = {
  error: null,
  locationTypes: basicInfoDropdowns.getLocationTypes(),
  owners: basicInfoDropdowns.getOwners(),
  primaryMarkets: basicInfoDropdowns.getPrimaryMarkets(),
  technologyTypes: basicInfoDropdowns.getTechnologyTypes(),
  fuelClasses: basicInfoDropdowns.getFuelClasses(),
  timezones: basicInfoDropdowns.getTimezones(),
  initial: true,
  BasicInfo: {},
  CredentialInitialValues: {},
  CredentialBasicData: getMarketDrivenMappings()
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}