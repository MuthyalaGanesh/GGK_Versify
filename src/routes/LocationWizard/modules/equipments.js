export const ADD_EQUIPMENT = 'ADD_EQUIPMENT'
export const EDIT_EQUIPMENT = 'EDIT_EQUIPMENT'
export const APPLY_EQUIPMENT = 'APPLY_EQUIPMENT'
export const DELETE_EQUIPMENT = 'DELETE_EQUIPMENT'

export function AddEquipment() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: ADD_EQUIPMENT,
        payload: getState().form.EquipmentsForm && getState().form.EquipmentsForm.values ? getState().form.EquipmentsForm.values.newEquipment : null
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "EquipmentsForm" },
        payload: ""
      })
    })
  }
}

export function EditEquipment(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: EDIT_EQUIPMENT,
        payload: index
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: { form: "EquipmentsForm" },
        payload: ""
      })
    })
  }
}
export function ApplyEditEquipment() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: APPLY_EQUIPMENT,
        payload: getState().form.EquipmentsForm.values.editedEquipment
      })
    })
  }
}
export function DeleteEquipment(index) {
  return {
    type: DELETE_EQUIPMENT,
    payload: index
  }
}
export const ACTION_HANDLERS = {

  [ADD_EQUIPMENT]: (state, action) => {

    if (action.payload != null && action.payload != undefined && typeof action.payload == "string") {
      var valuePresence = 1;
      var newEquipmentData = [];
      if (!state.insertedEquipment) {
        state.insertedEquipment = [];
      }
      state.insertedEquipment.map((eq) => {
        newEquipmentData.push(eq);
        if (eq == action.payload) {
          valuePresence++;
        }
      })
      if (valuePresence == 1) {
        newEquipmentData.push(action.payload);
      }
      return Object.assign({}, state, { insertedEquipment: newEquipmentData })
    }
    return Object.assign({}, state)
  },
  [EDIT_EQUIPMENT]: (state, action) => {
    if (action.payload != null && action.payload != undefined && !isNaN(action.payload)) {
      state.editableEquipment = state.insertedEquipment[action.payload];
    }
    return Object.assign({}, state, { showEditModal: !state.showEditModal })
  },
  [APPLY_EQUIPMENT]: (state, action) => {
    if (action.payload) {
      var updatedEquipments = []
      state.insertedEquipment.map((eq) => {
        if (eq == state.editableEquipment) {
          updatedEquipments.push(action.payload);
        }
        else {
          updatedEquipments.push(eq)
        }
      })
      return Object.assign({}, state, { insertedEquipment: updatedEquipments, showEditModal: !state.showEditModal })
    }
    return Object.assign({}, state)
  },
  [DELETE_EQUIPMENT]: (state, action) => {
    if (action.payload != null && action.payload != undefined && !isNaN(action.payload)) {
      var updatedEquipments = []
      state.insertedEquipment.map((eq, i) => {
        if (i != action.payload) {
          updatedEquipments.push(eq)
        }
      })
      return Object.assign({}, state, { insertedEquipment: updatedEquipments })
    }
    return Object.assign({}, state)
  }
}

const initialState = {
  error: "",
  insertedEquipment: [],
  editableEquipment: "",
  showEditModal: false
};

export default function equipmentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
