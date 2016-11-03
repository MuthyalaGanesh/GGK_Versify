import {getUnitCharacteristics} from 'api/locationWizardApi'
import moment from 'moment';

export const BIND_UNIT_CHARACTERISTICS = 'BIND_UNIT_CHARACTERISTICS'
export const TOGGLE_ADD_MODAL = 'TOGGLE_ADD_MODAL'
export const EDIT_TOGGLE = 'EDIT_TOGGLE'
export const DELETE_MODAL = 'DELETE_MODAL'
export const DELETE_UNIT_CHARACTERISTIC = 'DELETE_UNIT_CHARACTERISTIC'
export const UPDATE_ROW = 'UPDATE_ROW'
export const ADD_NEW_ROW = 'ADD_NEW_ROW'
export const CHARACTERISTIC_SELECTED = "CHARACTERISTIC_SELECTED"

export function updateRow(event) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({type:UPDATE_ROW,
                payload:getState().form.UnitCharacteristicsForm})
          console.log(getState().form.UnitCharacteristicsForm)
          debugger;
    })
  }
}

export function AddUnitCharateristic(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    console.log("state-", getState().form)
    return new Promise((resolve) => {
      console.log("state pro-", getState().form)
    })
  }
}


export function characteristicNameSelected() {
  return (dispatch, getState) => {
    return {
      type: CHARACTERISTIC_SELECTED,
      payload: getState().form
    }
  }
}

export function bindUnitCharateristics() {
  return {
    type: BIND_UNIT_CHARACTERISTICS,
    payload: getUnitCharacteristics()
  };
};

export function togglingAddModal() {
  return {
    type: TOGGLE_ADD_MODAL,
    payload: false
  };
};
export function makeEditable(index) {
  return {
    type: EDIT_TOGGLE,
    payload: index
  };
};
export function deleteConfirmation(index) {
  return {
    type: DELETE_MODAL,
    payload: index
  }
};

export function DeleteUnitCharateristic() {
  return {
    type: DELETE_UNIT_CHARACTERISTIC,
    payload: true
  };
};

export const ACTION_HANDLERS = {
  [BIND_UNIT_CHARACTERISTICS]: (state, action) => {
    return Object.assign({}, state, { unitCharacteristics: action.payload })
  },
  [TOGGLE_ADD_MODAL]: (state, action) => {
    return Object.assign({}, state, { showModal: !state.showModal })
  },
  [EDIT_TOGGLE]: (state, action) => {
    if (action.payload != null && state.unitCharacteristics) {
      state.editableUnitCharacter = state.unitCharacteristics[parseInt(action.payload)]
    }
    return Object.assign({}, state, { showEditModal: !state.showEditModal })
  },
  [DELETE_MODAL]: (state, action) => {
    if (action.payload != null) {
      state.deletingUnitIndex = action.payload;
    }
    return Object.assign({}, state, { showDeleteModal: !state.showDeleteModal })
  },
  [DELETE_UNIT_CHARACTERISTIC]: (state, action) => {
    if (action.payload) {
      var newState = Object.assign({}, state, { showDeleteModal: !state.showDeleteModal })
      newState.unitCharacteristics.splice(parseInt(state.deletingUnitIndex), 1)
    }
    return newState
  },
  [UPDATE_ROW]: (state, action) => {
    if (action.payload) {
      var newState=Object.assign({}, state, { showEditModal: !state.showEditModal })
      newState.unitCharacteristics.map((uc) => {
        if (uc.Name == action.payload.values.Name) {
          uc.Value = action.payload.values.ucvalue;
          uc.EffectiveStartDate = action.payload.values.effectiveStartDate;
          uc.EffectiveEndDate = action.payload.values.effectiveEndDate;
        }
      })
    }
    return newState;
  },
  [CHARACTERISTIC_SELECTED]: (state, action) => {
    if (action.payload) {
      state.unitCharacteristics.map((uc) => function () {
        if (uc.Name == action.payload.values.Name) {
          state.UCMLabel = uc.UCM,
            state.descriptionLabel = uc.Description,
            state.displayNameLabel = uc.DisplayName
        }
      })
    }
    return Object.assign({}, state, {})
  }
}
const initialState = {
  error: "error",
  unitCharacteristics: [],
  showModal: false,
  showDeleteModal: false,
  deletingUnitIndex: 0,
  editableUnitCharacter: {},
  showEditModal: false,
  startDate: moment(),
  UCMLabel: "",
  descriptionLabel: "",
  displayNameLabel: ""
};

export default function unitCharacteristicsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}