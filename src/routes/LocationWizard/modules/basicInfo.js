import {getLocationTypes} from "api/locationWizardApi"
export const BIND_LOCATION_TYPES = 'BIND_LOCATION_TYPES';

export function bindLocationTypes(){
 console.log(getLocationTypes);
 return{
type:BIND_LOCATION_TYPES,
payload:getLocationTypes()
 };
      
};

const ACTION_HANDLERS = {
 [BIND_LOCATION_TYPES]: (state, action) => {
    return {
         error: state.error,
     locationTypes: action.payload
    };
  }
}
const initialState = {  
  error: null,
  locationTypes:{}
};

export const actions ={
   bindLocationTypes 
}
export default function basicInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log("Reducer",state);

  return handler ? handler(state, action) : state;
}