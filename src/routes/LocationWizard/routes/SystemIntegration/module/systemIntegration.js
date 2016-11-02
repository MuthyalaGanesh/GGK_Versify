import {getSystemIntegrationTypes} from "api/locationWizardApi"

export const ADD_MODAL = "ADD_MODAL"
export const SYSTEM_INTEGRATION_TYPES = "SYSTEM_INTEGRATION_TYPES"
export const ADD_SYSTEM_INTEGRATION = "ADD_SYSTEM_INTEGRATION"

export function SystemIntegrationModal(){
    return {
        type: ADD_MODAL,
        payload: true
    };
};

export function BindSystemIntegrationTypes(){
    return {
        type: SYSTEM_INTEGRATION_TYPES,
        payload: getSystemIntegrationTypes()
    };
};

export function AddSystemIntegration(){
    return {
        type: ADD_SYSTEM_INTEGRATION,
        payload:true 
    };

};

export const ACTION_HANDLERS = {
    [ADD_MODAL]: (state, action) => {
        return Object.assign({}, state, { showAddSysIntegrationModal: !state.showAddSysIntegrationModal })
    },
    [SYSTEM_INTEGRATION_TYPES]: (state, action) => {
        return Object.assign({}, state, { systemIntegrationTypes: action.payload })
    },
    [ADD_SYSTEM_INTEGRATION]: (state, action) => {
        if(action.payload) {
            //ToDO: need to get ID of system integration and push into selectedSystemIntegrationTypes
            state.selectedSystemIntegrationTypes.push(state.systemIntegrationTypes[action.payload]);
        } 
                return Object.assign({}, state, { selectedSystemIntegrationTypes: state.selectedSystemIntegrationTypes })
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