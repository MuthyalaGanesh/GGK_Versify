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
export const BIND_DATA_HISTORIAN_LOCATIONID = "BIND_DATA_HISTORIAN_LOCATIONID"
export const SHOW_DATAHISTORIAN_ERRORS = "SHOW_DATAHISTORIAN_ERRORS"

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

export function bindLocationData(assignedScada, locationId) {
  let defaultHistorians = getDataHistorian();
  let locationData = {}
  locationData.finalData = [],
    locationData.locationId = locationId
  defaultHistorians.map((data) => {
    if (assignedScada) {
      let index = assignedScada.findIndex((scada) => scada.metricId === data.metricId);
      if (index < 0) {
        locationData.finalData.push(data);
      }
    } else {
      locationData.finalData.push(data);
    }
  })
  assignedScada.map((data) => {
    let scada = data
    data.isEdited = false
    data.isDefault = true
    locationData.finalData.push(scada)
  })
  return {
    type: BIND_DATA_HISTORIAN_LOCATIONID,
    payload: locationData
  }
}

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
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "DataHistorianForm"
        },
        payload: ""
      })
      dispatch({
        type: ADD_DATAHISTORIAN__MODAL
      })
    })
  }
};

export function AddDataHistorian() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let values = {}
      let messages = {}
      let invalid = false
      getState().form.DataHistorianForm.hasOwnProperty('values') ?
        values = getState().form.DataHistorianForm.values : null
      if (values != null) {
        if (!values.metric) {
          invalid = true
          messages.Metric = 'Please select Metric'
        }
        if (!values.Tag) {
          invalid = true
          messages.Tag = 'Please specify Tag'
        }
        else if(!values.Tag.trim())
        {
          invalid = true
          messages.Tag = 'Please specify Tag'
        }
        if (!values.Gateway) {
          invalid = true
          messages.Gateway = 'Please select Gateway'
        }
        if (invalid == true) {
          dispatch({
            type: SHOW_DATAHISTORIAN_ERRORS,
            payload: messages
          })
        } else {
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
        }
      } else {
        values.Metric = 'Please select Metric'
        values.Tag = 'Please specify Tag'
        values.Gateway = 'Please select Gateway'
        dispatch({
          type: SHOW_DATAHISTORIAN_ERRORS,
          payload: values
        })
      }
    })
  }
};

export function UpdateAddDataHistorian() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let values = {}
      let messages = {}
      let invalid = false
      let editData = getState().dataHistorian.EditableDataHistorian
      getState().form.DataHistorianForm.hasOwnProperty('values') ?
        values = getState().form.DataHistorianForm.values : null
      if (values != null) {
        if (!values.metric && !editData.metricId) {
          invalid = true
          messages.Metric = 'Please select Metric'
        }
        if (!values.Tag) {
          messages.Tag = 'Please specify Tag',
            getState().form.DataHistorianForm.hasOwnProperty('fields') &&
            getState().form.DataHistorianForm.fields.hasOwnProperty('Tag') &&
            getState().form.DataHistorianForm.fields.Tag.hasOwnProperty('touched') &&
            getState().form.DataHistorianForm.fields.Tag.touched ?
            invalid = true : editData.scadaTag ? messages.Tag = null : invalid = true
        }
        else if(!values.Tag.trim())
        {
          invalid = true
          messages.Tag = 'Please specify Tag'
        }
        if (!values.Gateway && !editData.scadaServerId) {
          invalid = true
          messages.Gateway = 'Please select Gateway'
        }
        if (invalid == true) {
          dispatch({
            type: SHOW_DATAHISTORIAN_ERRORS,
            payload: messages
          })
        } else {
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
        }
      }
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
      let editedData = getState().dataHistorian.EditableDataHistorian
      dispatch({
        type: 'redux-form/INITIALIZE',
        meta: {
          form: "DataHistorianForm"
        },
        payload: {
          Tag : editedData.scadaTag
        }
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
};

export function validateData() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data = getState().dataHistorian
      if (data.error) {
        let editData = data.EditableDataHistorian
        let values = {}
        let messages = {}
        getState().form.DataHistorianForm.hasOwnProperty('values') ?
          values = getState().form.DataHistorianForm.values : null
        if (!editData.hasOwnProperty('id')) {
          if (values != null) {
            values.metric ? messages.Metric = null : messages.Metric = 'Please select Metric'
            values.Tag && values.Tag.trim() ? messages.Tag = null : messages.Tag = 'Please specify Tag'
            values.Gateway ? messages.Gateway = null : messages.Gateway = 'Please select Gateway'
          } else {
            messages.Metric = 'Please select Metric'
            messages.Tag = 'Please specify Tag'
            messages.Gateway = 'Please select Gateway'
          }
        } else {
          if (values != null) {
            values.metric || editData.metricId ? messages.Metric = null : messages.Metric = 'Please select Metric'
            getState().form.DataHistorianForm.hasOwnProperty('fields') &&
              getState().form.DataHistorianForm.fields.hasOwnProperty('Tag') &&
              getState().form.DataHistorianForm.fields.Tag.hasOwnProperty('touched') &&
              getState().form.DataHistorianForm.fields.Tag.touched ?
              values.Tag && values.Tag.trim() ? messages.Tag = null : messages.Tag = 'Please specify Tag' : editData.scadaTag ? messages.tag = null : messages.Tag = 'Please specify Tag'
            values.Gateway || editData.scadaServerId ? messages.Gateway = null : messages.Gateway = 'Please select Gateway'
          }
        }
        dispatch({
          type: SHOW_DATAHISTORIAN_ERRORS,
          payload: messages
        })
      }
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
      showDataDeleteModal: !state.showDataDeleteModal
    })
  },
  [CLOSE_CONFIRMATION]: (state, action) => {
    return Object.assign({}, state, {
      deleteDataIndex: null,
      showDataDeleteModal: !state.showDataDeleteModal
    })
  },
  [ADD_DATAHISTORIAN__MODAL]: (state, action) => {
    let metricDropdown = []
    let allmetrics = state.allmetrics
    let data = state.dataHistorian
    allmetrics.map((metric) => {
      let index = data.findIndex((info) => info.metricId === metric.id);
      if (index < 0) {
        metricDropdown.push(metric)
      }
    })
    let newState = Object.assign({}, state, {
      showAddDataHistorianModal: !state.showAddDataHistorianModal,
      metrics: metricDropdown,
      error: null,
      clickedIsDigitalTag: false
    })
    newState.AddNewDataHistorian = true
    newState.EditableDataHistorian = {}
    return newState
  },
  [ADD_DATAHISTORIAN]: (state, action) => {
    var newState = Object.assign({}, state, {
      showAddDataHistorianModal: !state.showAddDataHistorianModal,
      error: null
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
        newDataHistorian.locationId = state.locationId
        newDataHistorian.isDefault = false
        newDataHistorian.isEdited = true
        newState.dataHistorian.push(newDataHistorian)
        newState.saveScada.push(newDataHistorian)
      }
    }
    return newState
  },
  [EDIT_DATAHISTORIAN]: (state, action) => {
    let metricDropdown = []
    let allmetrics = state.allmetrics
    let data = state.dataHistorian
    allmetrics.map((metric) => {
      let index = data.findIndex((info) => info.metricId === metric.id);
      if (index < 0) {
        metricDropdown.push(metric)
      }
    })
    if (!isNaN(action.payload) && state.dataHistorian) {
      let EditData = state.dataHistorian[action.payload]
      var EditableData = {};
      EditableData.id = EditData.id
      EditableData.metricId = EditData.metricId
      EditableData.isDigitalState = EditData.isDigitalState
      EditableData.scadaTag = EditData.scadaTag
      EditableData.scadaServerId = EditData.scadaServerId
      EditableData.index = action.payload
      EditableData.isDefault = EditData.isDefault
      let metricindex = allmetrics.findIndex((m) => m.id === EditData.metricId);
      if (metricindex >= 0) {
        metricDropdown.push(allmetrics[metricindex])
      }
    }
    let newState = Object.assign({}, state, {
      EditableDataHistorian: EditableData,
      showAddDataHistorianModal: !state.showAddDataHistorianModal,
      metrics: metricDropdown
    })
    newState.AddNewDataHistorian = false
    return newState
  },
  [UPDATE_DATAHISTORIAN]: (state, action) => {
    let updatedDataHistorian = [];
    let saveDataHistorian = [];
    if (action.payload) {
      state.dataHistorian.map((dh, i) => {
        if (state.EditableDataHistorian != null && !isNaN(state.EditableDataHistorian.index)) {
          if (i != state.EditableDataHistorian.index) {
            updatedDataHistorian.push(dh)
          } else {
            var newDataHistorian = {};
            if (action.payload.values) {
              newDataHistorian.id = dh.id
              if (action.payload.values.metric) {
                newDataHistorian.metricId = action.payload.values.metric.id
                newDataHistorian.metricName = action.payload.values.metric.displayName
                newDataHistorian.metricDescription = action.payload.values.metric.description
              } else {
                newDataHistorian.metricId = dh.metricId
                newDataHistorian.metricName = dh.metricName
                newDataHistorian.metricDescription = dh.metricDescription
              }
              if (action.payload.values.Gateway) {
                newDataHistorian.scadaServerAliasName = action.payload.values.Gateway.aliasName
                newDataHistorian.scadaServerId = action.payload.values.Gateway.id
              } else {
                newDataHistorian.scadaServerAliasName = dh.scadaServerAliasName
                newDataHistorian.scadaServerId = dh.scadaServerId
              }
              newDataHistorian.scadaTag = action.payload.values && action.payload.values.Tag ? action.payload.values.Tag : dh.scadaTag
              newDataHistorian.isDigitalState = state.clickedIsDigitalTag ? action.payload.values && !isNaN(action.payload.values.isDigitalTag) ? action.payload.values.isDigitalTag : false : dh.isDigitalState
              updatedDataHistorian.push(newDataHistorian)
              newDataHistorian.isDefault = dh.isDefault
              newDataHistorian.isEdited = true
              newDataHistorian.locationId = state.locationId
            } else if (state.clickedIsDigitalTag) {
              let data = dh;
              data.isDigitalState = action.payload.values && action.payload.values.isDigitalTag ? action.payload.values.isDigitalTag : false
              data.isEdited = true
              updatedDataHistorian.push(dh)
            } else {
              updatedDataHistorian.push(dh)
            }
          }
        }
      });
      updatedDataHistorian.map((scada) => {
        if (scada.isEdited == true) {
          saveDataHistorian.push(scada);
        }
      })
    }
    return Object.assign({}, state, {
      dataHistorian: updatedDataHistorian,
      showAddDataHistorianModal: !state.showAddDataHistorianModal,
      saveScada: saveDataHistorian,
      clickedIsDigitalTag: false
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
      showDataDeleteModal: !state.showDataDeleteModal,
      deleteDataIndex: null
    })
  },
  [CLICKED_IS_DIGITAL_TAG]: (state, action) => {
    return Object.assign({}, state, {
      clickedIsDigitalTag: true
    })
  },
  [BIND_DATA_HISTORIAN_LOCATIONID]: (state, action) => {
    return Object.assign({}, state, {
      dataHistorian: action.payload.finalData,
      locationId: action.payload.locationId,
      saveScada : []
    })
  },
  [SHOW_DATAHISTORIAN_ERRORS]: (state, action) => {
    return Object.assign({}, state, {
      error: 1,
      validationMessages: action.payload
    })
  }
}

const initialState = {
  error: null,
  dataHistorian: getDataHistorian(),
  EditableDataHistorian: {},
  allmetrics: getMetricInfo(),
  metrics: [],
  gateways: getGatewayInfo(),
  showAddDataHistorianModal: false,
  clickedIsDigitalTag: false,
  saveScada: [],
  showDataDeleteModal: false,
  deleteDataIndex: null,
  validationMessages: {}
};

export default function dataHistorianReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}