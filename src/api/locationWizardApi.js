import Constants from "../constants/apiUrl"
import {
    axiosPost,
    axiosGet
} from "./serviceCall"
var jsonObject = require('./testData.json');
var allLocations = require('./allLocationsTestData.json');


export function getLocationTypes() {
    var data = jsonObject;
    return data.locationTypes;

    //  axiosGet(Constants.LOCATION_TYPES)
    //   .then((response) => response.json())
    //    .then((responseJson) => {        
    //        console.log("Location Types: ", responseJson);
    //        return responseJson;
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