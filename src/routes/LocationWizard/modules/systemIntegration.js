import {getSystemIntegrationTypes} from "api/locationWizardApi"

export const ADD_MODAL = "ADD_MODAL"
export const SYSTEM_INTEGRATION_TYPES = "SYSTEM_INTEGRATION_TYPES"
export const ADD_SYSTEM_INTEGRATION = "ADD_SYSTEM_INTEGRATION"
export const DELETE_SYS_INTEGRATION = "DELETE_SYS_INTEGRATION"
export const TOGGLE_TYPEAHEAD = "TOGGLE_TYPEAHEAD"
export const ALIAS_SAVE = "ALIAS_SAVE"

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
                    getState().form.SystemIntegrationForm.values ?
                    getState().form.SystemIntegrationForm.values.newSystemIntegration : null
            })
            dispatch({
                type: 'redux-form/DESTROY',
                meta: { form: "SystemIntegrationForm" },
                payload: ""
            })
        })
    }
};

export function toggleTypeahead() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({ type: TOGGLE_TYPEAHEAD })
            dispatch({
                type: 'redux-form/DESTROY',
                meta: { form: "SystemIntegrationForm" }, payload: ""
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

    [TOGGLE_TYPEAHEAD]: (state, action) => {
        return Object.assign({}, state, { dropDownShow: !state.dropDownShow })
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
                    stateObject.LocationMappingId = 0;
                }
                else {
                    newUnSelectedSysIntegrations.push(ssit);
                }
            })
            if (valuePresent == 0) {

                if (stateObject.LocationMappingId != 0) {
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
    }
}

const initialState = {
    error: "",
    systemIntegrationTypes: getSystemIntegrationTypes().GetOMSLocationWizardDataResult.AssignedLocationMappings,
    selectedSystemIntegrationTypes: [],
    unSelectedSystemIntegrationTypes: getSystemIntegrationTypes().GetOMSLocationWizardDataResult.AssignedLocationMappings,
    dropDownShow: true
};

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
