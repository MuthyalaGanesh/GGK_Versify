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

export function getUnitCharacteristics() {
    var unitCharacteristicsJson = [{
            Name: "Eco Min",
            DisplayName: "Economic Minimum",
            Description: "The lowest economic MW output level a unit can achieve system cost",
            Value: "",
            UCM: "MW",
            EffectiveStartDate: "",
            EffectiveEndDate: ""
        }, {
            Name: "Eco Max",
            DisplayName: "Economic Maximum",
            Description: "The lowest economic MW output level a unit can achieve system cost",
            Value: "",
            UCM: "MW",
            EffectiveStartDate: "",
            EffectiveEndDate: ""
        }, {
            Name: "Capacity",
            DisplayName: "Capacity to Produce",
            Description: "Capacity is the capability to produce energy",
            Value: "",
            UCM: "MW",
            EffectiveStartDate: "",
            EffectiveEndDate: ""
        }
        ]
    return unitCharacteristicsJson;
}
export function getSelectedUnitCharacteristics() {
    var unitCharacteristicsJson = [
        // { Name: "Eco Min", DisplayName: "Eco Min", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Eco Max", DisplayName: "Eco Max", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Capacity", DisplayName: "Capacity", Description: "Capacity is the capability to produce energy", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" }
        ]
    return unitCharacteristicsJson;
}


export function getSystemIntegrationTypes() {
    var systemIntegrationTypes = [{
        Id: 1,
        Name: "Turbine Manufacturer",
        DisplayName: "Turbine Manufacturer"
    }, {
        Id: 2,
        Name: "VTariff-Agency",
        DisplayName: "VTariff-Agency"
    }, {
        Id: 3,
        Name: "EMS",
        DisplayName: "EMS"
    }, {
        Id: 4,
        Name: "Gamesa Power",
        DisplayName: "Gamesa Power"
    }, {
        Id: 5,
        Name: "CAISO_Name",
        DisplayName: "CAISO_Name"
    }, {
        Id: 6,
        Name: "MISO Portal Meter view",
        DisplayName: "MISO Portal Meter view"
    }, {
        Id: 7,
        Name: "MISO Gateway",
        DisplayName: "MISO Gateway"
    }, {
        Id: 8,
        Name: "pjm_emtr",
        DisplayName: "pjm_emtr"
    }]
    return systemIntegrationTypes;
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

    var data = workFlows;
    return data;
}

export function getUserInfo() {
    var data = userInfo;
    return data;
}

export function getGatewayInfo()
{
    var data = gatewayInfo;
    return data;
}