import {getLocationTypes} from 'api/locationWizardApi'

export const BIND_LOCATION_TYPES = 'BIND_LOCATION_TYPES'
export function bindLocationTypes() {
  console.log("Bind Locations");
  return {
    type: BIND_LOCATION_TYPES,
    payload: getLocationTypes()
  };

};
export function test (){
  return (dispatch,getState) => {
     console.log("state-",getState().form)
    return new Promise ((resolve)=>{
    console.log("state pro-",getState().form)
    } )}
}
export const ACTION_HANDLERS = { 
  [BIND_LOCATION_TYPES]: (state, action) => {
    return  Object.assign({},state,{locationTypes:action.payload})
  }
}
const initialState = {
  error: null,
  locationTypes:{}
};

export default function basiInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}