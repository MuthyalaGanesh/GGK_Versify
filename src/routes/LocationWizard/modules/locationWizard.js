import {
  basicInfoDropdowns
} from 'api/locationWizardApi'


export const LOCATIONS_MENUITEM_CLICK = 'LOCATIONS_MENUITEM_CLICK';
export const TOGGLE_LEFTMENU_CLICK = 'TOGGLE_LEFTMENU_CLICK';

export const LOCATIONS_MENUITEM_DROPDOWN_CLICK = 'LOCATIONS_MENUITEM_DROPDOWN_CLICK';

export function toggleMenuClick(event) {
  return {
    type: TOGGLE_LEFTMENU_CLICK,
    payload: event
  };
}

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
      getState().form.BasicInfoForm.hasOwnProperty('values') ? Object.keys(getState().form.BasicInfoForm.values).length < 11 ? dispatch({
          type: 'ERROR',
          payload: 1
        }) : console.log(Object.keys(getState().form.BasicInfoForm.values).length)
        /*(getState().form.BasicInfoForm.values.technologyType.name ==  getState().form.BasicInfoForm.values.secondarytechnologyType.name) 
                  ? dispatch({
                      type: 'ERROR',
                      payload: 1
                  }) : null*/
        : null
    })
  }
}

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}

export const ACTION_HANDLERS = {
  [LOCATIONS_MENUITEM_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
  [LOCATIONS_MENUITEM_DROPDOWN_CLICK]: (state, action) => {
    return Object.assign({}, state)
  },
  [TOGGLE_LEFTMENU_CLICK]: (state, action) => {
    //Handling adding claases  sidebar-open,sidebar-collapse based on screen resolution
    var bodyClassList = toArray(document.getElementsByTagName('body')[0].classList);
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth;
    if (x <= 768) {
      if (bodyClassList.indexOf('sidebar-open') > 0) {
        document.getElementsByTagName('body')[0].className = "skin-qc fixed sidebar-mini";
      } else {
        document.getElementsByTagName('body')[0].className += " sidebar-open"
      }
    } else {
      if (bodyClassList.indexOf('sidebar-collapse') > 0) {
        document.getElementsByTagName('body')[0].className = "skin-qc fixed sidebar-mini";
      } else {
        document.getElementsByTagName('body')[0].className += " sidebar-collapse"
      }
    }
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