import Constants from "../constants/apiUrl"
import {
    axiosPost,
    axiosGet
} from "./serviceCall"
var jsonObject = require('./testData.json');
var allLocations = require('./allLocationsTestData.json');
var workFlows = require('./workFlowData.json');


export function getLocationTypes() {
    var data = jsonObject;
    return data.locationTypes;

    //  return axiosGet(Constants.LOCATION_TYPES)
    //    .then((response) => {        
    //        console.log("Location Types: ", response.data);
    //        return response.data;
    //    })
    //    .catch((error) => {
    //      console.error("Location Types Error: ", error);
    //   });        
};

export function getPrimaryMarkets() {
    var data = jsonObject;
    return data.ISOMarkets;
}
export function getLocations() {
    var data = allLocations;
    return data.GetAllLocationsResult;
}

export function getParentLocations() {
    var data = allLocations.GetAllLocationsResult;
    return [{
        id: "UPL",
        displayName: "Uppal"
    }, {
        id: "WR",
        displayName: "Waverock"
    }, {
        id: "JH",
        displayName: "Jubilee hills"
    }, {
        id: "AUS",
        displayName: "Australia"
    }, {
        id: "USA",
        displayName: "USA"
    }]

}

export function getOwners() {
    var data = jsonObject;
    return data.Organisations;
}

export function getTechnologyTypes() {
    var data = jsonObject;
    return data.TechnologyTypes;
}

export function getFuelClasses() {
    var data = jsonObject;
    return data.FuelClasses;
}

export function getTimezones() {
    var data = jsonObject;
    var arrTimezones = [];
    data.TimeZones.GetTimeZonesResult.forEach(function(item, index) {
        arrTimezones.push({
            id: item,
            value: item
        });

    });
    return arrTimezones;
}

export function getUnitCharacteristics() {
    var unitCharacteristicsJson = [
        { Name: "Eco Min", DisplayName: "Eco Min", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        { Name: "Eco Max", DisplayName: "Eco Max", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        { Name: "Capacity", DisplayName: "Capacity", Description: "Capacity is the capability to produce energy", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" }
        // { Name: "Eco Min1", DisplayName: "Eco Min", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Eco Max1", DisplayName: "Eco Max", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Capacity1", DisplayName: "Capacity", Description: "Capacity is the capability to produce energy", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Eco Min2", DisplayName: "Eco Min", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Eco Max2", DisplayName: "Eco Max", Description: "The lowest economic MW output level a unit can achieve system cost", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
        // { Name: "Capacity2", DisplayName: "Capacity", Description: "Capacity is the capability to produce energy", Value: "", UCM: "MW", EffectiveStartDate: "", EffectiveEndDate: "" },
    ]
    return unitCharacteristicsJson;
}

export function getSystemIntegrationTypes() {
    var systemIntegrationTypes=[
        {Id:1,Name:"Turbine Manufacturer",DisplayName:"Turbine Manufacturer"},
        {Id:2,Name:"VTariff-Agency",DisplayName:"VTariff-Agency"},
        {Id:3,Name:"EMS",DisplayName:"EMS"},
        {Id:4,Name:"Gamesa Power",DisplayName:"Gamesa Power"},
        {Id:5,Name:"CAISO_Name",DisplayName:"CAISO_Name"},
        {Id:6,Name:"MISO Portal Meter view",DisplayName:"MISO Portal Meter view"},
        {Id:7,Name:"MISO Gateway",DisplayName:"MISO Gateway"},
        {Id:8,Name:"pjm_emtr",DisplayName:"pjm_emtr"}
    ]
    return systemIntegrationTypes;
}

export const basicInfoDropdowns = function() {
    return {
        getLocationTypes: getLocationTypes,
        getPrimaryMarkets: getPrimaryMarkets,
        getLocations: getLocations,
        getParentLocations: getParentLocations,
        getOwners: getOwners,
        getTechnologyTypes: getTechnologyTypes,
        getFuelClasses: getFuelClasses,
        getTimezones: getTimezones
    }
}
export default basicInfoDropdowns;

export function  getWorkFlows(){
    
var data = workFlows;                          
        return data;
}

export function  getUserInfo(){
    
var UserInfo = {
                 roles : [
                          {Mane},
                          {},
                          {},
                          {},

                         ],};
                          
        return workFlows;
}
