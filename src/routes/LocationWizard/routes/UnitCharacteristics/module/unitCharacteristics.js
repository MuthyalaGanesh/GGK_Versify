import {getUnitCharacteristics, getSelectedUnitCharacteristics} from 'api/locationWizardApi'
import moment from 'moment';

export const BIND_UNIT_CHARACTERISTICS = 'BIND_UNIT_CHARACTERISTICS'
export const TOGGLE_ADD_MODAL = 'TOGGLE_ADD_MODAL'
export const EDIT_TOGGLE = 'EDIT_TOGGLE'
export const DELETE_MODAL = 'DELETE_MODAL'
export const DELETE_UNIT_CHARACTERISTIC = 'DELETE_UNIT_CHARACTERISTIC'
export const UPDATE_ROW = 'UPDATE_ROW'
export const ADD_NEW_ROW = 'ADD_NEW_ROW'
export const CHARACTERISTIC_SELECTED = "CHARACTERISTIC_SELECTED"
export const INSERT_ROW = "INSERT_ROW"

export function updateRow(event) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: UPDATE_ROW,
        payload: getState().form.UnitCharacteristicsForm
      })
    })
  }
}

export function AddUnitCharateristic() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: INSERT_ROW, payload: getState().form.UnitCharacteristicsForm })
    })
  }
}

export function characteristicNameSelected(event) {
  if (event.target.name == 'charateristicName') {
    return (dispatch, getState) => {
      return new Promise((resolve) => {
        dispatch({
          type: CHARACTERISTIC_SELECTED,
          payload: getState().form.UnitCharacteristicsForm
        })
      })
    }
  }
}

export function bindUnitCharateristics() {
  return {
    type: BIND_UNIT_CHARACTERISTICS,
    payload: getSelectedUnitCharacteristics()
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
  //binding selected unit charateristics
  [BIND_UNIT_CHARACTERISTICS]: (state, action) => {
    return Object.assign({}, state, { selectedunitCharacteristics: action.payload })
  },
  //opening Adding new unitCharacteristic modal
  [TOGGLE_ADD_MODAL]: (state, action) => {
    var newState = Object.assign({}, state, { showModal: !state.showModal });
    newState.unSelectedUnitCharacteristics = [];

    newState.unitCharacteristics.map((allUC) => {
      var valuePresence = 1;
      newState.selectedunitCharacteristics.map((selUC) => {
        if (selUC.Name == allUC.Name) {
          valuePresence++;
        }
      })
      if (valuePresence == 1) {
        newState.unSelectedUnitCharacteristics.push(allUC);
      }
    })
    return newState;
  },
  //making edit modal to open
  [EDIT_TOGGLE]: (state, action) => {
    if (action.payload != null && !isNaN(action.payload) && state.unitCharacteristics) {
      state.editableUnitCharacter = state.selectedunitCharacteristics[action.payload]
    }
    return Object.assign({}, state, { showEditModal: !state.showEditModal })
  },
  //opening delete modal
  [DELETE_MODAL]: (state, action) => {
    if (action.payload != null) {
      state.deletingUnitIndex = action.payload;
    }
    return Object.assign({}, state, { showDeleteModal: !state.showDeleteModal })
  },
  //deleting object after confirmation
  [DELETE_UNIT_CHARACTERISTIC]: (state, action) => {
    if (action.payload) {
      var newState = Object.assign({}, state, { showDeleteModal: !state.showDeleteModal })
      newState.selectedunitCharacteristics.splice(parseInt(state.deletingUnitIndex), 1)
    }
    return newState
  },
  //update edited row
  [UPDATE_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { showEditModal: !state.showEditModal })
    newState.editableUnitCharacter = {}
    if (action.payload) {
      newState.selectedunitCharacteristics.map((uc) => {
        if (uc.Name == state.editableUnitCharacter.Name) {
          uc.Value = action.payload.values.ucvalue;
          uc.EffectiveStartDate = action.payload.values.effectiveStartDate;
          uc.EffectiveEndDate = action.payload.values.effectiveEndDate;
        }
      })
    }
    return newState;
  },
  //helps in prepopulating unit characteristic values after changing unit character
  [CHARACTERISTIC_SELECTED]: (state, action) => {
    var newState = Object.assign({}, state)
    if (action.payload) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.Name == action.payload.values.charateristicName) {
          newState.UCMLabel = uc.UCM,
            newState.descriptionLabel = uc.Description,
            newState.displayNameLabel = uc.DisplayName
        }
      })
    }
    return newState
  },
  [INSERT_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { showModal: !state.showModal })
    if (action.payload) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.Name == action.payload.values.charateristicName) {
          uc.EffectiveEndDate = action.payload.values.effectiveEndDate
          uc.EffectiveStartDate = action.payload.values.effectiveStartDate
          uc.Value = action.payload.values.ucvalue
          newState.selectedunitCharacteristics.push(uc)
        }
      })
    }
    return newState
  }
}
const initialState = {
  error: "",
  unitCharacteristics: getUnitCharacteristics(),
  selectedunitCharacteristics: [],
  unSelectedUnitCharacteristics: [],
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