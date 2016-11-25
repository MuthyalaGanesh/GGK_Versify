import {
  getUserInfo,
  getRoleInfo,
  getNewContactPopUpInfo,
  getContacts,
  addNewContact,
  getRolesByContact,
  getContactsByRole
} from 'api/locationWizardApi'

import {
  ConstantValues
} from "constants/constantValues"

import axios from 'axios'

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
export const BIND_LOCATION_USER_DATA = 'BIND_LOCATION_USER_DATA'
export const ROLE_BY_ROLE = 'ROLE_BY_ROLE'
export const ROLE_BY_CONTACT = 'ROLE_BY_CONTACT'
export const GET_USER_INFO_SERVICE = 'GET_USER_INFO_SERVICE'
export const SHOW_NEWCONTACT_ERRORS = 'SHOW_NEWCONTACT_ERRORS'
export const USERS_NEW_LOCATION = 'USERS_NEW_LOCATION'
export const CONTACT_SAVE_FAILURE = 'CONTACT_SAVE_FAILURE'
export const HIDE_SUCCESS = 'HIDE_SUCCESS'
export const HIDE_FAILED = 'HIDE_FAILED'

export function bindUserLocationData(assignedcontacts, locationId) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let info = {}
      info.assignedcontacts = assignedcontacts,
        info.locationId = locationId
      dispatch({
        type: BIND_LOCATION_USER_DATA,
        payload: info
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

export function AddContactModalToggle() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: ADD_CONTACT_MODAL,
        payload: getState().basic.timezones
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

export function setErrors() {
  let messages = {}
  messages.Name = ConstantValues.ERROR_NAME
  messages.Org = ConstantValues.ERROR_ORG
  messages.Type = ConstantValues.ERROR_TYPE
  messages.TimeZone = ConstantValues.ERROR_TIMEZONE
  messages.status = ConstantValues.ERROR_STATUS
  messages.userId = ConstantValues.ERROR_USERID
  messages.Password = ConstantValues.ERROR_PASSWORD
  messages.PrimaryEmail = ConstantValues.ERROR_PRIMARY_EMAIL
  return messages
}

export function mapContact(values) {
  let Contact = {}
  Contact.Id = 0
  Contact.Name = values.Name
  Contact.OrgId = values.Org != null && values.Org != undefined ? values.Org.id : null
  Contact.Title = values.Title
  Contact.ContactTypeId = values.Type != null && values.Type != undefined ? values.Type.id : null
  Contact.DefaultTimezone = values.TimeZone != null && values.TimeZone != undefined ? values.TimeZone.id : ""
  Contact.Phone1 = values.Primary != null && values.Primary != undefined ? values.Primary : ''
  Contact.Phone2 = values.Cell != null && values.Cell != undefined ? values.Cell : ''
  Contact.Phone3 = values.OtherPhone != null && values.OtherPhone != undefined ? values.OtherPhone : ''
  Contact.Email1 = values.PrimaryEmail != null && values.PrimaryEmail != undefined ? values.PrimaryEmail : ''
  Contact.Email2 = values.SecondaryEmail != null && values.SecondaryEmail != undefined ? values.SecondaryEmail : ''
  Contact.UDV1 = values.Custom1 != null && values.Custom1 != undefined ? values.Custom1 : ''
  Contact.UDV2 = values.Custom2 != null && values.Custom2 != undefined ? values.Custom2 : ''
  Contact.UDV3 = values.Custom3 != null && values.Custom3 != undefined ? values.Custom3 : ''
  Contact.UDV4 = values.Custom4 != null && values.Custom4 != undefined ? values.Custom4 : ''
  Contact.UDV5 = values.Custom5 != null && values.Custom5 != undefined ? values.Custom5 : ''
  Contact.Status = values.status != null && values.status != undefined ? values.status.id : null
  Contact.Login = values.userId != null && values.userId != undefined ? values.userId : ''
  Contact.Password = values.Password != null && values.Password != undefined ? values.Password : ''
  Contact.IsAdmin = values.SystemAdmin != null && values.SystemAdmin != undefined ? 'Y' : 'N'
  return Contact
}

export function saveNewContact() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let values
      getState().form.hasOwnProperty('UsersForm') && getState().form.UsersForm.hasOwnProperty('values') ?
        values = getState().form.UsersForm.values : null
      let messages = {}
      let invalid = false
      if (values != null) {
        if (!values.Name) {
          invalid = true
          messages.Name = ConstantValues.ERROR_NAME
        } else if (!values.Name.trim()) {
          invalid = true
          messages.Name = ConstantValues.ERROR_NAME
        }
        if (!values.Org) {
          invalid = true
          messages.Org = ConstantValues.ERROR_ORG
        }
        if (!values.Type) {
          invalid = true
          messages.Type = ConstantValues.ERROR_TYPE
        }
        if (!values.TimeZone) {
          invalid = true
          messages.TimeZone = ConstantValues.ERROR_TIMEZONE
        }
        if (!values.PrimaryEmail) {
          invalid = true
          messages.PrimaryEmail = ConstantValues.ERROR_PRIMARY_EMAIL
        } else if (!values.PrimaryEmail.trim()) {
          invalid = true
          messages.PrimaryEmail = ConstantValues.ERROR_PRIMARY_EMAIL
        }
        if (!values.status) {
          invalid = true
          messages.status = ConstantValues.ERROR_STATUS
        }
        if (!values.userId) {
          invalid = true
          messages.userId = ConstantValues.ERROR_USERID
        } else if (!values.userId.trim()) {
          invalid = true
          messages.userId = ConstantValues.ERROR_USERID
        }
        if (!values.Password) {
          invalid = true
          messages.Password = ConstantValues.ERROR_PASSWORD
        } else {
          messages.PasswordFormat = ConstantValues.ERROR_PASSWORD_FORMAT
          ConstantValues.PASSWORD_REGEX.test(values.Password) ? messages.PasswordFormat = null : invalid = true
        }
        if (invalid == true) {
          dispatch({
            type: SHOW_NEWCONTACT_ERRORS,
            payload: messages
          })
        } else {
          let Contact = mapContact(getState().form.UsersForm.values)
          var SaveObject = {
            "saveData": {
              Contact: Contact
            }
          }
          addNewContact(SaveObject).then(function(response) {
            dispatch({
              type: SAVE_NEW_CONTACT,
            })
            dispatch({
              type: 'redux-form/DESTROY',
              meta: {
                form: "UsersForm"
              },
              payload: ""
            })
          }).catch(function(error) {
            let messages = {}
            messages.failure = ConstantValues.NEWCONTACT_FAILURE
            dispatch({
              type: CONTACT_SAVE_FAILURE,
              payload: messages
            })
          });
        }
      } else {
        messages = setErrors()
        dispatch({
          type: SHOW_NEWCONTACT_ERRORS,
          payload: messages
        })
      }
    })
  }
}

export function getUserInfoService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().users.userInformation.length == 0 ?
        getUserInfo().then(function(contactsResponse) {
          getRoleInfo().then(function(rolesResponse) {
            let allcontacts = contactsResponse.data.GetAutoCompleteContactsResult.Contacts
            let userInfo = {
              Roles: rolesResponse.data.GetRolesResult.Roles,
              Contacts: allcontacts
            }
            dispatch({
              type: GET_USER_INFO_SERVICE,
              payload: userInfo
            })
          })
        }) : null
      dispatch({
        type: BIND_LOCATION_USER_DATA,
        payload: {
          locationId: 0
        }
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
      let locationId = getState().users.locationId;
      let fetchedRoles = getState().users.fetchedRoles;
      if (locationId === 0) {
        dispatch({
          type: SELECTED_ROLE,
          payload: getState().form.UsersForm
        })
      } else if (getState().form.UsersForm.values.RoleByRoles) {
        let roleinfo = {};
        roleinfo.roleByRole = getState().form.UsersForm.values.RoleByRoles
        if (fetchedRoles.findIndex((fetchedId) => fetchedId === roleinfo.roleByRole.Id) < 0) {
          getContactsByRole(locationId, roleinfo.roleByRole.Id).then(function(response) {
            if (response.data && response.data.GetLWContactsByRoleResult && response.data.GetLWContactsByRoleResult.Contacts) {
              let result = response.data.GetLWContactsByRoleResult.Contacts
              result.map((contact) => {
                if (roleinfo.roleByRole.ContactIds == undefined || roleinfo.roleByRole.ContactIds == null) {
                  roleinfo.roleByRole.ContactIds = []
                  roleinfo.roleByRole.ContactIds.push(contact.Id)
                } else if (roleinfo.roleByRole.ContactIds.findIndex((id) => id === contact.Id) < 0) {
                  roleinfo.roleByRole.ContactIds.push(contact.Id)
                }
              })
            }
            dispatch({
              type: ROLE_BY_ROLE,
              payload: roleinfo
            })
          }).catch(function(error) {
            alert("error" + JSON.stringify(error));
          });
        } else {
          dispatch({
            type: SELECTED_ROLE,
            payload: getState().form.UsersForm
          })
        }
      } else {
        dispatch({
          type: SELECTED_ROLE,
          payload: getState().form.UsersForm
        })
      }
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
      let locationId = getState().users.locationId;
      let fetchedContacts = getState().users.fetchedContacts;
      if (locationId === 0) {
        dispatch({
          type: SELECTED_CONTACT,
          payload: getState().form.UsersForm
        })
      } else if (getState().form.UsersForm.values.ContactsByContact) {
        let roleinfo = {};
        roleinfo.contactsByContacts = getState().form.UsersForm.values.ContactsByContact
        if (fetchedContacts.findIndex((fetchedId) => fetchedId === roleinfo.contactsByContacts.Id) < 0) {
          getRolesByContact(locationId, roleinfo.contactsByContacts.Id).then(function(response) {
            if (response.data && response.data.GetLWRolesByContactResult) {
              roleinfo.roles = response.data.GetLWRolesByContactResult.Roles
              roleinfo.sharedRoles = response.data.GetLWRolesByContactResult.ContactsWhoShareRoles
            }
            dispatch({
              type: ROLE_BY_CONTACT,
              payload: roleinfo
            })
          }).catch(function(error) {
            alert("error" + JSON.stringify(error));
          });
        } else {
          dispatch({
            type: ROLE_BY_CONTACT,
            payload: getState().form.UsersForm
          })
        }
      } else {
        dispatch({
          type: SELECTED_CONTACT,
          payload: getState().form.UsersForm
        })
      }
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

export function validateContact() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let users = getState().users
      if (users.error) {
        let values = {}
        let messages = {}
        getState().form.hasOwnProperty('UsersForm') && getState().form.UsersForm.hasOwnProperty('values') ?
          values = getState().form.UsersForm.values : null
        if (values != null) {
          values.Name && values.Name.trim() ? messages.Name = null : messages.Name = ConstantValues.ERROR_NAME
          values.Org ? messages.Org = null : messages.Org = ConstantValues.ERROR_ORG
          values.Type ? messages.Type = null : messages.Type = ConstantValues.ERROR_TYPE
          values.TimeZone ? messages.TimeZone = null : messages.TimeZone = ConstantValues.ERROR_TIMEZONE
          values.PrimaryEmail && values.PrimaryEmail.trim() ? messages.PrimaryEmail = null : messages.PrimaryEmail = ConstantValues.ERROR_PRIMARY_EMAIL
          values.status ? messages.status = null : messages.status = ConstantValues.ERROR_STATUS
          values.userId && values.userId.trim() ? messages.userId = null : messages.userId = ConstantValues.ERROR_USERID
          values.Password ? messages.Password = null : messages.Password = ConstantValues.ERROR_PASSWORD
          values.Password ? ConstantValues.PASSWORD_REGEX.test(values.Password) ? messages.PasswordFormat = null : messages.PasswordFormat = ConstantValues.ERROR_PASSWORD_FORMAT : messages.PasswordFormat = null
        } else {
          messages = setErrors()
        }
        dispatch({
          type: SHOW_NEWCONTACT_ERRORS,
          payload: messages
        })
      }
    })
  }
};

export function clearSuccess() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: HIDE_SUCCESS
      })
    })
  }
};

export function clearFailure() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: HIDE_FAILED
      })
    })
  }
};

export const ACTION_HANDLERS = {
  [ADD_CONTACT_MODAL]: (state, action) => {
    if (state.showAddContactModal) {
      return Object.assign({}, state, {
        showAddContactModal: !state.showAddContactModal,
        error: null,
        validationMessages: {}
      })
    } else {
      if (!state.newContactPopUp.hasOwnProperty('Timezones')) {
        var contactInfo = getNewContactPopUpInfo();
        contactInfo.Timezones = action.payload
        return Object.assign({}, state, {
          error: null,
          validationMessages: {},
          newContactPopUp: contactInfo,
          showAddContactModal: !state.showAddContactModal,

        })
      }
      return Object.assign({}, state, {
        error: null,
        validationMessages: {},
        showAddContactModal: !state.showAddContactModal
      })

    }
  },
  [SAVE_NEW_CONTACT]: (state, action) => {
    let userInformation = state.userInformation
    let validationMessages = {}
    validationMessages.success = ConstantValues.NEWCONTACT_SUCCESS
    userInformation.Contacts = getContacts()
    return Object.assign({}, state, {
      error: null,
      validationMessages: validationMessages,
      userInformation: userInformation
    })
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
    defaultRoles = userInformation.Roles.map((role) => role.Id)
    userInformation.Roles.map((role, i) => {
      let contactindex = role.ContactIds.findIndex((c) => c === state.selectedContact.Id)
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
  },
  [BIND_LOCATION_USER_DATA]: (state, action) => {
    let userInfo = state.userInformation
    if (userInfo.Roles) {
      userInfo.Roles.map((role) => {
        role.ContactIds = []
      })
    }
    return Object.assign({}, state, {
      userInfo: userInfo,
      locationId: action.payload.locationId,
      selectedRole: {},
      selectedContact: {},
      defaultContacts: [],
      defaultRoles: [],
      newContactPopUp: {},
      showAddContactModal: false,
      disableRoles: true,
      disableContacts: true,
      saveRoles: [],
      fetchedRoles: [],
      fetchedContacts: []
    })
  },
  [ROLE_BY_ROLE]: (state, action) => {
    let saveRoles = state.saveRoles
    let userInformation = state.userInformation
    let selectedRole = action.payload.roleByRole
    let roleContacts = action.payload.roleByRole.ContactIds
    let fetchedRoles = state.fetchedRoles
    if (fetchedRoles.findIndex((fetchedId) => fetchedId === selectedRole.Id) < 0) {
      fetchedRoles.push(selectedRole.Id)
    }
    let index = userInformation.Roles.findIndex((role) => role.Id === selectedRole.Id)
    let defaultRoles = []
    let defaultContacts = []
    if (index >= 0) {
      defaultContacts = userInformation.Roles[index].ContactIds
      if (saveRoles != null && saveRoles.length == 0) {
        saveRoles.push(userInformation.Roles[index])
      } else {
        let savedRoleIndex = saveRoles.findIndex((role) => role.Id === selectedRole.Id)
        savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[index] : saveRoles.push(userInformation.Roles[index])
      }
      let Contact = state.selectedContact;
      if (Contact != undefined || Contact != null && Contact.Id != undefined && Contact.Id != null) {
        userInformation.Roles.map((role) => {
          if (role.ContactIds.indexOf(Contact.Id) >= 0) {
            defaultRoles.push(role.Id)
          }
        })
      }
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      selectedRole: selectedRole,
      defaultRoles: defaultRoles,
      defaultContacts: defaultContacts,
      saveRoles: saveRoles,
      fetchedRoles: fetchedRoles,
      disableContacts: false
    })
  },
  [ROLE_BY_CONTACT]: (state, action) => {
    let saveRoles = state.saveRoles
    let fetchedRoles = state.fetchedRoles
    let fetchedContacts = state.fetchedContacts
    let userInformation = state.userInformation
    let selectedContact = action.payload.contactsByContacts
    if (fetchedContacts.findIndex((fetchedId) => fetchedId === selectedContact.Id) < 0) {
      fetchedContacts.push(selectedContact.Id)
    }
    let mappedRoles = action.payload.roles
    let sharedRoles = action.payload.sharedRoles
    let defaultRoles = []
    let defaultContacts = []
    if (mappedRoles && mappedRoles.length > 0) {
      mappedRoles.map((mappedrole) => {
        let index = userInformation.Roles.findIndex((role) => role.Id === mappedrole.Id)
        if (index >= 0 &&
          userInformation.Roles[index].ContactIds.findIndex((contact) => contact === selectedContact.Id) < 0) {
          userInformation.Roles[index].ContactIds.push(selectedContact.Id)
          if (saveRoles != null && saveRoles.length == 0) {
            saveRoles.push(userInformation.Roles[index])
          } else {
            let savedRoleIndex = saveRoles.findIndex((role) => role.Id === mappedrole.Id)
            savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[index] : saveRoles.push(userInformation.Roles[index])
          }
        }
      })
    }
    if (sharedRoles && sharedRoles.length > 0) {
      sharedRoles.map((sharedRole) => {
        let index = userInformation.Roles.findIndex((role) => role.Id === sharedRole.RoleId)
        let fetchedindex = fetchedRoles.findIndex((id) => id === sharedRole.RoleId)
        if (index >= 0 && fetchedindex < 0 &&
          userInformation.Roles[index].ContactIds.findIndex((contact) => contact === sharedRole.ContactId) < 0) {
          userInformation.Roles[index].ContactIds.push(sharedRole.ContactId)
          if (saveRoles != null && saveRoles.length == 0) {
            saveRoles.push(userInformation.Roles[index])
          } else {
            let savedRoleIndex = saveRoles.findIndex((role) => role.Id === sharedRole.RoleId)
            savedRoleIndex >= 0 ? saveRoles[savedRoleIndex] = userInformation.Roles[index] : saveRoles.push(userInformation.Roles[index])
          }
        }
      })
      sharedRoles.map((sharedRole) => {
        if (fetchedRoles.findIndex((id) => id === sharedRole.RoleId) < 0) {
          fetchedRoles.push(sharedRole.RoleId);
        }
      })
    }
    let Contact = selectedContact;
    if (Contact != undefined || Contact != null && Contact.Id != undefined && Contact.Id != null) {
      userInformation.Roles.map((role) => {
        if (role.ContactIds.indexOf(Contact.Id) >= 0) {
          defaultRoles.push(role.Id)
        }
      })
    }
    if (state.selectedRole != undefined && state.selectedRole != null) {
      let roleindex = userInformation.Roles.findIndex((r) => r.Id === state.selectedRole.Id)
      if (roleindex >= 0) {
        userInformation.Roles[roleindex].ContactIds.map((c) => defaultContacts.push(c))
      }
    }
    return Object.assign({}, state, {
      userInformation: userInformation,
      selectedContact: selectedContact,
      defaultRoles: defaultRoles,
      defaultContacts: defaultContacts,
      saveRoles: saveRoles,
      fetchedContacts: fetchedContacts,
      fetchedRoles: fetchedRoles,
      disableRoles: false
    })
  },
  [GET_USER_INFO_SERVICE]: (state, action) => {
    return Object.assign({}, state, {
      userInformation: action.payload,
      selectedRole: {},
      selectedContact: {},
      defaultContacts: [],
      defaultRoles: [],
      showAddContactModal: false,
      disableRoles: true,
      disableContacts: true,
      saveRoles: [],
      fetchedRoles: [],
      fetchedContacts: [],
      locationId: 0

    })
  },
  [SHOW_NEWCONTACT_ERRORS]: (state, action) => {
    return Object.assign({}, state, {
      error: 1,
      validationMessages: action.payload
    })
  },
  [CONTACT_SAVE_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      validationMessages: action.payload
    })
  },
  [HIDE_SUCCESS]: (state, action) => {
    let validations = state.validationMessages
    let validationMessages = Object.assign({}, validations, {
      success: null
    })
    return Object.assign({}, state, {
      validationMessages: validationMessages
    })
  },
  [HIDE_FAILED]: (state, action) => {
    let validations = state.validationMessages
    let validationMessages = Object.assign({}, validations, {
      failure: null
    })
    return Object.assign({}, state, {
      validationMessages: validationMessages
    })
  }
}
const initialState = {
  error: null,
  userInformation: [],
  selectedRole: {},
  selectedContact: {},
  defaultContacts: [],
  defaultRoles: [],
  newContactPopUp: {},
  showAddContactModal: false,
  disableRoles: true,
  disableContacts: true,
  saveRoles: [],
  assignedcontacts: [],
  locationId: 0,
  fetchedRoles: [],
  fetchedContacts: [],
  validationMessages: {}
};

export default function userInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}