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


export function BindInitialValues(locationId) {
  return {
    type: BIND_INITIAL_VALUES,
    payload: locationId
  };
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
          var dt = _(wizardDataItem).find(function(x) {
            return x => x.ExternalSystemName === item.ExternalSystemName && x.Field === item.Field
          });
          if (!!dt && dt != '') {
            aliasNameDropDownItems.push({
              key: wizardDataItem.AliasName,
              value: wizardDataItem.AliasName
            });
            externalSystemLoginDropDownItems.push({
              key: wizardDataItem.ExternalSystemLogin,
              value: wizardDataItem.ExternalSystemLogin
            });
          }
        }
      })
      item.aliasNameDropDownItems = _.uniqBy(aliasNameDropDownItems, 'key');
      item.externalSystemLoginDropDownItems = _.uniqBy(externalSystemLoginDropDownItems, 'key');
      marketDrivendata.push(item);
    });

    return Object.assign({}, state, {
      CredetialBasicData: marketDrivendata
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
  CredetialBasicData: getMarketDrivenMappings()
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}