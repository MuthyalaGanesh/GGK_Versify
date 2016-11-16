import Constants from "../constants/apiUrl"
import {
    axiosPost,
    axiosGet,
    XMLHttpRequestSyncGet,
    XMLHttpRequestSyncSaveLocationPost
} from "./serviceCall"
var jsonObject = require('./testData.json');
var allLocations = require('./allLocationsTestData.json');
var workFlows = require('./workFlowData.json');
var userInfo = require('./userData.json');
var gatewayInfo = require('./gatewayData.json');
var dataHistorianInfo = require('./dataHistorianData.json');

function mapWorkFlowInfo() {
    let workFlowData = XMLHttpRequestSyncGet(Constants.WORKFLOW_DATA).GetWorkflowDataResult.WorkflowGroupsWorkflows;
    let workFlows = XMLHttpRequestSyncGet(Constants.WORKFLOW_GROUPS);
    var finalArray = _.map(workFlows, function(workflow){
    return _.extend(workflow, _.omit(_.find(workFlowData, {Key: workflow.id}), 'Key'));
    });    
    let workFlowGroup = []
    finalArray.map((final)=>{
            let newData = {}; 
            newData.WorkflowGroupLocationId = 0         
            newData.WorkflowGroupId = final.id  
            newData.WorkflowGroupName = final.name
            newData.isActive = final.isActive
            newData.workflowTypeId = final.workflowTypeId
            newData.title = final.Value!=null && final.Value.length > 0 ? final.Value.join('\n') : null
            workFlowGroup.push(newData)
    });
    return workFlowGroup;
}

export function getLocationTypes() {
    var data = jsonObject;
    //return data.locationTypes;

    //  return axiosGet(Constants.LOCATION_TYPES)
    //    .then((response) => {        
    //        console.log("Location Types: ", response.data);
    //        return response.data;
    //    })
    //    .catch((error) => {
    //      console.error("Location Types Error: ", error);
    //   }); 
    return XMLHttpRequestSyncGet(Constants.LOCATION_TYPES);
};

export function getPrimaryMarkets() {
    var data = jsonObject;
    //return data.ISOMarkets;

    return XMLHttpRequestSyncGet(Constants.ISO_MARKETS);

}
export function getLocations() {
    var data = allLocations;
    console.log("Location data method is fired: ");
    //return data.GetAllLocationsResult;    
    return XMLHttpRequestSyncGet(Constants.LOCATIONS).GetAllLocationsResult;

}

export function getMarketDrivenMappings(marketId = null) {
    return XMLHttpRequestSyncGet(Constants.LWMARKETDRIVEN_MAPPINGS, marketId != null ? "isoMarketId=" + marketId : null);
}

export function getOwners() {
    var data = jsonObject;
    //return data.Organisations;
    return XMLHttpRequestSyncGet(Constants.ORGANIZATIONS);
}

export function getTechnologyTypes() {
    var data = jsonObject;
    //return data.TechnologyTypes;
    return XMLHttpRequestSyncGet(Constants.TECHNOLOGYTYPES);
}

export function getFuelClasses() {
    var data = jsonObject;
    //return data.FuelClasses;
    return XMLHttpRequestSyncGet(Constants.FUEL_CLASSES);

}

export function getTimezones() {
    //var data = jsonObject.Timezones;
    var data = XMLHttpRequestSyncGet(Constants.TIME_ZONES);
    var arrTimezones = [];
    data.GetTimeZonesResult.forEach(function(item, index) {
        arrTimezones.push({
            id: item,
            value: item
        });

    });
    return arrTimezones;
}


export function getOMSLocationwizardData(locationId = null) {
    return XMLHttpRequestSyncGet(Constants.OMSLOCATIONWIZARD_DATA, locationId != null ? "locationId=" + locationId : null);
}

export function getUnitCharacteristics() {

    return XMLHttpRequestSyncGet(Constants.ATTRIBUTES);
}

export function getDefaultUnitCharacteristics() {
    var unitCharacteristicsJson = []
    getUnitCharacteristics().map((uc) => {
        if (uc.name.toLowerCase() == "capacity" || uc.name.toLowerCase() == "eco min" || uc.name.toLowerCase() == "eco max") {
            uc.editableAttributes = [{}]
            uc.isDeletable = false;
            uc.isSavable = false;
            getAllUOMValues().map((uom) => {
                if (uc.defaultUnitOfMeasureId == uom.id) {
                    uc.UOM = uom.name;
                }
            })
            unitCharacteristicsJson.push(uc);
        }
    })

    return unitCharacteristicsJson;
}

export function getAllUOMValues() {
    return XMLHttpRequestSyncGet(Constants.UNITS_OF_MEASURE);
}

export function getSystemIntegrationTypes() {
    return XMLHttpRequestSyncGet(Constants.OMS_LOCATION_WIZARD_DATA);
}

export const basicInfoDropdowns = {
    getLocationTypes: getLocationTypes(),
    getPrimaryMarkets: getPrimaryMarkets(),
    getLocations: getLocations(),
    getOwners: getOwners(),
    getTechnologyTypes: getTechnologyTypes(),
    getFuelClasses: getFuelClasses(),
    getTimezones: getTimezones()
}
export default basicInfoDropdowns;

export function getWorkFlows() {
    return mapWorkFlowInfo();
}

export function getUserInfo() {
    let roles = XMLHttpRequestSyncGet(Constants.ROLE).GetRolesResult;
    let contacts = XMLHttpRequestSyncGet(Constants.AUTO_COMPLETE_CONTACTS).GetAutoCompleteContactsResult;
    let userInfo = {Roles : roles.Roles,Contacts : contacts.Contacts}
    return userInfo ;
}

export function getGatewayInfo() {
    var data = XMLHttpRequestSyncGet(Constants.OMS_LOCATION_WIZARD_INDEPENDENT_DATA);
    return data.GetOMSLocationWizardIndependentDataResult;
}

export function getMetricInfo() {
    return XMLHttpRequestSyncGet(Constants.METRICS);
}

export function getDataHistorian() {
    var data = dataHistorianInfo.AssignedScadaPoints;
    return data;
}

export function getNewContactPopUpInfo() {
    var ContactPopup = {};
    ContactPopup.status = XMLHttpRequestSyncGet(Constants.CONTACT_STATUS).GetContactStatusesResult;
    ContactPopup.type = XMLHttpRequestSyncGet(Constants.CONTACT_TYPE);
    ContactPopup.org = XMLHttpRequestSyncGet(Constants.ORGANIZATION);
    ContactPopup.Timezones = getTimezones();
    return ContactPopup;
}

export function finalLocationSaveObject(saveObject) {
    return XMLHttpRequestSyncSaveLocationPost(Constants.SAVE_OMSLOCATION_DATA, saveObject);
}