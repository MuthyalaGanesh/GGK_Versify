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
export const BIND_INITIAL_ATTRIBUTES = "BIND_INITIAL_ATTRIBUTES"

//helps in binding initial values
export function BindUnitCharacteristicsInitialValues(locationObj) {
  return {
    type: BIND_INITIAL_ATTRIBUTES,
    payload: locationObj
  };
};

//toggling Add/edit modal popup
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

  [BIND_INITIAL_ATTRIBUTES]: (state, action) => {
    if (action.payload) {
      var newState = Object.assign({}, state)
      var attributes = action.payload
      if (!attributes || (attributes && attributes.length == 0)) {
        newState.selectedunitCharacteristics = [];
        newState.selectedunitCharacteristics = newState.defaultUnitCharacteristics;
      }
      else {
        newState.selectedunitCharacteristics = [];
        attributes.map(att => {
          newState.unitCharacteristics.map(uc => {
            if (uc.id == att.AttributeId) {
              uc.isDeletable = true;
              uc.isSavable = true;
              uc.LocationId = att.LocationId
              newState.defaultUnitCharacteristics.map(duc => {
                if (duc.id == att.AttributeId) {
                  uc.isDeletable = false;
                }
              })
              uc.defaultUnitOfMeasureId = att.UnitOfMeasureId
              uc.UOM = att.UnitOfMeasureName
              uc.LocationAttributeId = att.LocationAttributeId
              var editableAttributes = {
                EffectiveEndDate: (new Date(parseInt(att.EffectiveEndDate.substring(att.EffectiveEndDate.indexOf("(") + 1, (att.EffectiveEndDate.indexOf(")")))))).toLocaleDateString(),
                EffectiveStartDate: (new Date(parseInt(att.EffectiveStartDate.substring(att.EffectiveStartDate.indexOf("(") + 1, (att.EffectiveStartDate.indexOf(")")))))).toLocaleDateString(),
                Value: att.Value
              }
              var valuePresence = 1;
              newState.selectedunitCharacteristics.map(suc => {
                if (suc.id == att.AttributeId) {
                  suc.editableAttributes.push(editableAttributes);
                  valuePresence++;
                }
              })
              if (valuePresence == 1) {
                uc.editableAttributes = [];
                uc.editableAttributes.push(editableAttributes);
                newState.selectedunitCharacteristics.push(uc);
              }
            }
          })
        })
      }
      return newState;
    }
  },
  [TOGGLE_MODAL]: (state, action) => {
    if (action.payload != null) {
      if (!isNaN(action.payload)) {
        if (action.payload == -1) {
          var newState = Object.assign({}, state, { showModal: !state.showModal, isEditable: true, editableUnitCharacter: null, error: null })
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
              allUC.isSavable = true;
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
          return Object.assign({}, state, { showModal: !state.showModal, isEditable: false, error: null })
        }
      }
      else {
        return Object.assign({}, state, { showModal: !state.showModal, error: null })
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
    var newState = Object.assign({}, state, { showModal: !state.showModal, error: null, dateRangeValidation: [] })

    if (action.payload) {
      var errorStatus = null;
      var dateValidations = [];
      newState.selectedunitCharacteristics.map((uc, index) => {
        if (index == state.editableIndex) {
          state.editableUnitCharacter.isSavable = true;
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
                EffectiveStartDate: ed.effectiveStartDate ? ed.effectiveStartDate
                  : (action.payload.values.editableData[i - 1]
                    && action.payload.values.editableData[i - 1].effectiveEndDate
                    ? action.payload.values.editableData[i - 1].effectiveEndDate
                    : (uc.editableAttributes[0].EffectiveEndDate)),
                Value: ed.ucvalue
              }
              finalAttributes.push(newEditableAttributes);
            })
          }
          uc.editableAttributes = [];
          uc.editableAttributes = finalAttributes;
          uc.editableAttributes.map((ea, i) => {
            if (!ea.EffectiveEndDate || !ea.EffectiveStartDate || !ea.Value) {
              errorStatus = 1;
            }
            else {
              var dateVariations = (uc.editableAttributes[i - 1] && uc.editableAttributes[i - 1].EffectiveEndDate
                ? (new Date(uc.editableAttributes[i - 1].EffectiveEndDate) - new Date(ea.EffectiveStartDate))
                : (i > 0) ? (new Date(uc.editableAttributes[0].EffectiveEndDate) - new Date(ea.EffectiveStartDate)) : null);
              if (dateVariations) {
                errorStatus = 1;
                dateValidations.push(dateVariations < 0 ?
                  "Effective end date and start dates shouldn't have gaps"
                  : "Effective end date and start dates shouldn't overlap")
              }
              if ((new Date(ea.EffectiveEndDate) - new Date(ea.EffectiveStartDate)) < 0) {
                errorStatus = 1;
                dateValidations.push("Effective start date must lessthan effective End date");
              }
            }
          })
        }
        if (!errorStatus && dateValidations.length == 0) {
          var todayDate = new Date();
          var effDate = new Date(uc.editableAttributes[0].EffectiveStartDate);
          var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var minDiff = diffDays < 0 ? (-1)(diffDays) : diffDays;

          uc.editableAttributes.map((ea, i) => {
            var effDate = new Date(ea.EffectiveStartDate);
            var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            diffDays = diffDays < 0 ? (-1)(diffDays) : diffDays

            if (diffDays < minDiff) {
              minDiff = diffDays;
              var initialDate = new Object({
                EffectiveEndDate: uc.editableAttributes[0].EffectiveEndDate,
                EffectiveStartDate: uc.editableAttributes[0].EffectiveStartDate,
                Value: uc.editableAttributes[0].Value
              });
              var swapDate = new Object({
                EffectiveEndDate: ea.EffectiveEndDate,
                EffectiveStartDate: ea.EffectiveStartDate,
                Value: ea.Value
              })
              uc.editableAttributes[0].EffectiveEndDate = swapDate.EffectiveEndDate;
              uc.editableAttributes[0].EffectiveStartDate = swapDate.EffectiveStartDate;
              uc.editableAttributes[0].Value = swapDate.Value;
              ea.EffectiveEndDate = initialDate.EffectiveEndDate;
              ea.EffectiveStartDate = initialDate.EffectiveStartDate;
              ea.Value = initialDate.Value;
            }
          })
        }
      })
      return Object.assign({}, newState, {
        editableUnitCharacter: (!errorStatus && dateValidations.length == 0) ? null :
          state.editableUnitCharacter, error: errorStatus, showModal: (!errorStatus && dateValidations.length == 0) ?
            (!state.showModal) : (state.showModal), dateRangeValidation: dateValidations
      });
    }
  },
  //helps in prepopulating unit characteristic values after changing unit character
  [CHARACTERISTIC_SELECTED]: (state, action) => {
    var newState = Object.assign({}, state, { error: null })
    if (action.payload != null && action.payload != undefined) {
      newState.unitCharacteristics.map((uc) => {
        var updatedRow = {}

        if (uc.defaultUnitOfMeasureId && state.allUOMvalues) {
          state.allUOMvalues.map(uom => {
            if (uom.id == uc.defaultUnitOfMeasureId) {
              updatedRow.uom = uom.name
            }
          })
        }
        updatedRow.description = uc.description
        updatedRow.displayName = uc.display

        if (uc.id == parseInt(action.payload.id)) {
          if (!state.editableUnitCharacter) {
            newState.UOMLabel = updatedRow.uom
            newState.descriptionLabel = updatedRow.description
            newState.displayNameLabel = updatedRow.displayName
          }
          else {
            var attributes = newState.editableUnitCharacter.editableAttributes;
            newState.editableUnitCharacter = uc;
            newState.editableUnitCharacter.UOM = updatedRow.uom
            newState.editableUnitCharacter.editableAttributes = attributes;
          }

        }
      })

    }
    return newState
  },
  [INSERT_ROW]: (state, action) => {
    var newState = Object.assign({}, state, { error: null, dateRangeValidation: [] })
    if (action.payload && action.payload.values && action.payload.values.charateristicName) {
      var errorStatus = null;
      var dateValidations = []
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
                EffectiveStartDate: ed.effectiveStartDate ? ed.effectiveStartDate
                  : (action.payload.values.editableData[i - 1]
                    && action.payload.values.editableData[i - 1].effectiveEndDate
                    ? action.payload.values.editableData[i - 1].effectiveEndDate : (uc.editableAttributes[0].EffectiveEndDate)),
                Value: ed.ucvalue
              }
              uc.editableAttributes.push(newEditableAttributes);
            })
          }

          uc.editableAttributes.map((ea, i) => {
            if (!ea.EffectiveEndDate || !ea.EffectiveStartDate || !ea.Value) {
              errorStatus = 1;
            }
            else {
              var dateVariations = (uc.editableAttributes[i - 1] && uc.editableAttributes[i - 1].EffectiveEndDate
                ? (new Date(uc.editableAttributes[i - 1].EffectiveEndDate) - new Date(ea.EffectiveStartDate))
                : (i > 0) ? (new Date(uc.editableAttributes[0].EffectiveEndDate) - new Date(ea.EffectiveStartDate)) : null);
              if (dateVariations) {
                errorStatus = 1;
                dateValidations.push(dateVariations < 0 ?
                  "Effective end date and start dates shouldn't have gaps"
                  : "Effective end date and start dates shouldn't overlap")
              }
              if ((new Date(ea.EffectiveEndDate) - new Date(ea.EffectiveStartDate)) < 0) {
                errorStatus = 1;
                dateValidations.push("Effective start date must lessthan effective End date");
              }
            }
          })
          uc.UOM = newState.UOMLabel
          if (!errorStatus && dateValidations.length == 0) {
            var todayDate = new Date();
            var effDate = new Date(uc.editableAttributes[0].EffectiveStartDate);
            var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var minDiff = diffDays < 0 ? (-1)(diffDays) : diffDays;

            uc.editableAttributes.map((ea, i) => {
              var effDate = new Date(ea.EffectiveStartDate);
              var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
              diffDays = diffDays < 0 ? (-1)(diffDays) : diffDays

              if (diffDays < minDiff) {
                minDiff = diffDays;
                var initialDate = new Object({
                  EffectiveEndDate: uc.editableAttributes[0].EffectiveEndDate,
                  EffectiveStartDate: uc.editableAttributes[0].EffectiveStartDate,
                  Value: uc.editableAttributes[0].Value
                });
                var swapDate = new Object({
                  EffectiveEndDate: ea.EffectiveEndDate,
                  EffectiveStartDate: ea.EffectiveStartDate,
                  Value: ea.Value
                })
                uc.editableAttributes[0].EffectiveEndDate = swapDate.EffectiveEndDate;
                uc.editableAttributes[0].EffectiveStartDate = swapDate.EffectiveStartDate;
                uc.editableAttributes[0].Value = swapDate.Value;
                ea.EffectiveEndDate = initialDate.EffectiveEndDate;
                ea.EffectiveStartDate = initialDate.EffectiveStartDate;
                ea.Value = initialDate.Value;
              }
            })
            newState.selectedunitCharacteristics.push(uc)
          }
        }
      })

      return Object.assign({}, newState, {
        error: errorStatus, showModal: (!errorStatus && dateValidations.length == 0)
          ? (!state.showModal) : (state.showModal), dateRangeValidation: dateValidations
      })
    }
    else {
      return Object.assign({}, newState, { error: 1 })
    }

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
  defaultUnitCharacteristics: getDefaultUnitCharacteristics(),
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
  editableIndex: 0,
  dateRangeValidation: []
};

export default function unitCharacteristicsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}