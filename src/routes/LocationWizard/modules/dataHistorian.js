import {
  getMetricInfo
} from 'api/locationWizardApi'
import {
  getGatewayInfo
} from 'api/locationWizardApi'
import {
  getDataHistorian
} from 'api/locationWizardApi'

export const GET_GATEWAY_INFO = 'GET_GATEWAY_INFO'
export const GET_DATAEHISTORIAN_INFO = 'GET_DATAEHISTORIAN_INFO'
export const GET_METRIC_INFO = 'GET_METRIC_INFO'
export const ADD_DATAHISTORIAN__MODAL = 'ADD_DATAHISTORIAN__MODAL'
export const ADD_DATAHISTORIAN = 'ADD_DATAHISTORIAN'
export const EDIT_DATAHISTORIAN = 'EDIT_DATAHISTORIAN'
export const UPDATE_DATAHISTORIAN = 'UPDATE_DATAHISTORIAN'
export const DELETE_DATAHISTORIAN = 'DELETE_DATAHISTORIAN'
export const CLICKED_IS_DIGITAL_TAG = 'CLICKED_IS_DIGITAL_TAG'
export const CONFIRM_DELETE_HISTORIAN = 'CONFIRM_DELETE_HISTORIAN'
export const CLOSE_CONFIRMATION = "CLOSE_CONFIRMATION"

export function getGateways() {
  return {
    type: GET_GATEWAY_INFO,
    payload: getGatewayInfo()
  };
};

export function getMetrics() {
  return {
    type: GET_METRIC_INFO,
    payload: getMetricInfo()
  };
};

export function getDataHistorians() {
  return {
    type: GET_DATAEHISTORIAN_INFO,
    payload: getDataHistorian()
  };
};

export function ConfirmDataDelete(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CONFIRM_DELETE_HISTORIAN,
        payload: index
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "GatewayForm"
        },
        payload: ""
      })
    })
  }
}

export function CloseDataConfirmation() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CLOSE_CONFIRMATION,
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "GatewayForm"
        },
        payload: ""
      })
    })
  }
}

export function AddDataHistorianModalToggle() {
  return {
    type: ADD_DATAHISTORIAN__MODAL
  };
};

export function AddDataHistorian() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: ADD_DATAHISTORIAN,
        payload: getState().form.DataHistorianForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "DataHistorianForm"
        },
        payload: ""
      })
    })
  }
};

export function UpdateAddDataHistorian() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: UPDATE_DATAHISTORIAN,
        payload: getState().form.DataHistorianForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "DataHistorianForm"
        },
        payload: ""
      })
    })
  }
};

export function EditDataHistorian(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: EDIT_DATAHISTORIAN,
        payload: index
      })
    })
  }
};

export function DeleteDataHistorian(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: DELETE_DATAHISTORIAN,
        payload: index
      })
    })
  }
};

export function ClickedIsDigitalTag() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CLICKED_IS_DIGITAL_TAG
      })
    })
  }
}

export const ACTION_HANDLERS = {
  [GET_GATEWAY_INFO]: (state, action) => {
    return Object.assign({}, state, {
      gateway: action.payload
    })
  },
  [GET_METRIC_INFO]: (state, action) => {
    return Object.assign({}, state, {
      metrics: action.payload
    })
  },
  [GET_DATAEHISTORIAN_INFO]: (state, action) => {
    return Object.assign({}, state, {
      dataHistorian: action.payload
    })
  },
  [CONFIRM_DELETE_HISTORIAN]: (state, action) => {
    return Object.assign({}, state, {
      deleteDataIndex: action.payload,
      showDataDeleteModal : !state.showDataDeleteModal
    })
  },
  [CLOSE_CONFIRMATION]: (state, action) => {
    return Object.assign({}, state, {
      deleteDataIndex: null,
      showDataDeleteModal : !state.showDataDeleteModal
    })
  },
  [ADD_DATAHISTORIAN__MODAL]: (state, action) => {
    let newState = Object.assign({}, state, {
      showAddDataHistorianModal: !state.showAddDataHistorianModal
    })
    newState.AddNewDataHistorian = true
    newState.EditableDataHistorian = {}
    return newState
  },
  [ADD_DATAHISTORIAN]: (state, action) => {
    var newState = Object.assign({}, state, {
      showAddDataHistorianModal: !state.showAddDataHistorianModal
    })
    if (action.payload != null) {
      if (action.payload.values.metric) {
        var newDataHistorian = {};
        newDataHistorian.id = 0
        newDataHistorian.metricId = action.payload.values.metric.id
        newDataHistorian.metricName = action.payload.values.metric.displayName
        newDataHistorian.metricDescription = action.payload.values.metric.description
        newDataHistorian.isDigitalState = action.payload.values.isDigitalTag
        newDataHistorian.scadaTag = action.payload.values.Tag
        newDataHistorian.scadaServerAliasName = action.payload.values.Gateway.aliasName
        newDataHistorian.scadaServerId = action.payload.values.Gateway.id
        newDataHistorian.locationId = '11020321'
        newState.dataHistorian.push(newDataHistorian)
        newState.saveScada.push(newDataHistorian)
      }
    }
    return newState
  },
  [EDIT_DATAHISTORIAN]: (state, action) => {
    if (!isNaN(action.payload) && state.dataHistorian) {
      let EditData = state.dataHistorian[action.payload]
      var EditableData = {};
      EditableData.id = EditData.id
      EditableData.metricId = EditData.metricId
      EditableData.isDigitalState = EditData.isDigitalState
      EditableData.scadaTag = EditData.scadaTag
      EditableData.scadaServerId = EditData.scadaServerId
      EditableData.index = action.payload
    }
    let newState = Object.assign({}, state, {
      EditableDataHistorian: EditableData,
      showAddDataHistorianModal: !state.showAddDataHistorianModal
    })
    newState.AddNewDataHistorian = false
    return newState
  },
  [UPDATE_DATAHISTORIAN]: (state, action) => {
    let updatedDataHistorian = [];
    let saveDataHistorian = [];
    state.saveScada.map((scada) => {
      if (scada.id > 0) {
        saveDataHistorian.push(scada);
      }
    })
    if (action.payload) {
      state.dataHistorian.map((dh, i) => {
        if (state.EditableDataHistorian != null && !isNaN(state.EditableDataHistorian.index)) {
          if (i != state.EditableDataHistorian.index) {
            updatedDataHistorian.push(dh)
          } else {
            var newDataHistorian = {};
            if (action.payload.fields) {
              newDataHistorian.id = dh.id
              if (action.payload.fields.metric && action.payload.fields.metric.touched) {
                newDataHistorian.metricId = action.payload.values.metric.id
                newDataHistorian.metricName = action.payload.values.metric.displayName
                newDataHistorian.metricDescription = action.payload.values.metric.description
              } else {
                newDataHistorian.metricId = dh.metricId
                newDataHistorian.metricName = dh.metricName
                newDataHistorian.metricDescription = dh.metricDescription
              }
              if (action.payload.fields.Gateway && action.payload.fields.Gateway.touched) {
                newDataHistorian.scadaServerAliasName = action.payload.values.Gateway.aliasName
                newDataHistorian.scadaServerId = action.payload.values.Gateway.id
              } else {
                newDataHistorian.scadaServerAliasName = dh.scadaServerAliasName
                newDataHistorian.scadaServerId = dh.scadaServerId
              }
              newDataHistorian.scadaTag = action.payload.fields.Tag && action.payload.fields.Tag.touched ? action.payload.values.Tag : dh.scadaTag
              newDataHistorian.isDigitalState = action.payload.values && !isNaN(action.payload.values.isDigitalTag) ? action.payload.values.isDigitalTag : dh.isDigitalState
              updatedDataHistorian.push(newDataHistorian)
              if (dh.id > 0) {
                let scadaIndex = saveDataHistorian.findIndex((s) => s.id === dh.id);
                scadaIndex >= 0 ? saveDataHistorian[scadaIndex] = newDataHistorian : saveDataHistorian.push(newDataHistorian)
              }
            } else if (state.clickedIsDigitalTag) {
              let data = dh;
              data.isDigitalState = action.payload.values && action.payload.values.isDigitalTag ? action.payload.values.isDigitalTag : false
              updatedDataHistorian.push(dh)
              if (dh.id > 0) {
                let scadaIndex = saveDataHistorian.findIndex((s) => s.id === dh.id);
                scadaIndex >= 0 ? saveDataHistorian[scadaIndex] = data : saveDataHistorian.push(data)
              }
            } else {
              updatedDataHistorian.push(dh)
            }
          }          
        }
        updatedDataHistorian.map((scada) => {
          if (scada.id == 0) {
            saveDataHistorian.push(scada);
          }
        })
      });
    }
    return Object.assign({}, state, {
      dataHistorian: updatedDataHistorian,
      showAddDataHistorianModal: !state.showAddDataHistorianModal,
      saveScada : saveDataHistorian
    })
  },
  [DELETE_DATAHISTORIAN]: (state, action) => {
    let updatedDataHistorian = [];
    if (state.deleteDataIndex) {
      state.dataHistorian.map((dh, i) => {
        if (i != state.deleteDataIndex) {
          updatedDataHistorian.push(dh)
        }
      });
    }
    return Object.assign({}, state, {
      dataHistorian: updatedDataHistorian,
      showDataDeleteModal : !state.showDataDeleteModal,
      deleteDataIndex : null
    })
  },
  [CLICKED_IS_DIGITAL_TAG]: (state, action) => {
    return Object.assign({}, state, {
      clickedIsDigitalTag: true
    })
  }
}

const initialState = {
  error: null,
  dataHistorian: getDataHistorian(),
  EditableDataHistorian: {},
  metrics: getMetricInfo(),
  gateways: getGatewayInfo(),
  showAddDataHistorianModal: false,
  clickedIsDigitalTag: false,
  saveScada: [],
  showDataDeleteModal : false,
  deleteDataIndex : null
};

export default function dataHistorianReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}