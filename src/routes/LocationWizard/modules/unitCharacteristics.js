import {getAllUOMValues, getUnitCharacteristics, getDefaultUnitCharacteristics} from 'api/locationWizardApi'
import moment from 'moment';

export const DELETE_MODAL = 'DELETE_MODAL'
export const DELETE_UNIT_CHARACTERISTIC = 'DELETE_UNIT_CHARACTERISTIC'
export const UPDATE_ROW = 'UPDATE_ROW'
export const ADD_NEW_ROW = 'ADD_NEW_ROW'
export const CHARACTERISTIC_SELECTED = "CHARACTERISTIC_SELECTED"
export const INSERT_ROW = "INSERT_ROW"
export const REMOVE_EDIT_ATTRIBUTE = "REMOVE_EDIT_ATTRIBUTE"
export const TOGGLE_MODAL = "TOGGLE_MODAL"

export function ToggleAddEditModal(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: TOGGLE_MODAL, payload: index })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "UnitCharacteristicsForm" },
        payload: ""
      })
    })
  }
}

//manipulating UOM value on the Unit Measure id basis
export function getUOMValueByID(measureId) {
  var UOM = "";
  getAllUOMValues().map(u => {
    if (u.id == measureId) {
      UOM = u.name;
    }
  })
  return UOM;
}
//remove editable attribute 
export function removeEditableAttribute(index) {
  return {
    type: REMOVE_EDIT_ATTRIBUTE,
    payload: index
  }
}
//updating edited row
export function updateRow(event) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: UPDATE_ROW,
        payload: getState().form.UnitCharacteristicsForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "UnitCharacteristicsForm" },
        payload: ""
      })
    })
  }
}
//Adding new unit characteristic
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
//helps in prepopulating Unit characteristic details on the selection of charateristicName
export function characteristicNameSelected() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CHARACTERISTIC_SELECTED,
        payload: getState().form.UnitCharacteristicsForm &&
          getState().form.UnitCharacteristicsForm.values ?
          getState().form.UnitCharacteristicsForm.values.charateristicName : null
      })
    })
  }
}

//confirming delete unitCharacteristic(delete modal)
export function deleteConfirmation(index) {
  return {
    type: DELETE_MODAL,
    payload: index
  }
};
//deleting unit charateristic
export function DeleteUnitCharateristic() {
  return {
    type: DELETE_UNIT_CHARACTERISTIC,
    payload: true
  };
};

export const ACTION_HANDLERS = {
  [TOGGLE_MODAL]: (state, action) => {
    if (action.payload != null) {
      if (!isNaN(action.payload)) {
        if (action.payload == -1) {
          var newState = Object.assign({}, state, { showModal: !state.showModal, isEditable: true, editableUnitCharacter: null })
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
              allUC.isDeletable = true;
              newState.unSelectedUnitCharacteristics.push(allUC);
            }
          })
          return newState;
        }
        else {
          var editIndex = 0
          if (action.payload != null && !isNaN(action.payload) && state.selectedunitCharacteristics) {
            state.editableUnitCharacter = state.selectedunitCharacteristics[action.payload]
            state.editableIndex = action.payload;
          }
          return Object.assign({}, state, { showModal: !state.showModal, isEditable: false })
        }
      }
      else {
        return Object.assign({}, state, { showModal: !state.showModal })
      }
    }
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
    var newState = Object.assign({}, state, { showModal: !state.showModal })

    if (action.payload) {
      newState.selectedunitCharacteristics.map((uc, index) => {

        if (index == state.editableIndex) {
          newState.selectedunitCharacteristics[index] = state.editableUnitCharacter;
          var finalAttributes = []

          for (var index = 0; index < state.editableUnitCharacter.editableAttributes.length; index++) {
            var initialAttribute = {
              Value: (action.payload.values && action.payload.values.ucvalue && action.payload.values.ucvalue[index])
                ? action.payload.values.ucvalue[index] : state.editableUnitCharacter.editableAttributes[index].Value,
              EffectiveStartDate: (action.payload.values && action.payload.values.effectiveStartDate && action.payload.values.effectiveStartDate[index])
                ? action.payload.values.effectiveStartDate[index] : state.editableUnitCharacter.editableAttributes[index].EffectiveStartDate,
              EffectiveEndDate: (action.payload.values && action.payload.values.effectiveEndDate && action.payload.values.effectiveEndDate[index])
                ? action.payload.values.effectiveEndDate[index] : state.editableUnitCharacter.editableAttributes[index].EffectiveEndDate
            }
            finalAttributes.push(initialAttribute)
          }
          if (action.payload.values && action.payload.values.editableData) {
            action.payload.values.editableData.map((ed, i) => {

              var newEditableAttributes = {
                EffectiveEndDate: ed.effectiveEndDate,
                EffectiveStartDate: ed.effectiveStartDate,
                Value: ed.ucvalue
              }
              finalAttributes.push(newEditableAttributes);
            })
          }
          uc.editableAttributes = [];
          uc.editableAttributes = finalAttributes;
        }

      })

    }
    return Object.assign({}, newState, { editableUnitCharacter: {} });
  },
  //helps in prepopulating unit characteristic values after changing unit character
  [CHARACTERISTIC_SELECTED]: (state, action) => {
    var newState = Object.assign({}, state)
    if (action.payload != null && action.payload != undefined) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.id == parseInt(action.payload.id)) {
          if (!state.editableUnitCharacter) {
            newState.UOMLabel = getUOMValueByID(uc.defaultUnitOfMeasureId)
            newState.descriptionLabel = uc.description
            newState.displayNameLabel = uc.display
          }
          else {
            var attributes = newState.editableUnitCharacter.editableAttributes;
            newState.editableUnitCharacter = uc;
            newState.editableUnitCharacter.editableAttributes = attributes;
          }

        }
      })

    }
    return newState
  },
  [INSERT_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { showModal: !state.showModal })
    if (action.payload && action.payload.values.charateristicName) {
      newState.unitCharacteristics.map((uc) => {
        if (uc.id == parseInt(action.payload.values.charateristicName.id)) {
          uc.editableAttributes = [];
          uc.editableAttributes.push({
            EffectiveEndDate: action.payload.values && action.payload.values.effectiveEndDate ? action.payload.values.effectiveEndDate[0] : null,
            EffectiveStartDate: action.payload.values && action.payload.values.effectiveStartDate ? action.payload.values.effectiveStartDate[0] : null,
            Value: action.payload.values && action.payload.values.ucvalue ? action.payload.values.ucvalue[0] : null
          });
          if (action.payload.values && action.payload.values.editableData) {
            action.payload.values.editableData.map((ed, i) => {

              var newEditableAttributes = {
                EffectiveEndDate: ed.effectiveEndDate,
                EffectiveStartDate: ed.effectiveStartDate,
                Value: ed.ucvalue
              }
              uc.editableAttributes.push(newEditableAttributes);
            })
          }
          uc.UOM = newState.UOMLabel
          newState.selectedunitCharacteristics.push(uc)
        }
      })
    }
    return newState;

  },
  [REMOVE_EDIT_ATTRIBUTE]: (state, action) => {
    if (action.payload != null && action.payload != undefined && !isNaN(action.payload)) {
      var newEditableAttributes = []
      var newEditableUnitCharacter = []
      var newState = Object.assign({}, state)
      newState.selectedunitCharacteristics.map((suc) => {
        if (suc.id == state.editableUnitCharacter.id) {
          newEditableUnitCharacter.push(suc);
          suc.editableAttributes.map((ea, index) => {
            if (index != action.payload) {
              newEditableAttributes.push(ea)
            }
          })
          newEditableUnitCharacter[0].editableAttributes = [];
          newEditableUnitCharacter[0].editableAttributes = newEditableAttributes;
        }
      })

      state.editableUnitCharacter = [];
    }
    return Object.assign({}, state, { editableUnitCharacter: newEditableUnitCharacter[0] });
  }
}
const initialState = {
  error: "",
  unitCharacteristics: getUnitCharacteristics(),
  allUOMvalues: getAllUOMValues(),
  selectedunitCharacteristics: getDefaultUnitCharacteristics(),
  unSelectedUnitCharacteristics: [],
  finalUnitCharacteristics: [],
  showModal: false,
  showDeleteModal: false,
  deletingUnitIndex: 0,
  editableUnitCharacter: {},
  showEditModal: false,
  startDate: moment(),
  UOMLabel: "",
  descriptionLabel: "",
  displayNameLabel: "",
  isEditable: false,
  editableIndex: 0
};

export default function unitCharacteristicsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}