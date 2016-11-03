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
export function AddSystemIntegration(event) {
    event.preventDefault()
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            dispatch({ type: ADD_SYSTEM_INTEGRATION, payload: getState().form.SystemIntegrationForm.values.newSystemIntegration })
        })

    }
};

export const ACTION_HANDLERS = {
    [ADD_MODAL]: (state, action) => {
        return Object.assign({}, state, { showAddSysIntegrationModal: !state.showAddSysIntegrationModal })
    },
    [SYSTEM_INTEGRATION_TYPES]: (state, action) => {
        return Object.assign({}, state, { systemIntegrationTypes: action.payload })
    },
    [ADD_SYSTEM_INTEGRATION]: (state, action) => {
        if (action.payload) {
            var newstate = Object.assign({}, state, { showAddSysIntegrationModal: !state.showAddSysIntegrationModal })
            var stateObject = state.systemIntegrationTypes[parseInt(action.payload) - 1];
            var valuePresent = 1;
            newstate.selectedSystemIntegrationTypes.map((ssit) => {
                if (ssit.Name == stateObject.Name) {
                    valuePresent++;
                }
            });
            if (valuePresent == 1) {
                newstate.selectedSystemIntegrationTypes.push(stateObject)
            }
        }
        return newstate;
    },
    [DELETE_SYS_INTEGRATION]: (state, action) => {
        if (action.payload) {
            var newstate = Object.assign({}, state)
            var valuePresence = 0;
            // alert('b4:'+newstate.selectedSystemIntegrationTypes)
            newstate.selectedSystemIntegrationTypes.map((ssit) => {
                if (ssit.Name == action.payload) {
                    newstate.selectedSystemIntegrationTypes.splice(valuePresence, 1);
                }
                valuePresence++;
            });
            // alert('after:'+newstate.selectedSystemIntegrationTypes)
        }
        var assignObject = {
            showAddSysIntegrationModal: newstate.showAddSysIntegrationModal,
            systemIntegrationTypes: newstate.systemIntegrationTypes,
            selectedSystemIntegrationTypes: newstate.selectedSystemIntegrationTypes
        }
        return assignObject;
    }

}

const initialState = {
    error: "",
    showAddSysIntegrationModal: false,
    systemIntegrationTypes: getSystemIntegrationTypes(),
    selectedSystemIntegrationTypes: [],
};

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}