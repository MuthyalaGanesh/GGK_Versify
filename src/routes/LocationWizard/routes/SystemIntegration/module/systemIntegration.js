import {getSystemIntegrationTypes} from "api/locationWizardApi"

export const ADD_MODAL = "ADD_MODAL"
export const SYSTEM_INTEGRATION_TYPES = "SYSTEM_INTEGRATION_TYPES"
export const ADD_SYSTEM_INTEGRATION = "ADD_SYSTEM_INTEGRATION"
export const DELETE_SYS_INTEGRATION = "DELETE_SYS_INTEGRATION"

export function SystemIntegrationModal() {
    return {
        type: ADD_MODAL,
        payload: true
    };
};

export function BindSystemIntegrationTypes() {
    return {
        type: SYSTEM_INTEGRATION_TYPES,
        payload: getSystemIntegrationTypes()
    };
};

export function deleteSystemIntegration(name) {
    return {
        type: DELETE_SYS_INTEGRATION,
        payload: name
    }
}

export function AddSystemIntegration() {
    return (dispatch, getState) => {
        var receivedSystemIntegration = getState().form.SystemIntegrationForm.values.newSystemIntegration;
        var newSystemIntegration = receivedSystemIntegration[0];
        if (typeof newSystemIntegration != 'object') {
            newSystemIntegration = new Object({
                Name: receivedSystemIntegration, DisplayName: receivedSystemIntegration, Description: ""
            })
        }
        return new Promise((resolve) => {
            dispatch({
                type: ADD_SYSTEM_INTEGRATION, payload: newSystemIntegration
            })
        })
    }
};

export const ACTION_HANDLERS = {
    [ADD_MODAL]: (state, action) => {
        return Object.assign({}, state)
    },
    [SYSTEM_INTEGRATION_TYPES]: (state, action) => {
        return Object.assign({}, state, {
            systemIntegrationTypes: action.payload
        })
    },
    [ADD_SYSTEM_INTEGRATION]: (state, action) => {
        if (action.payload) {
            var stateObject = action.payload;
            var newSelectedSysIntegrations = [];
            var valuePresent = 1;
            state.selectedSystemIntegrationTypes.map((ssit) => {     //helps in avoiding duplicates
                newSelectedSysIntegrations.push(ssit);
                if (ssit.Name == stateObject.Name) {
                    valuePresent++;
                }
            });
            if (valuePresent == 1) {
                newSelectedSysIntegrations.push(stateObject)
                var newUnSelectedSysIntegrations = [];
                state.systemIntegrationTypes.map((ssit) => {
                    if (ssit.Name != stateObject.Name) {
                        newUnSelectedSysIntegrations.push(ssit);
                    }
                })
            }
        }
        return Object.assign({}, state, {
            systemIntegrationTypes: newUnSelectedSysIntegrations
            , selectedSystemIntegrationTypes: newSelectedSysIntegrations
        });
    },
    [DELETE_SYS_INTEGRATION]: (state, action) => {
        if (action.payload) {
            var newSystemIntegrations = [];
            state.selectedSystemIntegrationTypes.map((ssit) => {
                if (ssit.Name != action.payload) {
                    newSystemIntegrations.push(ssit)
                }
                else {
                    state.systemIntegrationTypes.push(ssit)
                }
            });
        }
        return Object.assign({}, state, {
            selectedSystemIntegrationTypes: newSystemIntegrations
        });
    },
}

const initialState = {
    error: "",
    systemIntegrationTypes: getSystemIntegrationTypes(),
    selectedSystemIntegrationTypes: [],
};

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
