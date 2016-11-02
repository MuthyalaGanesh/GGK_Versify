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
export function test() {
  return (dispatch, getState) => {
    console.log("state-", getState().form)
    return new Promise((resolve) => {
      console.log("state pro-", getState().form)
    })
  }
}
export const ACTION_HANDLERS = {
  [BIND_LOCATION_TYPES]: (state, action) => {
    return Object.assign({}, state, {
      locationTypes: action.payload
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
  timezones: basicInfoDropdowns().getTimezones()

};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log("basicInfoDropdowns- ", basicInfoDropdowns);

  return handler ? handler(state, action) : state;
}