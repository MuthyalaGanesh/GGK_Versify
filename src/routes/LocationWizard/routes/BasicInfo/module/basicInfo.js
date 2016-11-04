import {
  basicInfoDropdowns
} from 'api/locationWizardApi'

export const BIND_LOCATION_TYPES = 'BIND_LOCATION_TYPES'
export function bindBasicInfoDropdownValues() {
  return {
    type: BIND_LOCATION_TYPES,
    payload: {
      locationTypes: basicInfoDropdowns().getLocationTypes()
    }
  };

};

export function bindLocationTypes() {
  return (dispatch, getState) => {
    console.log("state-", getState().form)
    return new Promise((resolve) => {
      basicInfoDropdowns().getLocationTypes().then((response) => {        
           console.log("Location Types: ", response.data);
       })
    })
  }
};


export function test() {
  return (dispatch, getState) => {
    console.log("state-", getState().form)
    return new Promise((resolve) => {
      console.log("state pro-", getState().form)
      getState().form.BasicInfoForm.hasOwnProperty('values') 
      ? Object.keys(getState().form.BasicInfoForm.values).length < 11 
        ? dispatch({
        type: 'ERROR',
        payload: 1
        }) 
        : console.log(Object.keys(getState().form.BasicInfoForm.values).length)/*(getState().form.BasicInfoForm.values.technologyType.name ==  getState().form.BasicInfoForm.values.secondarytechnologyType.name) 
          ? dispatch({
              type: 'ERROR',
              payload: 1
          }) : null*/
      : null
    })
  }
}
export const ACTION_HANDLERS = {
  [BIND_LOCATION_TYPES]: (state, action) => {
    return Object.assign({}, state, {
      locationTypes: action.payload
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
  locationTypes: basicInfoDropdowns().getLocationTypes(),
  primaryMarkets: basicInfoDropdowns().getPrimaryMarkets(),
  locations: basicInfoDropdowns().getLocations(),
  parentLocations: basicInfoDropdowns().getParentLocations(),
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