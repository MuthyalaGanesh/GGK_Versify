import {getAllUOMValues, getUnitCharacteristics, getSelectedUnitCharacteristics} from 'api/locationWizardApi'
import moment from 'moment';

export const TOGGLE_ADD_MODAL = 'TOGGLE_ADD_MODAL'
export const EDIT_TOGGLE = 'EDIT_TOGGLE'
export const DELETE_MODAL = 'DELETE_MODAL'
export const DELETE_UNIT_CHARACTERISTIC = 'DELETE_UNIT_CHARACTERISTIC'
export const UPDATE_ROW = 'UPDATE_ROW'
export const ADD_NEW_ROW = 'ADD_NEW_ROW'
export const CHARACTERISTIC_SELECTED = "CHARACTERISTIC_SELECTED"
export const INSERT_ROW = "INSERT_ROW"

export function getUOMValueByID(measureId) {
  var UOM = "";
  getAllUOMValues().map(u => {
    if (u.id == measureId) {
      UOM = u.name;
    }
  })
  return UOM;
}
export function updateRow(event) {
  return (dispatch, getState) => {
    // console.log(getState().form.UnitCharacteristicsForm)

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
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "UnitCharacteristicsForm" },
        payload: ""
      })
    })
  }
}

export function characteristicNameSelected(event) {
  if (event.target.name == 'charateristicName') {
    return (dispatch, getState) => {
      return new Promise((resolve) => {
        dispatch({
          type: CHARACTERISTIC_SELECTED,
          payload: getState().form.UnitCharacteristicsForm.values.charateristicName
        })
      })
    }
  }
}

export function togglingAddModal() {
  return (dispatch, getState) => {

    return new Promise((resolve) => {
      dispatch({
        type: TOGGLE_ADD_MODAL,
        payload: false
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "UnitCharacteristicsForm" },
        payload: ""
      })
    })
  }
}

export function makeEditable(id) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: EDIT_TOGGLE,
        payload: id
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "UnitCharacteristicsForm" },
        payload: ""
      })
    })
  }
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

  //opening Adding new unitCharacteristic modal
  [TOGGLE_ADD_MODAL]: (state, action) => {
    var newState = Object.assign({}, state, { showModal: !state.showModal });
    newState.UOMLabel = "",
      newState.descriptionLabel = "",
      newState.displayNameLabel = ""
    newState.unSelectedUnitCharacteristics = [];
    newState.unitCharacteristics.map((allUC) => {
      var valuePresence = 1;

      newState.selectedunitCharacteristics.map((selUC) => {
        if (selUC.id == allUC.id) {
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
      var newSelectedUC = [];
      state.selectedunitCharacteristics.map((suc, i) => {
        if (i != state.deletingUnitIndex) {
          newSelectedUC.push(suc)
        }
      })
    }
    return Object.assign({}, state, { showDeleteModal: !state.showDeleteModal, selectedunitCharacteristics: newSelectedUC })
  },
  //update edited row
  [UPDATE_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { showEditModal: !state.showEditModal })
    if (action.payload) {
      newState.selectedunitCharacteristics.map((uc) => {
        if (uc.name == state.editableUnitCharacter.name) {
          uc.Value = (action.payload.fields && action.payload.fields.ucvalue && action.payload.fields.ucvalue.touched)
            ? action.payload.values.ucvalue : state.editableUnitCharacter.Value;
          uc.EffectiveStartDate = (action.payload.fields && action.payload.fields.effectiveStartDate && action.payload.fields.effectiveStartDate.touched)
            ? action.payload.values.effectiveStartDate : state.editableUnitCharacter.EffectiveStartDate;
          uc.EffectiveEndDate = (action.payload.fields && action.payload.fields.effectiveEndDate && action.payload.fields.effectiveEndDate.touched)
            ? action.payload.values.effectiveEndDate : state.editableUnitCharacter.EffectiveEndDate;

          if (action.payload.fields && action.payload.fields.editableData) {
            action.payload.values.editableData.map(ed => {
              var newRow = uc;
              newRow.EffectiveEndDate = ed.effectiveEndDate
              newRow.EffectiveStartDate = ed.effectiveStartDate
              newRow.Value = ed.ucvalue
              state.selectedunitCharacteristics.push(newRow);
            })
          }
        }

      })
    }
    newState.editableUnitCharacter = {}

    return newState;
  },
  //helps in prepopulating unit characteristic values after changing unit character
  [CHARACTERISTIC_SELECTED]: (state, action) => {
    var newState = Object.assign({}, state)
    if (action.payload) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.id == parseInt(action.payload)) {
          newState.UOMLabel = getUOMValueByID(uc.defaultUnitOfMeasureId),
            newState.descriptionLabel = uc.description,
            newState.displayNameLabel = uc.display
        }
      })
    }
    return newState
  },
  [INSERT_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { showModal: !state.showModal })
    if (action.payload) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.id == parseInt(action.payload.values.charateristicName)) {
          uc.EffectiveEndDate = action.payload.values.effectiveEndDate
          uc.EffectiveStartDate = action.payload.values.effectiveStartDate
          uc.Value = action.payload.values.ucvalue
          uc.UOM = newState.UOMLabel
          newState.selectedunitCharacteristics.push(uc)
        }
      })
    }
    return newState
  }
}
const initialState = {
  error: "",
  unitCharacteristics: getUnitCharacteristics().sort(function(a, b){ 
	return a.id-b.id
}),
  allUOMvalues: getAllUOMValues(),
  selectedunitCharacteristics: [],
  unSelectedUnitCharacteristics: [],
  showModal: false,
  showDeleteModal: false,
  deletingUnitIndex: 0,
  editableUnitCharacter: {},
  showEditModal: false,
  startDate: moment(),
  UOMLabel: "",
  descriptionLabel: "",
  displayNameLabel: ""
};

export default function unitCharacteristicsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}