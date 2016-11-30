import { getSystemIntegrationTypes } from 'api/locationWizardApi'

export const ADD_MODAL = 'ADD_MODAL'
export const SYSTEM_INTEGRATION_TYPES = 'SYSTEM_INTEGRATION_TYPES'
export const ADD_SYSTEM_INTEGRATION = 'ADD_SYSTEM_INTEGRATION'
export const DELETE_SYS_INTEGRATION = 'DELETE_SYS_INTEGRATION'
export const ALIAS_SAVE = 'ALIAS_SAVE'
export const STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION = 'STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION'
export const GET_SYSTEM_INTEGRATION_TYPE_SERVICE = 'GET_SYSTEM_INTEGRATION_TYPE_SERVICE'
export const BIND_SYS_INTEGRATIONS_NEW_LOCATION = 'BIND_SYS_INTEGRATIONS_NEW_LOCATION'
export function AliasGiven(name, i) {
    return (dispatch, getState) => {

        return new Promise((resolve) => {
            let aliasName = getState().form.SystemIntegrationForm.values[`${name}`]
            var data = !!getState().systemIntegration.systemdata ? getState().systemIntegration.systemdata : {}
            var secondarydata = getState().systemIntegration.selectedSystemIntegrationTypes
            var selecteddata = []
            secondarydata.map((values, j) => {
                if (i != j) {
                    selecteddata.push(values)
                } else {
                    let aliasName = getState().form.SystemIntegrationForm.values[`${name}`]
                    selecteddata.push(Object.assign({}, secondarydata[i], {
                        AliasName: aliasName,
                        FlaggedForDeletion: false
                    }))
                }
            })
            data[`${name}`] = getState().form.SystemIntegrationForm.values[`${name}`]
            dispatch({
                type: ALIAS_SAVE,
                payload: {
                    systemdata: data,
                    selectedSystemIntegrationTypes: selecteddata
                }
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
        if (si.LocationMappingId < 0 && si.ExternalSystemName != 'VTrader-Temp') {
            UnSelected.push(si)
        }
    })
    return UnSelected
}
export function editSystemIntegration(locationSystemIntegrations) {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            var selectedSystemIntegrations = []
            var data = {}
            for (var i = 0; i < locationSystemIntegrations.locationsInfo.length; i++) {
                if (locationSystemIntegrations.locationsInfo[i].LocationMappingId > 0) {
                    var valuePresence = 1
                    if (locationSystemIntegrations.locationsInfo[i]) {
                        locationSystemIntegrations.marketDrivenMappings.map(mdm => {
                            if (mdm.ExternalSystemName ==
                                locationSystemIntegrations.locationsInfo[i].ExternalSystemName) {
                                valuePresence++
                            }
                        })
                        if (valuePresence == 1) {
                            selectedSystemIntegrations.push(locationSystemIntegrations.locationsInfo[i])
                            data[`${locationSystemIntegrations.locationsInfo[i].ExternalSystemName}`] =
                                locationSystemIntegrations.locationsInfo[i].AliasName
                        }
                    }
                }
            }
            getSystemIntegrationTypes().then(function (response) {
                dispatch({
                    type: STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION,
                    payload: {
                        error: '',
                        systemIntegrationTypes: response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings,
                        selectedSystemIntegrationTypes: selectedSystemIntegrations,
                        unSelectedSystemIntegrationTypes: getUnselectedSystemIntegrations(
                            response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings
                        ),
                        systemdata: data
                    }
                })
                dispatch({
                    type: 'redux-form/INITIALIZE',
                    meta: { form: 'SystemIntegrationForm' },
                    payload: getState().systemIntegration.systemdata
                })
            })
        })
    }
}
export function deleteSystemIntegration(name, i) {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            let flag = 0
            let deletedSysInt = []
            let data = getState().systemIntegration.selectedSystemIntegrationTypes
            let secondarydata = getState().systemIntegration.systemIntegrationTypes
            let options = getState().systemIntegration.unSelectedSystemIntegrationTypes
            let selecteddata = []
            var systemdataobject = getState().systemIntegration.systemdata
            systemdataobject[`${name}`] = null
            data.map((value, j) => {
                if (i != j) {
                    selecteddata.push(value)
                }
                else {
                    if (value.LocationMappingId > 0) {
                        value.AliasName = ""
                        deletedSysInt.push(value)
                    }
                }
            })
            for (i in secondarydata) {
                if (name.toLowerCase() == secondarydata[i].ExternalSystemName.toLowerCase()) {
                    flag = 1
                    break
                }
            }
            if (flag == 1) {
                var valuePresence = 1
                for (let o of options) {
                    if (o.ExternalSystemName.toLowerCase() == name.toLowerCase()) {
                        o.AliasName = ""
                        o.LocationMappingId = -1
                        valuePresence++
                        break
                    }
                }
                if (valuePresence == 1) {
                    options.push(Object.assign({}, secondarydata[i], { LocationMappingId: -1, AliasName: "" }))
                }
            }
            dispatch({
                type: DELETE_SYS_INTEGRATION,
                payload: {
                    systemdata: systemdataobject,
                    unSelectedSystemIntegrationTypes: options,
                    selectedSystemIntegrationTypes: selecteddata,
                    deletedSystemIntegrations: deletedSysInt
                }
            })

            dispatch({
                type: 'redux-form/INITIALIZE',
                meta: { form: 'SystemIntegrationForm' },
                payload: getState().systemIntegration.systemdata
            })
        })
    }
}

export function AddSystemIntegration() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            let secondarydata = getState().systemIntegration.selectedSystemIntegrationTypes
            let data = getState().systemIntegration.unSelectedSystemIntegrationTypes
            let i
            let flag = 0
            var options = []
            for (i in data) {
                if (getState().form.SystemIntegrationForm.values.newSystemIntegration.ExternalSystemName.toLowerCase() ==
                    data[i].ExternalSystemName.toLowerCase()) {
                    flag = 1
                    break
                }
            }
            if (flag == 1) {
                data.map((value, j) => {
                    if (i != j) {
                        options.push(value)
                    }

                })
                var availableSysInt = {}
                if (getState().systemIntegration.deletedSystemIntegrations) {
                    for (let dsi of getState().systemIntegration.deletedSystemIntegrations) {
                        if (dsi.ExternalSystemName.toLowerCase() ==
                            getState().form.SystemIntegrationForm.values.newSystemIntegration.ExternalSystemName.toLowerCase()) {
                            availableSysInt = dsi
                            break
                        }
                    }
                }
                if (availableSysInt && availableSysInt.AliasName) {
                    secondarydata.push(availableSysInt);
                }
                else {

                    secondarydata.push(
                        Object.assign({}, getState().form.SystemIntegrationForm.values.newSystemIntegration, {
                            LocationMappingId: 0
                        }))
                }

            } else {
                options = data
                for (i in secondarydata) {
                    if (getState().form.SystemIntegrationForm.values.newSystemIntegration.ExternalSystemName.toLowerCase() ==
                        secondarydata[i].ExternalSystemName.toLowerCase()) {
                        flag = 1
                        break
                    }
                }
                if (flag != 1) {
                    let ExternalSystemName = getState().form.SystemIntegrationForm
                        .values.newSystemIntegration.ExternalSystemName
                    if (ExternalSystemName && ExternalSystemName.replace(/\s/g, '').length)
                        secondarydata.push({
                            LocationMappingId: 0,
                            ExternalSystemName: ExternalSystemName,
                            AliasName: '',
                            ExternalSystemLogin: '',
                            ExternalSystemPwd: '',
                            ParameterList: '',
                            FlaggedForDeletion: true
                        })
                }
            }
            dispatch({
                type: ADD_SYSTEM_INTEGRATION,
                payload: {
                    unSelectedSystemIntegrationTypes: options,
                    selectedSystemIntegrationTypes: secondarydata
                }
            })
            dispatch({
                type: 'redux-form/INITIALIZE',
                meta: { form: 'SystemIntegrationForm' },
                payload: getState().systemIntegration.systemdata
            })
        })
    }
}

export function getSystemIntegrationTypesService() {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            getState().systemIntegration.systemIntegrationTypes.length === 0
                ? getSystemIntegrationTypes().then(function (response) {
                    dispatch({
                        type: GET_SYSTEM_INTEGRATION_TYPE_SERVICE,
                        payload: response.data.GetOMSLocationWizardDataResult.AssignedLocationMappings
                    })
                }) : null
            dispatch(BindSysIntegrationsForNewLocation())
        })
    }
}

export const ACTION_HANDLERS = {
    [BIND_SYS_INTEGRATIONS_NEW_LOCATION]: (state, action) => {
        var selectedSysInt = []
        return Object.assign({}, state, { selectedSystemIntegrationTypes: selectedSysInt })
    },
    [ALIAS_SAVE]: (state, action) => {
        return Object.assign({}, state, {
            systemdata: action.payload.systemdata,
            selectedSystemIntegrationTypes: action.payload.selectedSystemIntegrationTypes,
            isChanged: true
        })
    },
    [ADD_SYSTEM_INTEGRATION]: (state, action) => {
        return Object.assign({}, state, {
            selectedSystemIntegrationTypes: action.payload.selectedSystemIntegrationTypes,
            unSelectedSystemIntegrationTypes: action.payload.unSelectedSystemIntegrationTypes,
            isChanged: true
        })
    },
    [DELETE_SYS_INTEGRATION]: (state, action) => {
        return Object.assign({}, state, {
            systemdata: action.payload.systemdata,
            selectedSystemIntegrationTypes: action.payload.selectedSystemIntegrationTypes,
            unSelectedSystemIntegrationTypes: action.payload.unSelectedSystemIntegrationTypes,
            deletedSystemIntegrations: action.payload.deletedSystemIntegrations,
            isChanged: true
        })
    },
    [STATE_CHANGE_EDIT_FOR_SYSTEM_INTEGRATION]: (state, action) => {
        return action.payload
    },
    [GET_SYSTEM_INTEGRATION_TYPE_SERVICE]: (state, action) => {
        var unselectedSysIntegrations = []
        action.payload.map(ssit => {
            if (ssit.LocationMappingId < 0 && ssit.ExternalSystemName !== 'VTrader-Temp') {
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
    error: '',
    systemIntegrationTypes: [],
    selectedSystemIntegrationTypes: [],
    unSelectedSystemIntegrationTypes: [],
    systemdata: {},
    isChanged: false,
    deletedSystemIntegrations: []
}

export default function systemIntegrationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
