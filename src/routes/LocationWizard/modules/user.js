import {
  getUserInfo
} from 'api/locationWizardApi'
import {
  getNewContactPopUpInfo
} from 'api/locationWizardApi'

export const BIND_USER_INFO = 'BIND_USER_INFO'
export const BIND_CONTACT_TO_ROLE = 'BIND_CONTACT_TO_ROLE'
export const BIND_ROLE_TO_CONTACT = 'BIND_ROLE_TO_CONTACT'
export const SELECTED_CONTACT = 'SELECTED_CONTACT'
export const SELECTED_ROLE = 'SELECTED_ROLE'
export const ADD_CONTACT_MODAL = 'ADD_CONTACT_MODAL'
export const SELECTED_ALL_CONTACT = 'SELECTED_ALL_CONTACT'
export const SELECTED_ALL_ROLE = 'SELECTED_ALL_ROLE'
export const UNSELECTED_ALL_CONTACT = 'UNSELECTED_ALL_CONTACT'
export const UNSELECTED_ALL_ROLE = 'UNSELECTED_ALL_ROLE'
export const SAVE_NEW_CONTACT = 'SAVE_NEW_CONTACT'


export function selectAllContacts() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SELECTED_ALL_CONTACT,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

export function selectAllRoles() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SELECTED_ALL_ROLE,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

export function unSelectAllContacts() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: UNSELECTED_ALL_CONTACT,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

export function unSelectAllRoles() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: UNSELECTED_ALL_ROLE,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

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

export function AddContactModalToggle() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: ADD_CONTACT_MODAL
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
}

export function saveNewContact(){
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SAVE_NEW_CONTACT,
        payload:getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
}

export function bindContactToRole() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_CONTACT_TO_ROLE,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

export function bindRoleToContact() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_ROLE_TO_CONTACT,
        payload: getState().form.UsersForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
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
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
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
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "UsersForm"
        },
        payload: ""
      })
    })
  }
};

export const ACTION_HANDLERS = {
  [BIND_USER_INFO]: (state, action) => {
    return Object.assign({}, state, {
      userInfo: action.payload
    })
  },
  [ADD_CONTACT_MODAL]: (state, action) => {
    if (state.showAddContactModal) {
      return Object.assign({}, state, {
        showAddContactModal: !state.showAddContactModal
      })
    } else {
      return Object.assign({}, state, {
        newContactPopUp: getNewContactPopUpInfo(),
        showAddContactModal: !state.showAddContactModal
      })
    }
  },
  [SAVE_NEW_CONTACT]:(state,action)=>{
      let newContact = {}
      if (action.payload) {
      return Object.assign({}, state, {
        showAddContactModal: !state.showAddContactModal
      })
    }
  },
  [BIND_CONTACT_TO_ROLE]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let Roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id);
    let defaultContact = action.payload.values.contactsByRoles.map((c) => c.Id)
    userInformation.Roles[Roleindex].ContactIds = defaultContact;
    if (saveRoles.length == 0) {
      saveRoles.push(userInformation.Roles[Roleindex]);
    } else {
      let savedRoleIndex = saveRoles.findIndex((r) => r.Id === state.selectedRole.Id);
      savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[Roleindex] : saveRoles.push(userInformation.Roles[Roleindex])
    }
    let defaultRole = []
    let Contact = state.selectedContact;
    if (Contact != undefined || Contact != null && Contact.Id != undefined && Contact.Id != null) {
      userInformation.Roles.map((role) => {
        if (role.ContactIds.indexOf(Contact.Id) >= 0) {
          defaultRole.push(role.Id)
        }
      })
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRole,
      defaultContacts: defaultContact,
      saveRoles: saveRoles
    })
  },
  [BIND_ROLE_TO_CONTACT]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let defaultContacts = []
    let defaultRoles = []
    defaultRoles = action.payload.values.RoleByContact.map((r) => r.Id)
    let mappedRole = [];
    userInformation.Roles.map((role) => {
      if (role.ContactIds.indexOf(state.selectedContact.Id) >= 0) {
        mappedRole.push(role.Id)
      }
    })
    if (defaultRoles != undefined && defaultRoles != null) {
      defaultRoles.map((role) => {
        if (mappedRole.indexOf(role) < 0) {
          let roleindex = userInformation.Roles.findIndex((r) => r.Id === role);
          userInformation.Roles[roleindex].ContactIds.push(state.selectedContact.Id);
          if (saveRoles.length == 0) {
            saveRoles.push(userInformation.Roles[roleindex]);
          } else {
            let savedRoleIndex = saveRoles.findIndex((r) => r.Id === userInformation.Roles[roleindex].Id);
            savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[roleindex] : saveRoles.push(userInformation.Roles[roleindex])
          }
        }
      })
      if (mappedRole != undefined && mappedRole != null) {
        mappedRole.map((role) => {
          if (defaultRoles.indexOf(role) < 0) {
            let contactIds = []
            let roleindex = userInformation.Roles.findIndex((r) => r.Id === role);
            let contactindex = userInformation.Roles[roleindex].ContactIds.indexOf(state.selectedContact.Id);
            userInformation.Roles[roleindex].ContactIds.map((Ids, i) => {
              if (i != contactindex) {
                contactIds.push(Ids)
              }
            })
            userInformation.Roles[roleindex].ContactIds = contactIds
            if (saveRoles.length == 0) {
              saveRoles.push(userInformation.Roles[roleindex]);
            } else {
              let savedRoleIndex = saveRoles.findIndex((r) => r.Id === userInformation.Roles[roleindex].Id);
              savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[roleindex] : saveRoles.push(userInformation.Roles[roleindex])
            }
          }
        })
      }
      if (state.selectedRole != undefined && state.selectedRole != null) {
        let roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id)
        if (roleindex >= 0) {
          userInformation.Roles[roleindex].ContactIds.map((c) => defaultContacts.push(c))
          if (saveRoles.length == 0) {
            saveRoles.push(userInformation.Roles[roleindex]);
          } else {
            let savedRoleIndex = saveRoles.findIndex((r) => r.Id === userInformation.Roles[roleindex].Id);
            savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[roleindex] : saveRoles.push(userInformation.Roles[roleindex])
          }
        }
      }
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRoles,
      defaultContacts: defaultContacts,
      saveRoles: saveRoles
    })
  },
  [SELECTED_ROLE]: (state, action) => {
    if (action.payload.values) {
      let Role = action.payload.values.RoleByRoles;
      if (Role == undefined || Role == null) {
        let defaultContact = [];
        return Object.assign({}, state, {
          selectedRole: {},
          defaultContacts: [],
          disableContacts: true
        })
      } else {
        let defaultContact = []
        defaultContact = Role.ContactIds;
        return Object.assign({}, state, {
          selectedRole: Role,
          defaultContacts: defaultContact,
          disableContacts: false
        })
      }
    }
  },
  [SELECTED_CONTACT]: (state, action) => {
    if (action.payload.values) {
      let Contact = action.payload.values.ContactsByContact;
      if (Contact == undefined || Contact == null) {
        return Object.assign({}, state, {
          selectedContact: {},
          defaultRoles: [],
          disableRoles: true
        })
      } else {
        let defaultRole = [];
        state.userInformation.Roles.map((role) => {
          if (role.ContactIds.indexOf(Contact.Id) >= 0) {
            defaultRole.push(role.Id)
          }
        })
        return Object.assign({}, state, {
          selectedContact: Contact,
          defaultRoles: defaultRole,
          disableRoles: false
        })
      }
    }
  },
  [SELECTED_ALL_CONTACT]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let Roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id);
    let defaultContact = []
    let defaultRole = []
    let Contact = state.selectedContact;
    defaultContact = userInformation.Contacts.map((c) => c.Id)
    userInformation.Roles[Roleindex].ContactIds = defaultContact;
    if (saveRoles.length == 0) {
      saveRoles.push(userInformation.Roles[Roleindex]);
    } else {
      let savedRoleIndex = saveRoles.findIndex((r) => r.Id === state.selectedRole.Id);
      savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[Roleindex] : saveRoles.push(userInformation.Roles[Roleindex])
    }
    if (Contact != undefined || Contact != null && Contact.Id != undefined && Contact.Id != null) {
      userInformation.Roles.map((role) => {
        if (role.ContactIds.indexOf(Contact.Id) >= 0) {
          defaultRole.push(role.Id)
        }
      })
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRole,
      defaultContacts: defaultContact,
      saveRoles: saveRoles
    })
  },
  [SELECTED_ALL_ROLE]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let defaultContact = []
    let defaultRoles = []
    defaultRoles = userInformation.Roles.map((role)=>role.Id)
    userInformation.Roles.map((role, i) => {
      let contactindex = role.ContactIds.findIndex((c) => c = state.selectedContact.Id)
      if (contactindex != null && contactindex < 0) {
        userInformation.Roles[i].ContactIds.push(state.selectedContact.Id)
        if (saveRoles.length == 0) {
          saveRoles.push(userInformation.Roles[i]);
        } else {
          let savedRoleIndex = saveRoles.findIndex((r) => r.Id === role.Id);
          savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[i] : saveRoles.push(userInformation.Roles[i])
        }
      }
    })
    if (state.selectedRole != undefined && state.selectedRole != null) {
      let roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id)
      if (roleindex >= 0) {
        userInformation.Roles[roleindex].ContactIds.map((c) => defaultContact.push(c))
      }
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRoles,
      defaultContacts: defaultContact,
      saveRoles: saveRoles
    })
  },
  [UNSELECTED_ALL_CONTACT]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let Roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id);
    let defaultContact = []
    let defaultRole = []
    let Contact = state.selectedContact;
    userInformation.Roles[Roleindex].ContactIds = defaultContact;
    if (saveRoles.length == 0) {
      saveRoles.push(userInformation.Roles[Roleindex]);
    } else {
      let savedRoleIndex = saveRoles.findIndex((r) => r.Id === state.selectedRole.Id);
      savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[Roleindex] : saveRoles.push(userInformation.Roles[Roleindex])
    }
    if (Contact != undefined || Contact != null && Contact.Id != undefined && Contact.Id != null) {
      userInformation.Roles.map((role) => {
        if (role.ContactIds.indexOf(Contact.Id) >= 0) {
          defaultRole.push(role.Id)
        }
      })
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRole,
      defaultContacts: defaultContact,
      saveRoles: saveRoles
    })
  },
  [UNSELECTED_ALL_ROLE]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let defaultContact = []
    let defaultRoles = []
    let mappedRole = []
    userInformation.Roles.map((role) => {
      if (role.ContactIds.indexOf(state.selectedContact.Id) >= 0) {
        mappedRole.push(role.Id)
      }
    })
    if (mappedRole != undefined && mappedRole != null) {
      mappedRole.map((role) => {
        let contactIds = []
        let roleindex = userInformation.Roles.findIndex((r) => r.Id === role);
        let contactindex = userInformation.Roles[roleindex].ContactIds.indexOf(state.selectedContact.Id);
        userInformation.Roles[roleindex].ContactIds.map((Ids, i) => {
          if (i != contactindex) {
            contactIds.push(Ids)
          }
        })
        userInformation.Roles[roleindex].ContactIds = contactIds
        if (saveRoles.length == 0) {
          saveRoles.push(userInformation.Roles[roleindex]);
        } else {
          let savedRoleIndex = saveRoles.findIndex((r) => r.Id === userInformation.Roles[roleindex].Id);
          savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[roleindex] : saveRoles.push(userInformation.Roles[roleindex])
        }
      })
    }
    if (state.selectedRole != undefined && state.selectedRole != null) {
      let roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id)
      if (roleindex >= 0) {
        userInformation.Roles[roleindex].ContactIds.map((c) => defaultContact.push(c))
      }
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      defaultRoles: defaultRoles,
      defaultContacts: defaultContact,
      saveRoles: saveRoles
    })
  }
}
const initialState = {
  error: null,
  userInformation: getUserInfo(),
  selectedRole: {},
  selectedContact: {},
  defaultContacts: [],
  defaultRoles: [],
  newContactPopUp: {},
  showAddContactModal: false,
  disableRoles: true,
  disableContacts: true,
  saveRoles: []
};

export default function userInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}