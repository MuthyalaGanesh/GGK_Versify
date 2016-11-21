import {
  getGatewayInfo
} from 'api/locationWizardApi'

export const GET_GATEWAY_INFO = 'GET_GATEWAY_INFO'
export const ADD_MODAL = 'ADD_MODAL'
export const ADD_GATEWAY = 'ADD_GATEWAY'
export const EDIT_GATEWAY = 'EDIT_GATEWAY'
export const UPDATE_GATEWAY = 'UPDATE_GATEWAY'
export const DELETE_GATEWAY = 'DELETE_GATEWAY'
export const CONFIRM_DELETE_GATEWAY = 'CONFIRM_DELETE_GATEWAY'
export const CLOSE_GATEWAY_CONFIRMATION = "CLOSE_GATEWAY_CONFIRMATION"
export const SHOW_GATEWAY_ERRORS = "SHOW_GATEWAY_ERRORS"

export function getGateways() {
  return {
    type: GET_GATEWAY_INFO,
    payload: getGatewayInfo()
  };
};

export function bindGatewayLocationData(gateway) {
  let gateways = {}
  gateways.Gateways = gateway
  return {
    type: GET_GATEWAY_INFO,
    payload: gateways
  };
}

export function ConfirmGatewayDelete(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CONFIRM_DELETE_GATEWAY,
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

export function CloseGatewayConfirmation() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: CLOSE_GATEWAY_CONFIRMATION,
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

export function AddGatewayModalToggle() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: ADD_MODAL
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

export function AddGateway() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let values = {}
      let messages = {}
      let invalid = false
      let gateways = getState().gateways.gateway.Gateways
      getState().form.GatewayForm.hasOwnProperty('values') ?
        values = getState().form.GatewayForm.values : null
      if (values != null) {
        if (!values.GatewayName) {
          invalid = true
          messages.GatewayName = 'Please specify Name'
        }
        if (!values.GatewayURL) {
          invalid = true
          messages.GatewayURL = 'Please specify url'
        }
        if (values.GatewayName && gateways.findIndex((gateway) => gateway.aliasName === values.GatewayName) >=0) {
            invalid = true
            messages.GatewayName = 'Name must be unique'
        }
        if (invalid == true) {
          dispatch({
            type: SHOW_GATEWAY_ERRORS,
            payload: messages
          })
        } else {
          dispatch({
            type: ADD_GATEWAY,
            payload: getState().form.GatewayForm
          })
          dispatch({
            type: 'redux-form/DESTROY',
            meta: {
              form: "GatewayForm"
            },
            payload: ""
          })
        }
      } else {
        messages.GatewayName = 'Please specify Name'
        messages.GatewayURL = 'Please specify url'
        dispatch({
          type: SHOW_GATEWAY_ERRORS,
          payload: values
        })
      }
    })
  }
}

export function UpdateGateway() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let values = {}
      let fields = {}
      let messages = {}
      let gateways = getState().gateways.gateway
      let invalid = false
      let editedGateway = getState().gateways.EditableGateway
      getState().form.GatewayForm.hasOwnProperty('values') ?
        values = getState().form.GatewayForm.values : null
      getState().form.GatewayForm.hasOwnProperty('fields') ?
        fields = getState().form.GatewayForm.fields : null
      if (!values.GatewayName) {
        messages.GatewayName = 'Please specify Name',
          fields && fields.hasOwnProperty('GatewayName') && fields.GatewayName.hasOwnProperty('touched') &&
          fields.GatewayName.touched ?
          invalid = true : editedGateway.GatewayName ? messages.GatewayName = null : invalid = true
      }
      if (values.GatewayName) {
        let index = gateways.Gateways.findIndex((gateway) => gateway.aliasName === values.GatewayName)
        if (index >= 0 && index != editedGateway.index) {
          invalid = true
          messages.GatewayName = 'Name must be unique'
        }
      }
      if (!values.GatewayURL) {
        messages.GatewayURL = 'Please specify url'
        fields && fields.hasOwnProperty('GatewayURL') && fields.GatewayURL.hasOwnProperty('touched') &&
          fields.GatewayURL.touched ?
          invalid = true : editedGateway.GatewayURL ? messages.GatewayURL = null : invalid = true
      }
      if (invalid == true) {
        dispatch({
          type: SHOW_GATEWAY_ERRORS,
          payload: messages
        })
      } else {
        dispatch({
          type: UPDATE_GATEWAY,
          payload: getState().form.GatewayForm
        })
        dispatch({
          type: 'redux-form/DESTROY',
          meta: {
            form: "GatewayForm"
          },
          payload: ""
        })
      }

    })
  }
}

export function EditGateway(index) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: EDIT_GATEWAY,
        payload: index
      })
    })
  }
}

export function DeleteGateway() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: DELETE_GATEWAY
      })
    })
  }
}

export function validateGateway() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let gateway = getState().gateways
      let gateways = getState().gateways.gateway
      if (gateway.error) {
        let editedGateway = gateway.EditableGateway
        let values = {}
        let messages = {}
        getState().form.GatewayForm.hasOwnProperty('values') ?
          values = getState().form.GatewayForm.values : null
        if (!editedGateway.hasOwnProperty('Id')) {
          if (values != null) {
            values.GatewayName ? messages.GatewayName = null : messages.GatewayName = 'Please specify Name'
            values.GatewayURL ? messages.GatewayURL = null : messages.GatewayURL = 'Please specify url'
            if (values.GatewayName) {
              let index = gateways.Gateways.findIndex((gateway) => gateway.aliasName === values.GatewayName)
              if (index >= 0 && index != editedGateway.index) {
                messages.GatewayName = 'Name must be unique'
              }
            }
          } else {
            messages.GatewayName = 'Please specify Name'
            messages.GatewayURL = 'Please specify url'
          }
        } else {
          if (values != null) {
            let fields
            getState().form.GatewayForm.hasOwnProperty('fields') ?
              fields = getState().form.GatewayForm.hasOwnProperty('fields') : fields = {}

            fields.hasOwnProperty('GatewayName') && fields.GatewayName.hasOwnProperty('touched') &&
              fields.GatewayName.touched ?
              values.GatewayName ? messages.GatewayName = null : messages.GatewayName = 'Please specify Name' : editedGateway.GatewayName ? messages.GatewayName = null : messages.GatewayName = 'Please specify Name'

            fields.hasOwnProperty('GatewayURL') && fields.GatewayURL.hasOwnProperty('touched') &&
              fields.GatewayURL.touched ?
              values.GatewayURL ? messages.GatewayURL = null : messages.GatewayURL = 'Please specify url' : editedGateway.GatewayURL ? messages.GatewayURL = null : messages.GatewayURL = 'Please specify url'

          }
        }
        dispatch({
          type: SHOW_GATEWAY_ERRORS,
          payload: messages
        })
      }
    })
  }
}

export const ACTION_HANDLERS = {
  [GET_GATEWAY_INFO]: (state, action) => {
    return Object.assign({}, state, {
      gateway: action.payload,
      saveGateway: []
    })
  },
  [CONFIRM_DELETE_GATEWAY]: (state, action) => {
    return Object.assign({}, state, {
      GatewayDeleteIndex: action.payload,
      showGatewayDeleteModal: !state.showGatewayDeleteModal
    })
  },
  [CLOSE_GATEWAY_CONFIRMATION]: (state, action) => {
    return Object.assign({}, state, {
      GatewayDeleteIndex: null,
      showGatewayDeleteModal: !state.showGatewayDeleteModal,
    })
  },
  [ADD_MODAL]: (state, action) => {
    let newState = Object.assign({}, state, {
      showAddModal: !state.showAddModal,
      validationMessages: {},
      error: null
    })
    newState.AddNewGateway = true
    newState.EditableGateway = {}
    return newState
  },
  [EDIT_GATEWAY]: (state, action) => {
    if (!isNaN(action.payload) && state.gateway.Gateways) {
      let EditGateway = state.gateway.Gateways[action.payload]
      var EditableGateway = {}
      EditableGateway.Id = EditGateway.id
      EditableGateway.GatewayName = EditGateway.aliasName
      EditableGateway.GatewayURL = EditGateway.piInterfaceRootUrl
      EditableGateway.GatewayLogin = EditGateway.externalSystemLogin
      EditableGateway.GatewayPassword = EditGateway.externalSystemPwd
      EditableGateway.index = action.payload
    }
    let newState = Object.assign({}, state, {
      showAddModal: !state.showAddModal,
      EditableGateway: EditableGateway
    })
    newState.AddNewGateway = false
    return newState
  },
  [UPDATE_GATEWAY]: (state, action) => {
    let updatedGateways = [];
    let saveGateway = [];
    state.saveGateway.map((gateway) => {
      if (gateway.id >= 0) {
        saveGateway.push(gateway);
      }
    })
    if (action.payload) {
      state.gateway.Gateways.map((gw, i) => {
        if (state.EditableGateway != null && !isNaN(state.EditableGateway.index)) {
          if (i != state.EditableGateway.index) {
            updatedGateways.push(gw)
          } else {
            var newGateway = {};
            let fields = action.payload.fields
            newGateway.id = gw.id
            newGateway.aliasName = fields && fields.GatewayName && fields.GatewayName.touched ? action.payload.values.GatewayName : gw.aliasName
            newGateway.piInterfaceRootUrl = fields && fields.GatewayURL && fields.GatewayURL.touched ? action.payload.values.GatewayURL : gw.piInterfaceRootUrl
            newGateway.externalSystemLogin = fields && fields.GatewayLogin && fields.GatewayLogin.touched ? action.payload.values.GatewayLogin : gw.externalSystemLogin
            newGateway.externalSystemPwd = fields && fields.GatewayPassword && fields.GatewayPassword.touched ? action.payload.values.GatewayPassword : gw.externalSystemPwd
            newGateway.hasChanged = true
            newGateway.canDelete = gw.canDelete == true ? true : false
            updatedGateways.push(newGateway)
            if (gw.id >= 0) {
              let gatewayIndex = saveGateway.findIndex((g) => g.id === gw.id);
              gatewayIndex >= 0 ? saveGateway[gatewayIndex] = newGateway : saveGateway.push(newGateway)
            }
          }
        }
        updatedGateways.map((gateway) => {
          if (gateway.id < 0) {
            saveGateway.push(gateway);
          }
        })
      });
    }
    return Object.assign({}, state, {
      gateway: {
        Gateways: updatedGateways
      },
      showAddModal: !state.showAddModal,
      saveGateway: saveGateway,
      validationMessages: {},
      error: null
    })
  },
  [DELETE_GATEWAY]: (state, action) => {
    let updatedGateways = [];
    if (state.GatewayDeleteIndex) {
      state.gateway.Gateways.map((gw, i) => {
        if (i != state.GatewayDeleteIndex) {
          updatedGateways.push(gw)
        }
      });
    }
    return Object.assign({}, state, {
      gateway: {
        Gateways: updatedGateways,
      },
      GatewayDeleteIndex: null,
      showGatewayDeleteModal: !state.showGatewayDeleteModal
    })
  },
  [ADD_GATEWAY]: (state, action) => {
    var newState = Object.assign({}, state, {
      showAddModal: !state.showAddModal,
      validationMessages: {},
      error: null
    })
    if (action.payload != null) {
      if (action.payload.values.GatewayName) {
        var newGateway = {};
        newGateway.id = -1
        newGateway.aliasName = action.payload.values.GatewayName
        newGateway.piInterfaceRootUrl = action.payload.values.GatewayURL
        newGateway.externalSystemLogin = action.payload.values.GatewayLogin ? action.payload.values.GatewayLogin : ""
        newGateway.externalSystemPwd = action.payload.values.GatewayPassword ? action.payload.values.GatewayPassword : ""
        newGateway.hasChanged = true
        newGateway.canDelete = true
        newState.gateway.Gateways.push(newGateway)
        newState.saveGateway.push(newGateway)
      }

    }
    return newState
  },
  [SHOW_GATEWAY_ERRORS]: (state, action) => {
    return Object.assign({}, state, {
      error: 1,
      validationMessages: action.payload
    })
  }
}

const initialState = {
  error: null,
  gateway: getGatewayInfo(),
  EditableGateway: {},
  showAddModal: false,
  saveGateway: [],
  GatewayDeleteIndex: null,
  showGatewayDeleteModal: false,
  validationMessages: {}
};

export default function gateWayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}