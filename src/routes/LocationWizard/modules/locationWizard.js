import {getLocationTypes} from '../../../api/locationWizardApi'


export const SAVE_COMPLETE_LOCATIONWIZARD = 'SAVE_COMPLETE_LOCATIONWIZARD';
export const BIND_LOCATION_TYPES = 'BIND_LOCATION_TYPES'
export function saveCompleteLocationWizard(event) {
  console.log("locationWizard:", event);
  return {
    type: SAVE_COMPLETE_LOCATIONWIZARD,
    payload: event
  };
};
export function bindLocationTypes() {

  return {
    type: BIND_LOCATION_TYPES,
    payload: getLocationTypes()
  };

};



export const ACTION_HANDLERS = {
  [SAVE_COMPLETE_LOCATIONWIZARD]: (state, action) => {
    console.log("locationWizard AH:", action.payload);
  return  Object.assign({},state)
  },
  [BIND_LOCATION_TYPES]: (state, action) => {
    return  Object.assign({},state,{locationTypes:action.payload})
  }
}
const initialState = {
  error: null,
  locationTypes:{}
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}