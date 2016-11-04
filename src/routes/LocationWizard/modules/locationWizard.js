// locationwizard actionhandlers is it incomplete?









import {
  basicInfoDropdowns
} from 'api/locationWizardApi'


export const SAVE_COMPLETE_LOCATIONWIZARD = 'SAVE_COMPLETE_LOCATIONWIZARD';
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
  event.target.parentNode.className = 'treeview active';
  if (event.target.parentElement.childNodes[1] != undefined) {
     event.target.parentElement.childNodes[1].className = "treeview-menu menu open";
  }
  if (event.target.parentElement.childNodes[1].childNodes[0] != undefined) {
    event.target.parentElement.childNodes[1].childNodes[0].className = 'active'
  }
  return {
    type: LOCATIONS_MENUITEM_DROPDOWN_CLICK,
    payload: event
  };
};

export function saveCompleteLocationWizard(event) {
  console.log("locationWizard:", event);
  return {
    type: SAVE_COMPLETE_LOCATIONWIZARD,
    payload: event
  };
};

export const ACTION_HANDLERS = {
  [SAVE_COMPLETE_LOCATIONWIZARD]: (state, action) => {
    console.log("locationWizard AH:", action.payload);
    return Object.assign({}, state)
  },
  [LOCATIONS_MENUITEM_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
  [LOCATIONS_MENUITEM_DROPDOWN_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
}
const initialState = {
  error: null,
  allLocations: basicInfoDropdowns().getLocations()
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}