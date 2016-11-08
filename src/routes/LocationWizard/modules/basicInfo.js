import {
  basicInfoDropdowns
} from 'api/locationWizardApi'
import {React, dispatch} from 'react'

export const ON_PARENT_LOCATION_SELECT = 'ON_PARENT_LOCATION_SELECT'
export const BIND_LOCATIONS = 'BIND_LOCATIONS'

export function BindLocations() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
         type: BIND_LOCATIONS, 
         payload: {
           locationState:getState().location,
           }
          });
    });
  }  
};

export function onParentLoCationSelect(locationId) {
   console.log("onParentLoCationSelect",locationId)
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
         type: ON_PARENT_LOCATION_SELECT, 
         payload: {
           BasicInfoForm :getState().form.BasicInfoForm,
           locationId:locationId}
          });
    });
  }  
};

export const ACTION_HANDLERS = {
  [ON_PARENT_LOCATION_SELECT]:(state, action) => {
   action.payload.BasicInfoForm.values.parentLocation = action.payload.locationId
   return Object.assign({}, state);;
  },
  [BIND_LOCATIONS]: (state, action) => {
    return Object.assign({}, state, {
     locations:action.payload.locationState.allLocations,
      parentLocations:changeObjectTypeOfLocations(action.payload.locationState.allLocations)
    })
  },
  ['ERROR']: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload
    })
  }
}

function changeObjectTypeOfLocations(allLocations){
    var changedLocationsObject =[];
    allLocations.forEach(function(item) {        
     changedLocationsObject.push({
         key: item.Id,
         value: item.Id,
         label: item.Name,
         disabled: !item.IsOutageLevel || false,
         children: changeObjectTypeOfLocations(item.Children)
        });
    });
    return changedLocationsObject;
}
const allLocations = basicInfoDropdowns.getLocations;
const initialState = {
  error: null,
  locations:allLocations,
  parentLocations:changeObjectTypeOfLocations(allLocations),
  locationTypes: basicInfoDropdowns.getLocationTypes,
  owners: basicInfoDropdowns.getOwners,
  primaryMarkets: basicInfoDropdowns.getPrimaryMarkets,
  technologyTypes: basicInfoDropdowns.getTechnologyTypes,
  fuelClasses: basicInfoDropdowns.getFuelClasses,
  timezones: basicInfoDropdowns.getTimezones,
  initial:true
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}