export const ADD_EQUIPMENT = 'ADD_EQUIPMENT'
export const EDIT_EQUIPMENT = 'EDIT_EQUIPMENT'
export const APPLY_EQUIPMENT = 'APPLY_EQUIPMENT'
export const DELETE_EQUIPMENT = 'DELETE_EQUIPMENT'
export const STATE_CHANGE_EDIT_FOR_EQUIPMENT = 'STATE_CHANGE_EDIT_FOR_EQUIPMENT'
export const INITIAL_EQUIPMENT_NEW_LOCATION = 'INITIAL_EQUIPMENT_NEW_LOCATION'
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
export function InitialEquipmentsForNewLocation() {
  return {
    type: INITIAL_EQUIPMENT_NEW_LOCATION
  }
}
export function BindInitialEquipments(equipments) {
  return {
    type: STATE_CHANGE_EDIT_FOR_EQUIPMENT,
    payload: equipments
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
        type: 'redux-form/INITIALIZE',
        meta: { form: "EquipmentsForm", },
        payload: {
          editedEquipment: getState().equipments && getState().equipments.editableEquipment ? getState().equipments.editableEquipment.Name : null
        }
      })
    })
  }
}
export function ApplyEditEquipment() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: APPLY_EQUIPMENT,
        payload: getState().form.EquipmentsForm && getState().form.EquipmentsForm.values ? getState().form.EquipmentsForm.values.editedEquipment : null
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
  [INITIAL_EQUIPMENT_NEW_LOCATION]: (state, action) => {
    var equipments = []
    return Object.assign({}, state, {
      insertedEquipment: equipments
    })
  },
  [STATE_CHANGE_EDIT_FOR_EQUIPMENT]: (state, action) => {
    var parentLocationId = action.payload && action.payload[0] ? action.payload[0].ParentLocationId : 0
    if (action.payload) {
      var equipments = []
      action.payload.map(ap => {
        if (ap.Name) {
          equipments.push(ap)
        }
      })
      return Object.assign({}, state, {
        insertedEquipment: equipments,
        ParentLocationId: parentLocationId
      })
    }
    return Object.assign({}, state)
  },
  [ADD_EQUIPMENT]: (state, action) => {

    if (action.payload && action.payload.replace(/\s/g, '').length && typeof action.payload == "string") {
      var valuePresence = 1;
      var newEquipmentData = [];
      if (!state.insertedEquipment) {
        state.insertedEquipment = [];
      }
      state.insertedEquipment.map((eq) => {
        newEquipmentData.push(eq);
        if (eq.Name.toLowerCase() == action.payload.toLowerCase()) {
          valuePresence++;
        }
      })
      if (valuePresence == 1) {
        newEquipmentData.push(new Object({
          Id: 0,
          Name: action.payload,
          ParentLocationId: state.ParentLocationId,
          IsDirty: false
        }));
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
    if (action.payload && action.payload.replace(/\s/g, '').length) {
      var updatedEquipments = []
      var valuePresence = 1
      state.insertedEquipment.map((eq) => {
        if (eq.Name.toLowerCase() == action.payload.toLowerCase()) {
          valuePresence++;
        }
      })
      state.insertedEquipment.map((eq) => {
        if (eq.Name == state.editableEquipment.Name) {
          updatedEquipments.push(valuePresence == 1 ? new Object({
            Id: eq.Id,
            Name: action.payload,
            ParentLocationId: eq.ParentLocationId,
            IsDirty: false
          }) : eq);
        }
        else {
          updatedEquipments.push(eq)
        }
      })
      return Object.assign({}, state, { insertedEquipment: updatedEquipments, showEditModal: !state.showEditModal })
    }
    return Object.assign({}, state, { showEditModal: !state.showEditModal })
  },
  [DELETE_EQUIPMENT]: (state, action) => {
    if (action.payload != null && action.payload != undefined && !isNaN(action.payload)) {
      var updatedEquipments = []
      var deletedEquipments = []
      state.insertedEquipment.map((eq, i) => {
        if (i != action.payload) {
          updatedEquipments.push(eq)
        }
        else {
          eq.Name = ""
          deletedEquipments.push(eq)
        }
      })
      return Object.assign({}, state, { insertedEquipment: updatedEquipments, deletedEquipments: deletedEquipments })
    }
    return Object.assign({}, state)
  }
}

const initialState = {
  error: "",
  insertedEquipment: [],
  editableEquipment: [],
  showEditModal: false,
  ParentLocationId: 0,
  deletedEquipments: []
};

export default function equipmentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
