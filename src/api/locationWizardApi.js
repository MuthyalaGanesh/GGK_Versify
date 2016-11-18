import Constants from "../constants/apiUrl"
import {
    axiosPost,
    axiosGet,
    XMLHttpRequestSyncGet,
    XMLHttpRequestSyncSaveLocationPost
} from "./serviceCall"
import axios from 'axios'



/*function mapWorkFlowInfo() {
    
    let workFlowData = XMLHttpRequestSyncGet(Constants.WORKFLOW_DATA).GetWorkflowDataResult.WorkflowGroupsWorkflows;
    let workFlows = XMLHttpRequestSyncGet(Constants.WORKFLOW_GROUPS);
    var finalArray = _.map(workFlows, function(workflow) {
        return _.extend(workflow, _.omit(_.find(workFlowData, {
            Key: workflow.id
        }), 'Key'));
    });
    let workFlowGroup = []
    finalArray.map((final) => {
        let newData = {};
        newData.WorkflowGroupLocationId = 0
        newData.WorkflowGroupId = final.id
        newData.WorkflowGroupName = final.name
        newData.isActive = final.isActive
        newData.workflowTypeId = final.workflowTypeId
        newData.title = final.Value != null && final.Value.length > 0 ? final.Value.join('\n') : null
        workFlowGroup.push(newData)
    });
    return workFlowGroup;
}
*/
export function getLocationTypes() {
      return axios({
              method: 'get',
              url:Constants.LOCATION_TYPES,
    })
};

export function getWorkFlowGroups() {
   return axios({
              method: 'get',
              url:Constants.WORKFLOW_GROUPS,
    })
}
export function getPrimaryMarkets() {
        return axios({
              method: 'get',
              url:Constants.ISO_MARKETS,
    })
}

export function getLocations() {
    return axios({
              method: 'get',
              url: Constants.LOCATIONS,
    })
}

export function getParentLocations() {   
   return axios({
              method: 'get',
              url: Constants.LOCATIONS,
    })
}

export function getMarketDrivenMappings(marketId = null) {
    return XMLHttpRequestSyncGet(Constants.LWMARKETDRIVEN_MAPPINGS, marketId != null ? "isoMarketId=" + marketId : null);
}

export function getOwners() {
    return axios({
              method: 'get',
              url: Constants.ORGANIZATIONS,
    })
}

export function getTechnologyTypes() {
     return axios({
              method: 'get',
              url: Constants.TECHNOLOGYTYPES,
    })
}

export function getFuelClasses() {
     return axios({
              method: 'get',
              url: Constants.FUEL_CLASSES,
    })

}

export function getTimezones() {
    return axios({
              method: 'get',
              url: Constants.TIME_ZONES,
    })
}


export function getOMSLocationwizardData(locationId = null) {
    return XMLHttpRequestSyncGet(Constants.OMSLOCATIONWIZARD_DATA, locationId != null ? "locationId=" + locationId : null);
}

export function getUnitCharacteristics() {
    return axios({
              method: 'get',
              url: Constants.ATTRIBUTES,
    })
    //return XMLHttpRequestSyncGet(Constants.ATTRIBUTES);
}



export function getAllUOMValues() {
    return axios({
              method: 'get',
              url: Constants.UNITS_OF_MEASURE,
    })
    //return XMLHttpRequestSyncGet(Constants.UNITS_OF_MEASURE);
}

export function getSystemIntegrationTypes() {
     return axios({
              method: 'get',
              url: Constants.OMS_LOCATION_WIZARD_DATA,
    })
   // return XMLHttpRequestSyncGet(Constants.OMS_LOCATION_WIZARD_DATA);
}

export const basicInfoDropdowns = {
    getLocationTypes: getLocationTypes,
    getPrimaryMarkets: getPrimaryMarkets,
    getLocations: getLocations,
    getParentLocations: getParentLocations,
    getOwners: getOwners,
    getTechnologyTypes: getTechnologyTypes,
    getFuelClasses: getFuelClasses,
    getTimezones: getTimezones
}
export default basicInfoDropdowns;

export function getWorkFlows() {
     return axios({
              method: 'get',
              url:Constants.WORKFLOW_DATA,
    })
   // return mapWorkFlowInfo();
}

export function getUserInfo() {
    let roles = XMLHttpRequestSyncGet(Constants.ROLE).GetRolesResult;
    let contacts = XMLHttpRequestSyncGet(Constants.AUTO_COMPLETE_CONTACTS).GetAutoCompleteContactsResult;
    let userInfo = {
        Roles: roles.Roles,
        Contacts: contacts.Contacts
    }
    return userInfo;
}

export function getContacts(){
    let contacts = XMLHttpRequestSyncGet(Constants.AUTO_COMPLETE_CONTACTS).GetAutoCompleteContactsResult;
    return contacts.Contacts
}

export function getGatewayInfo() {
    var data = XMLHttpRequestSyncGet(Constants.OMS_LOCATION_WIZARD_INDEPENDENT_DATA);
    return data.GetOMSLocationWizardIndependentDataResult;
}

export function getMetricInfo() {
    return XMLHttpRequestSyncGet(Constants.METRICS);
}

export function getDataHistorian() {
    var metricData = XMLHttpRequestSyncGet(Constants.DEFAULTMETRICS);
    var allMetrics = XMLHttpRequestSyncGet(Constants.METRICS);
    var data = []
    metricData.map((metric) => {
        let index = allMetrics.findIndex((m) => m.id === metric.id)
        if (index >= 0) {
            let defaultMetric = allMetrics[index]
            let scada = {}
            scada.id = 0
            scada.isDigitalState = false
            scada.locationId = 0
            scada.metricDescription = defaultMetric.description
            scada.metricId = defaultMetric.id
            scada.metricName = defaultMetric.displayName
            scada.scadaServerAliasName = ""
            scada.scadaServerId = ''
            scada.scadaTag = ""
            scada.isDefault = "true"
            scada.isEdited = "fasle"
            data.push(scada);
        }
    })
    return data;
}

export function getNewContactPopUpInfo() {
    var ContactPopup = {};
    ContactPopup.status = []
    XMLHttpRequestSyncGet(Constants.CONTACT_STATUS).GetContactStatusesResult.map((status) => {
        let obj = {}
        obj.id = status.charAt(0)
        obj.value = status
        ContactPopup.status.push(obj)
    });
    ContactPopup.type = XMLHttpRequestSyncGet(Constants.CONTACT_TYPE);
    ContactPopup.org = XMLHttpRequestSyncGet(Constants.ORGANIZATION);
    ContactPopup.Timezones = getTimezones();
    return ContactPopup;
}

export function finalLocationSaveObject(saveObject) {
    return XMLHttpRequestSyncSaveLocationPost(Constants.SAVE_OMSLOCATION_DATA, saveObject);
}
