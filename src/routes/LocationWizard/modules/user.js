import {getUserInfo} from 'api/locationWizardApi'
import {getNewContactPopUpInfo} from 'api/locationWizardApi'

export const BIND_USER_INFO = 'BIND_USER_INFO'
export const BIND_CONTACT_TO_ROLE = 'BIND_CONTACT_TO_ROLE'
export const BIND_ROLE_TO_CONTACT = 'BIND_ROLE_TO_CONTACT'
export const SELECTED_CONTACT = 'SELECTED_CONTACT'
export const SELECTED_ROLE = 'SELECTED_ROLE'
export const ADD_CONTACT_MODAL = 'ADD_CONTACT_MODAL'

export function bindUserInformation() {	 
return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_USER_INFO,
        payload: getUserInfo()
      })
    })
  } 
};

export function AddContactModalToggle(){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({ type: ADD_CONTACT_MODAL})
    dispatch({type: 'redux-form/DESTROY',meta: {form: "UsersForm"},payload: ""})
    })
  }
}

export function bindContactToRole() { 
return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_CONTACT_TO_ROLE,
        payload:getState().form.UsersForm
      })
      dispatch({type: 'redux-form/DESTROY',meta: {form: "UsersForm"},payload: ""})
    })
  } 
};

export function bindRoleToContact() {  
return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_ROLE_TO_CONTACT,
        payload:getState().form.UsersForm
      })
      dispatch({type: 'redux-form/DESTROY',meta: {form: "UsersForm"},payload: ""})
    })
  } 
};

export function selectRole() { 
return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SELECTED_ROLE,
        payload: getState().form.UsersForm
      })
      dispatch({type: 'redux-form/DESTROY',meta: {form: "UsersForm"},payload: ""})
    })
  } 
};

export function selectContact() {   
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SELECTED_CONTACT,
        payload: getState().form.UsersForm
      })
      dispatch({type: 'redux-form/DESTROY',meta: {form: "UsersForm"},payload: ""})
    })
  } 
};

export const ACTION_HANDLERS = { 
  [BIND_USER_INFO]: (state, action) => {
    return  Object.assign({},state,{userInfo:action.payload})
  },
  [ADD_CONTACT_MODAL]:(state, action)=>{
    if(state.showAddContactModal)
    {
      return  Object.assign({},state,{showAddContactModal : !state.showAddContactModal}) 
    }
    else
    {
      return  Object.assign({},state,{newContactPopUp : getNewContactPopUpInfo(), showAddContactModal : !state.showAddContactModal}) 
    }
  },
  [BIND_CONTACT_TO_ROLE]: (state, action) => {
      let Roleindex  = state.userInformation.Roles.findIndex( (r) => r.Id === state.selectedRole.Id );
      var newstate = Object.assign({},state)
      newstate.defaultContacts = action.payload.values.contactsByRoles.map((c)=> c.Id)
      newstate.userInformation.Roles[Roleindex].ContactIds = newstate.defaultContacts;
      return newstate;
  },
  [BIND_ROLE_TO_CONTACT]: (state, action) => { 
      let Contactindex  = state.userInformation.Contacts.findIndex( (c) => c.Id === state.selectedContact.Id );
      var newstate = Object.assign({},state)
      newstate.defaultRoles = action.payload.values.RoleByContact.map((r)=> r.Id)
      newstate.userInformation.Contacts[Contactindex].RolesIds = newstate.defaultRoles;
      return newstate;
  },
  [SELECTED_ROLE]: (state, action) => {
    if(action.payload.values)
    {
      let Role = action.payload.values.RoleByRoles;
      let defaultContact = Role.ContactIds;
      return Object.assign({},state,{selectedRole : Role , defaultContacts : defaultContact})
    }    
  },
  [SELECTED_CONTACT]: (state, action) => {
    if(action.payload.values)
    {
      let Contact= action.payload.values.ContactsByContact;
      let defaultRole = Contact.RolesIds;
      return Object.assign({},state,{selectedContact : Contact , defaultRoles : defaultRole})
    } 
  }
}
const initialState = {
  error: null,
  userInformation:getUserInfo(),
  selectedRole : {},
  selectedContact : {},
  defaultContacts : [],
  defaultRoles : [],
  newContactPopUp : {},
  showAddContactModal : false
};

export default function userInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}