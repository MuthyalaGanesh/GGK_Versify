import {
  basicInfoDropdowns
} from 'api/locationWizardApi'
import {React, dispatch} from 'react'

export const ON_PARENT_LOCATION_SELECT = 'ON_PARENT_LOCATION_SELECT'
export const BIND_INITIAL_VALUES = 'BIND_INITIAL_VALUES'

export function BindInitialValues(locationId) {
  return {
    type: BIND_INITIAL_VALUES,
    payload: locationId
  }; 
};


export const ACTION_HANDLERS = {
  [BIND_INITIAL_VALUES]: (state, action) => {
    console.log("BIND_INITIAL_VALUES:", action.payload);
    return Object.assign({}, state, {
      BasicInfo:{
      locationId:action.payload,
      locationName : "TEST LOCATION"
      }
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
  initial:true,
  BasicInfo:{}
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}