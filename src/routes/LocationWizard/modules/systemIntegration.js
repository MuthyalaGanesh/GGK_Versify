import {getSystemIntegrationTypes} from "api/locationWizardApi"

export const ADD_MODAL = "ADD_MODAL"
export const SYSTEM_INTEGRATION_TYPES = "SYSTEM_INTEGRATION_TYPES"
export const ADD_SYSTEM_INTEGRATION = "ADD_SYSTEM_INTEGRATION"
export const DELETE_SYS_INTEGRATION = "DELETE_SYS_INTEGRATION"
export const ALIAS_SAVE = "ALIAS_SAVE"
export const STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION = "STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION"
export const GET_SYSTEM_INTEGRATION_TYPE_SERVICE = "GET_SYSTEM_INTEGRATION_TYPE_SERVICE"

export function AliasGiven() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: ALIAS_SAVE,
                payload: getState().form.SystemIntegrationForm
            })
        })
    }
}

export function editSystemIntegration(locationSystemIntegrations) {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            getSystemIntegrationTypes().then(function(response){
                 dispatch({
                    type: STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION,
                    payload: {
                        error: "",
                        systemIntegrationTypes: response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings,
                        selectedSystemIntegrationTypes: locationSystemIntegrations,
                        unSelectedSystemIntegrationTypes: []
                    }
                })
            })
        })
    }
}
export function deleteSystemIntegration(index) {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: DELETE_SYS_INTEGRATION, payload: index
            })
            dispatch({
                type: 'redux-form/DESTROY',
                meta: { form: "SystemIntegrationForm" },
                payload: ""
            })
        })
    }
}

export function AddSystemIntegration() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({
                type: ADD_SYSTEM_INTEGRATION,
                payload: getState().form.SystemIntegrationForm &&
                    getState().form.SystemIntegrationForm.values &&
                    getState().form.SystemIntegrationForm.values.newSystemIntegration ?
                    getState().form.SystemIntegrationForm.values.newSystemIntegration.ExternalSystemName : null
            })
            dispatch({
                type: 'redux-form/DESTROY',
                meta: { form: "SystemIntegrationForm" },
                payload: ""
            })
        })
    }
};


export function getSystemIntegrationTypesService() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
           getSystemIntegrationTypes().then(function(response){
                 dispatch({
                    type: GET_SYSTEM_INTEGRATION_TYPE_SERVICE, 
                    payload:  response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings
                })
           })
        })
    }
}

export const ACTION_HANDLERS = {
    [ALIAS_SAVE]: (state, action) => {
        var newState = Object.assign({}, state)
        if (action.payload && action.payload.values) {
            action.payload.values.AliasName.map((alias, index) => {
                if (alias) {
                    newState.selectedSystemIntegrationTypes[index].AliasName = alias;
                }
            })
        }
        return newState;
    },

    [ADD_SYSTEM_INTEGRATION]: (state, action) => {

        if (action.payload) {
            var stateObject = {};
            var newSelectedSysIntegrations = [];
            var newUnSelectedSysIntegrations = [];
            var valuePresent = 0;
            state.selectedSystemIntegrationTypes.map(sel => {
                newSelectedSysIntegrations.push(sel)
                if (sel.ExternalSystemName == action.payload) {
                    valuePresent++;
                }
            })
            state.systemIntegrationTypes.map(ssit => {
                if (ssit.ExternalSystemName == action.payload) {
                    stateObject = ssit;
                    stateObject.LocationMappingId = ssit.LocationMappingId < 0 ? 0 : ssit.LocationMappingId;
                }
                else {
                    newUnSelectedSysIntegrations.push(ssit);
                }
            })
            if (valuePresent == 0) {

                if (stateObject.LocationMappingId == null || stateObject.LocationMappingId == undefined) {
                    stateObject = new Object({
                        LocationMappingId: 0,
                        ExternalSystemName: action.payload,
                        AliasName: "",
                        ExternalSystemLogin: "",
                        ExternalSystemPwd: "",
                        ParameterList: "",
                        FlaggedForDeletion: false
                    })
                }
                newSelectedSysIntegrations.push(stateObject);
            }
            return Object.assign({}, state, {
                selectedSystemIntegrationTypes: newSelectedSysIntegrations,
                unSelectedSystemIntegrationTypes: newUnSelectedSysIntegrations

            });

        }
        return Object.assign({}, state)
    },

    [DELETE_SYS_INTEGRATION]: (state, action) => {
        if (action.payload != null && action.payload != undefined && !isNaN(action.payload)) {
            var newSystemIntegrations = [];
            var newUnSelectedSysIntegrations = state.unSelectedSystemIntegrationTypes;
            state.selectedSystemIntegrationTypes.map((ssit, index) => {
                if (index != action.payload) {
                    newSystemIntegrations.push(ssit)
                }
                else {
                    ssit.LocationMappingId = -1;
                    newUnSelectedSysIntegrations.push(ssit)
                }
            })
        }

        return Object.assign({}, state, {
            selectedSystemIntegrationTypes: newSystemIntegrations,
            unSelectedSystemIntegrationTypes: newUnSelectedSysIntegrations
        })
    },
    [STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION]: (state, action) => {
        return action.payload
    },
    [GET_SYSTEM_INTEGRATION_TYPE_SERVICE]: (state, action) => {
            return Object.assign({}, state, {
            systemIntegrationTypes: action.payload
        })
    }
}

const initialState = {
    error: "",
    systemIntegrationTypes: [],
    selectedSystemIntegrationTypes: [],
    unSelectedSystemIntegrationTypes: []
};

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
