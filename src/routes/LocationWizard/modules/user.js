import {getUserInfo} from 'api/locationWizardApi'

export const BIND_USER_INFO = 'BIND_USER_INFO'

export function bindUserInformation() {	  
  return {
    type: BIND_USER_INFO,
    payload: getUserInfo()
  };

};

export const ACTION_HANDLERS = { 
  [BIND_USER_INFO]: (state, action) => {
    return  Object.assign({},state,{userInfo:action.payload})
  }
}
const initialState = {
  error: null,
  userInformation:getUserInfo()
};

export default function userInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}