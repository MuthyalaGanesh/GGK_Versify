import {getMetricInfo} from 'api/locationWizardApi'
import {getGatewayInfo} from 'api/locationWizardApi'
import {getDataHistorian} from 'api/locationWizardApi'

export const GET_GATEWAY_INFO = 'GET_GATEWAY_INFO'
export const GET_DATAEHISTORIAN_INFO = 'GET_DATAEHISTORIAN_INFO'
export const GET_METRIC_INFO = 'GET_METRIC_INFO'
export const ADD_DATAHISTORIAN__MODAL = 'ADD_DATAHISTORIAN__MODAL'
export const ADD_DATAHISTORIAN = 'ADD_DATAHISTORIAN'
export const EDIT_DATAHISTORIAN = 'EDIT_DATAHISTORIAN'
export const UPDATE_DATAHISTORIAN = 'UPDATE_DATAHISTORIAN'
export const DELETE_DATAHISTORIAN = 'DELETE_DATAHISTORIAN'

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

export function AddDataHistorianModalToggle(){	
return{	
	type:ADD_DATAHISTORIAN__MODAL
	};
};

export function AddDataHistorian() { 
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: ADD_DATAHISTORIAN, payload: getState().form.DataHistorianForm })
    dispatch({type: 'redux-form/DESTROY',meta: {form: "DataHistorianForm"},payload: ""})
    })
  }
};

export function UpdateAddDataHistorian() { 
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: UPDATE_DATAHISTORIAN, payload: getState().form.DataHistorianForm})
      dispatch({type: 'redux-form/DESTROY',meta: {form: "DataHistorianForm"},payload: ""})
    })
  }
};

export function EditDataHistorian(index) { 
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: EDIT_DATAHISTORIAN, payload: index })
    })
  }
};

export function DeleteDataHistorian(index) { 
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: DELETE_DATAHISTORIAN, payload: index })
    })
  }
};

export const ACTION_HANDLERS = { 
  [GET_GATEWAY_INFO]: (state, action) => {
    return  Object.assign({},state,{gateway:action.payload})
  },
  [GET_METRIC_INFO]: (state, action) => {
    return  Object.assign({},state,{metrics:action.payload})
  },
  [GET_DATAEHISTORIAN_INFO]: (state, action) => {
    return  Object.assign({},state,{dataHistorian:action.payload})
  },
  [ADD_DATAHISTORIAN__MODAL]:(state,action)=>{
  	let newState = Object.assign({},state,{showAddDataHistorianModal:!state.showAddDataHistorianModal})    
    newState.AddNewDataHistorian = true
    newState.EditableDataHistorian = {}       
    return newState
  },
  [ADD_DATAHISTORIAN]: (state, action) => {    
    console.log(state);
    var newState = Object.assign({}, state, { showAddModal:!state.showAddModal })
    if (action.payload != null) { 
      if (action.payload.values.metric) {
          var newDataHistorian = {};          
          newDataHistorian.id = 0
          newDataHistorian.metricId = action.payload.values.metric
          newDataHistorian.metricName = action.payload.values.metric
          newDataHistorian.metricDescription = action.payload.values.metric
          newDataHistorian.isDigitalState = action.payload.values.GatewayPassword
          newDataHistorian.scadaTag = action.payload.values.GatewayURL
          newDataHistorian.scadaServerAliasName = action.payload.values.GatewayURL
          newDataHistorian.scadaServerId = action.payload.values.GatewayURL
          newDataHistorian.locationId = '11020321'
          newState.dataHistorian.push(newDataHistorian)
        }
    }
    return newState
  },
  [EDIT_DATAHISTORIAN]: (state, action) => {
    if (!isNaN(action.payload) && state.dataHistorian) {
      let EditData = state.dataHistorian[action.payload]
      state.EditableDataHistorian.Id = EditData.id 
      state.EditableDataHistorian.metricId = EditData.aliasName
      state.EditableDataHistorian.isDigitalState = EditData.piInterfaceRootUrl 
      state.EditableDataHistorian.scadaTag = EditData.externalSystemLogin
      state.EditableDataHistorian.scadaServerId = EditData.externalSystemPwd
      state.EditableDataHistorian.index = action.payload
    }
    let newState = Object.assign({}, state, { showAddDataHistorianModal: !state.shshowAddDataHistorianModalowAddModal })
    newState.AddNewDataHistorian = false    
    return newState
  },
  [UPDATE_DATAHISTORIAN]:(state,action)=>{
     let updatedDataHistorian=[]; 
    if (action.payload) {            
            state.dataHistorian.map((dh,i)  => {
              if(state.EditableDataHistorian != null && !isNaN(state.EditableDataHistorian.index))
              {
                if (i!=state.EditableDataHistorian.index) {
                    updatedGateways.push(dh)
                }
                else{
                    var newData = {};
                    newData.id = dh.id
                    newData.aliasName = action.payload.fields.GatewayName && action.payload.fields.GatewayName.touched ? action.payload.values.GatewayName : dh.aliasName
                    newData.piInterfaceRootUrl = action.payload.fields.GatewayURL && action.payload.fields.GatewayURL.touched ? action.payload.values.GatewayURL : dh.piInterfaceRootUrl
                    newData.externalSystemLogin = action.payload.fields.GatewayLogin && action.payload.fields.GatewayLogin.touched ? action.payload.values.GatewayLogin : dh.externalSystemLogin
                    newData.externalSystemPwd = action.payload.fields.GatewayPassword && action.payload.fields.GatewayPassword.touched ? action.payload.values.GatewayPassword : dh.externalSystemPwd
                    updatedGateways.push(newData) 
                }
              }                
            });
        }
     return Object.assign({},state,{dataHistorian:updatedDataHistorian,showAddDataHistorianModal: !state.showAddDataHistorianModal })
  },
  [DELETE_DATAHISTORIAN]:(state,action)=>{ 
    let updatedDataHistorian=[];     
    if (action.payload) {            
            state.dataHistorian.map((dh,i) => {
                if (i!=action.payload) {
                    updatedGateways.push(dh)
                }
            });
        }
     return Object.assign({},state,{dataHistorian:updatedDataHistorian})
  }
}

const initialState = {
  error: null,
  dataHistorian:getDataHistorian(),  
  EditableDataHistorian: {},
  metrics : getMetricInfo(),
  gateways  :getGatewayInfo(),
  showAddDataHistorianModal:false 
};

export default function dataHistorianReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}

