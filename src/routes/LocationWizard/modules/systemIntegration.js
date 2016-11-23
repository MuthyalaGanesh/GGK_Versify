import {getSystemIntegrationTypes} from "api/locationWizardApi"

export const ADD_MODAL = "ADD_MODAL"
export const SYSTEM_INTEGRATION_TYPES = "SYSTEM_INTEGRATION_TYPES"
export const ADD_SYSTEM_INTEGRATION = "ADD_SYSTEM_INTEGRATION"
export const DELETE_SYS_INTEGRATION = "DELETE_SYS_INTEGRATION"
export const ALIAS_SAVE = "ALIAS_SAVE"
export const STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION = "STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION"
export const GET_SYSTEM_INTEGRATION_TYPE_SERVICE = "GET_SYSTEM_INTEGRATION_TYPE_SERVICE"
export const BIND_SYS_INTEGRATIONS_NEW_LOCATION = "BIND_SYS_INTEGRATIONS_NEW_LOCATION"
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

export function BindSysIntegrationsForNewLocation() {
    return {
        type: BIND_SYS_INTEGRATIONS_NEW_LOCATION
    }
}
export function getUnselectedSystemIntegrations(allSystemIntegrations) {
    var UnSelected = []
    allSystemIntegrations.map(si => {
        if (si.LocationMappingId < 0) {
            UnSelected.push(si)
        }
    })
    return UnSelected;
}
export function editSystemIntegration(locationSystemIntegrations) {
    var selectedSystemIntegrations = []
    for (var i = 0; i < locationSystemIntegrations.locationsInfo.length; i++) {
        if (locationSystemIntegrations.locationsInfo[i].AliasName && locationSystemIntegrations.locationsInfo[i].LocationMappingId > 0) {
            var valuePresence = 1;
            if (locationSystemIntegrations.locationsInfo[i]) {

                locationSystemIntegrations.marketDrivenMappings.map(mdm => {
                    if (mdm.ExternalSystemName == locationSystemIntegrations.locationsInfo[i].ExternalSystemName) {
                        valuePresence++;
                    }
                })

                if (valuePresence == 1) {
                    selectedSystemIntegrations.push(locationSystemIntegrations.locationsInfo[i]);
                }
            }

        }
    }

    return (dispatch, getState) => {
        return new Promise((resolve) => {
            getSystemIntegrationTypes().then(function (response) {
                dispatch({
                    type: STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION,
                    payload: {
                        error: "",
                        systemIntegrationTypes: response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings,
                        selectedSystemIntegrationTypes: selectedSystemIntegrations,
                        unSelectedSystemIntegrationTypes: getUnselectedSystemIntegrations(response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings),
                        deletedSystemIntegrations: []
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
            getState().systemIntegration.systemIntegrationTypes.length==0?
            getSystemIntegrationTypes().then(function (response) {
                dispatch({
                    type: GET_SYSTEM_INTEGRATION_TYPE_SERVICE,
                    payload: response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings
                })
            }):null
            dispatch(BindSysIntegrationsForNewLocation())
        })
    }
}

export const ACTION_HANDLERS = {
    [BIND_SYS_INTEGRATIONS_NEW_LOCATION]: (state, action) => {
        var selectedSysInt = [];
        return Object.assign({}, state, { selectedSystemIntegrationTypes: selectedSysInt })
    },
    [ALIAS_SAVE]: (state, action) => {
        var newState = Object.assign({}, state)
        if (action.payload && action.payload.values) {
            action.payload.values.AliasName.map((alias, index) => {
                if (alias) {
                    newState.selectedSystemIntegrationTypes[index].AliasName = alias;
                    newState.selectedSystemIntegrationTypes[index].FlaggedForDeletion = false;
                }
            })
        }
        return newState;
    },

    [ADD_SYSTEM_INTEGRATION]: (state, action) => {
        if (action.payload && action.payload.replace(/\s/g, '').length) {
            var stateObject = {};
            var newSelectedSysIntegrations = [];
            var newUnSelectedSysIntegrations = [];
            var valuePresent = 0;
            state.selectedSystemIntegrationTypes ? state.selectedSystemIntegrationTypes.map(sel => {
                newSelectedSysIntegrations.push(sel)
                if (sel.ExternalSystemName.toLowerCase() == action.payload.toLowerCase()) {
                    valuePresent++;
                }
            }) : null
            state.systemIntegrationTypes.map(ssit => {
                if (ssit.ExternalSystemName == action.payload) {
                    if (state.deletedSystemIntegrations && state.deletedSystemIntegrations.length > 0) {

                        var finalDeleted = []

                        state.deletedSystemIntegrations.map(del => {
                            if (del.ExternalSystemName != ssit.ExternalSystemName) {
                                finalDeleted.push(del)
                            }
                        })
                        state.deletedSystemIntegrations = finalDeleted;
                    }
                    stateObject = ssit;
                    stateObject.FlaggedForDeletion = true
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
                        FlaggedForDeletion: true
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
            !state.deletedSystemIntegrations ? state.deletedSystemIntegrations = [] : null
            state.selectedSystemIntegrationTypes.map((ssit, index) => {
                if (index != action.payload) {
                    newSystemIntegrations.push(ssit)
                }
                else {
                    ssit.LocationMappingId = ssit.LocationMappingId > 0 ? ssit.LocationMappingId : -1;
                    ssit.FlaggedForDeletion = true;
                    ssit.AliasName = ""
                    var valuePresence = 1;
                    newUnSelectedSysIntegrations.map(newUn => {
                        if (newUn.ExternalSystemName == ssit.ExternalSystemName) {
                            valuePresence++;
                        }
                    })
                    valuePresence == 1 ? newUnSelectedSysIntegrations.push(ssit) : null
                    var valuePresence = 1
                    state.deletedSystemIntegrations ? state.deletedSystemIntegrations.map(dsi => {
                        if (dsi.ExternalSystemName == ssit.ExternalSystemName) {
                            valuePresence++
                        }
                    }) : null
                    valuePresence == 1 ? state.deletedSystemIntegrations.push(ssit) : null
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
        var unselectedSysIntegrations = [];
        action.payload.map(ssit => {
            if (ssit.LocationMappingId < 0) {
                unselectedSysIntegrations.push(ssit)
            }
        })
        return Object.assign({}, state, {
            systemIntegrationTypes: action.payload,
            unSelectedSystemIntegrationTypes: unselectedSysIntegrations
        })
    }
}

const initialState = {
    error: "",
    systemIntegrationTypes: [],
    selectedSystemIntegrationTypes: [],
    unSelectedSystemIntegrationTypes: [],
    deletedSystemIntegrations: []
};

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
