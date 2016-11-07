import {
  basicInfoDropdowns
} from 'api/locationWizardApi'


export const LOCATIONS_MENUITEM_CLICK = 'LOCATIONS_MENUITEM_CLICK';
export const LOCATIONS_MENUITEM_DROPDOWN_CLICK = 'LOCATIONS_MENUITEM_DROPDOWN_CLICK';


export function onLocationItemClick(event) {
  console.log("LOCATIONS_MENUITEM_CLICK:", event);

  return {
    type: LOCATIONS_MENUITEM_CLICK,
    payload: event
  };
};

export function leftMenuDropdownClickEvent(id, event) {
  console.log("LOCATIONS_MENUITEM_DROPDOWN_CLICK:", id);  
  return {
    type: LOCATIONS_MENUITEM_DROPDOWN_CLICK,
    payload: event
  };
};
export function saveCompleteLocationWizard() {
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
  [LOCATIONS_MENUITEM_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
  [LOCATIONS_MENUITEM_DROPDOWN_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
}
const initialState = {
  error: null,
  allLocations: basicInfoDropdowns.getLocations
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}