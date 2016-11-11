import Constants from "../constants/apiUrl"
import {
    axiosPost,
    axiosGet,
    XMLHttpRequestSyncGet
} from "./serviceCall"
var jsonObject = require('./testData.json');
var allLocations = require('./allLocationsTestData.json');
var workFlows = require('./workFlowData.json');
var userInfo = require('./userData.json');
var gatewayInfo = require('./gatewayData.json');
var dataHistorianInfo = require('./dataHistorianData.json');

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
export function getMarketDrivenMappings(marketId) {
    return XMLHttpRequestSyncGet(Constants.LWMARKETDRIVEN_MAPPINGS, "isoMarketId=" + marketId);;
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
    data.GetTimeZonesResult.forEach(function (item, index) {
        arrTimezones.push({
            id: item,
            value: item
        });

    });
    return arrTimezones;
}

export function getUnitCharacteristics() {

    return XMLHttpRequestSyncGet(Constants.ATTRIBUTES);
}
export function getSelectedUnitCharacteristics() {
    var unitCharacteristicsJson = []
    getUnitCharacteristics().map((uc) => {
        if (uc.name.toLowerCase() == "capacity" || uc.name.toLowerCase() == "eco min" || uc.name.toLowerCase() == "eco max") {
            uc.editableAttributes = [{}]
            uc.isDeletable = false;
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
    return XMLHttpRequestSyncGet(Constants.WORKFLOW_GROUPS);
}

export function getUserInfo() {
    var data = userInfo;
    return data;
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

export function getNewContactPopUpInfo(){
    var ContactPopup = {};
    ContactPopup.status = XMLHttpRequestSyncGet(Constants.CONTACT_STATUS).GetContactStatusesResult;
    ContactPopup.type = XMLHttpRequestSyncGet(Constants.CONTACT_TYPE);
    ContactPopup.org = XMLHttpRequestSyncGet(Constants.ORGANIZATION);
    ContactPopup.Timezones = getTimezones();
    return ContactPopup;
}