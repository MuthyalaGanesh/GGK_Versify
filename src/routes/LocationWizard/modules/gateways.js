import {getGatewayInfo} from 'api/locationWizardApi'

export const GET_GATEWAY_INFO = 'GET_GATEWAY_INFO'
export const ADD_MODAL = 'ADD_MODAL'
export const ADD_GATEWAY = 'ADD_GATEWAY'
export const EDIT_GATEWAY = 'EDIT_GATEWAY'
export const UPDATE_GATEWAY = 'UPDATE_GATEWAY'
export const DELETE_GATEWAY = 'DELETE_GATEWAY'

export function getGateways() {	
  return {
    type: GET_GATEWAY_INFO,
    payload: getGatewayInfo()
  };
};

export function AddGatewayModalToggle(){
 return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: ADD_MODAL})
	  dispatch({type: 'redux-form/DESTROY',meta: {form: "GatewayForm"},payload: ""})
    })
  }
}

export function AddGateway(){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: ADD_GATEWAY, payload: getState().form.GatewayForm })
	  dispatch({type: 'redux-form/DESTROY',meta: {form: "GatewayForm"},payload: ""})
    })
  }
}

export function UpdateGateway(){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: UPDATE_GATEWAY, payload: getState().form.GatewayForm})
      dispatch({type: 'redux-form/DESTROY',meta: {form: "GatewayForm"},payload: ""})
    })
  }
}

export function EditGateway(index){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: EDIT_GATEWAY, payload: index })
    })
  }
}

export function DeleteGateway(index){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: DELETE_GATEWAY, payload: index })
    })
  }
}

export const ACTION_HANDLERS = { 
  [GET_GATEWAY_INFO]: (state, action) => {
    return  Object.assign({},state,{gateway:action.payload})
  },
  [ADD_MODAL]:(state,action)=>{
  	let newState  = Object.assign({},state,{showAddModal:!state.showAddModal})
    newState.AddNewGateway = true
    newState.EditableGateway = {}
    return newState
  },
  [EDIT_GATEWAY]: (state, action) => {
    if (!isNaN(action.payload) && state.gateway.Gateways) {
      let EditGateway = state.gateway.Gateways[action.payload]
      var EditableGateway ={}
      EditableGateway.Id = EditGateway.id 
      EditableGateway.GatewayName = EditGateway.aliasName
      EditableGateway.GatewayURL = EditGateway.piInterfaceRootUrl 
      EditableGateway.GatewayLogin = EditGateway.externalSystemLogin
      EditableGateway.GatewayPassword = EditGateway.externalSystemPwd
      EditableGateway.index = action.payload
    }
    let newState = Object.assign({}, state, { showAddModal: !state.showAddModal , EditableGateway : EditableGateway})
    newState.AddNewGateway = false    
    return newState
  },
  [UPDATE_GATEWAY]:(state,action)=>{
     let updatedGateways=[]; 
    if (action.payload) {            
            state.gateway.Gateways.map((gw,i) => {
              if(state.EditableGateway != null && !isNaN(state.EditableGateway.index))
              {
                if (i!=state.EditableGateway.index) {
                    updatedGateways.push(gw)
                }
                else{
                    var newGateway = {};
                    newGateway.id = gw.id
                    newGateway.aliasName = action.payload.fields.GatewayName && action.payload.fields.GatewayName.touched ? action.payload.values.GatewayName : gw.aliasName
                    newGateway.piInterfaceRootUrl = action.payload.fields.GatewayURL && action.payload.fields.GatewayURL.touched ? action.payload.values.GatewayURL : gw.piInterfaceRootUrl
                    newGateway.externalSystemLogin = action.payload.fields.GatewayLogin && action.payload.fields.GatewayLogin.touched ? action.payload.values.GatewayLogin : gw.externalSystemLogin
                    newGateway.externalSystemPwd = action.payload.fields.GatewayPassword && action.payload.fields.GatewayPassword.touched ? action.payload.values.GatewayPassword : gw.externalSystemPwd
                    updatedGateways.push(newGateway) 
                }
              }                
            });
        }
     return Object.assign({},state,{gateway:{Gateways:updatedGateways},showAddModal: !state.showAddModal })
  },
  [DELETE_GATEWAY]:(state,action)=>{ 
    let updatedGateways=[];     
    if (action.payload) {            
            state.gateway.Gateways.map((gw,i) => {
                if (i!=action.payload) {
                    updatedGateways.push(gw)
                }
            });
        }
     return Object.assign({},state,{gateway:{Gateways:updatedGateways}})
  },
  [ADD_GATEWAY]: (state, action) => {
    var newState = Object.assign({}, state, { showAddModal:!state.showAddModal })
    if (action.payload != null) { 
      if (action.payload.values.GatewayName) {
          var newGateway = {};          
          newGateway.id = -1
          newGateway.aliasName = action.payload.values.GatewayName
          newGateway.piInterfaceRootUrl = action.payload.values.GatewayURL
          newGateway.externalSystemLogin = action.payload.values.GatewayLogin
          newGateway.externalSystemPwd = action.payload.values.GatewayPassword
          newState.gateway.Gateways.push(newGateway) 
        }
    }
    return newState
  }
}

const initialState = {
  error: null,
  gateway:getGatewayInfo(),  
  EditableGateway: {},
  showAddModal:false,

};

export default function gateWayReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}


