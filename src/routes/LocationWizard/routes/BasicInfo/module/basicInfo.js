import {
  basicInfoDropdowns
} from 'api/locationWizardApi'
import {React, dispatch} from 'react'

export const ON_PARENT_LOCATION_SELECT = 'ON_PARENT_LOCATION_SELECT'
export function onParentLoCationSelect(locationId) {
   console.log("onParentLoCationSelect",locationId)
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
         type: ON_PARENT_LOCATION_SELECT, 
         payload: {
           basicInfo:getState().form.BasicInfoForm,
           locationId:locationId
           }
          });
    });
  }  
};

export const ACTION_HANDLERS = {
  [ON_PARENT_LOCATION_SELECT]:(state, action) => {
   console.log("ON_PARENT_LOAD_DATA")
   return Object.assign({}, state, {
      parentLocation: action.payload.locationId
    });
  },
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}
const initialState = {
  error: null,
  locationTypes: basicInfoDropdowns().getLocationTypes(),
  primaryMarkets: basicInfoDropdowns().getPrimaryMarkets(),
  locations: basicInfoDropdowns().getLocations(),
  owners: basicInfoDropdowns().getOwners(),
  technologyTypes: basicInfoDropdowns().getTechnologyTypes(),
  fuelClasses: basicInfoDropdowns().getFuelClasses(),
  timezones: basicInfoDropdowns().getTimezones(),
  initial:true
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}