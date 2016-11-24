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
    url: Constants.LOCATION_TYPES,
  })
};

export function getWorkFlowGroups() {
  return axios({
    method: 'get',
    url: Constants.WORKFLOW_GROUPS,
  })
}
export function getPrimaryMarkets() {
  return axios({
    method: 'get',
    url: Constants.ISO_MARKETS,
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
  var url = marketId != null ? Constants.LWMARKETDRIVEN_MAPPINGS + '?isoMarketId=' + `${marketId}` : Constants.LWMARKETDRIVEN_MAPPINGS;
  return axios({
      method: 'get',
      url: url
    })
    // return XMLHttpRequestSyncGet(Constants.LWMARKETDRIVEN_MAPPINGS, marketId != null ? "isoMarketId=" + marketId : null);
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
  var url = locationId != null ? Constants.OMSLOCATIONWIZARD_DATA + '?locationId=' + `${locationId}` : Constants.OMSLOCATIONWIZARD_DATA;

  return axios({
      method: 'get',
      url: url
    })
    //  return XMLHttpRequestSyncGet(Constants.OMSLOCATIONWIZARD_DATA, locationId != null ? "locationId=" + locationId : null);
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
    url: Constants.WORKFLOW_DATA,
  })
}

export function getWorkFlowTypes() {
  return axios({
    method: 'get',
    url: Constants.WORKFLOW_TYPES,
  })
}

export function getUserInfo() {
  return axios({
    method: 'get',
    url: Constants.AUTO_COMPLETE_CONTACTS,
  })
}
export function getRoleInfo() {
  return axios({
    method: 'get',
    url: Constants.ROLE,
  })
}

export function getContacts() {
  let contacts = XMLHttpRequestSyncGet(Constants.AUTO_COMPLETE_CONTACTS).GetAutoCompleteContactsResult;
  return contacts.Contacts
}

export function getGatewayInfo() {
  return axios({
    method: 'get',
    url: Constants.OMS_LOCATION_WIZARD_INDEPENDENT_DATA,
  })
}

export function getMetricInfo() {
  return axios({
    method: 'get',
    url: Constants.METRICS,
  })
}

export function getDataHistorian() {
  return axios({
    method: 'get',
    url: Constants.DEFAULTMETRICS,
  })
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
  return ContactPopup;

}

export function finalLocationSaveObject(saveObject) {
  return axios({
    method: 'post',
    url: Constants.SAVE_OMSLOCATION_DATA,
    data: saveObject
  })
}

export function addNewContact(SaveObject) {
  return axios({
    method: 'post',
    url: Constants.SAVE_NEW_CONTACT,
    data: SaveObject
  })
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

export function getContactsByRole(locationId, roleId) {
  let url = Constants.CONTACTS_BY_ROLE.format(locationId, roleId)
  return axios({
    method: 'get',
    url: url,
  })
}

export function getRolesByContact(locationId, contactId) {
  let url = Constants.ROLES_BY_CONTACT.format(locationId, contactId)
  return axios({
    method: 'get',
    url: url,
  })
}