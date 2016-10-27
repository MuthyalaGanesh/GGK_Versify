import Constants  from "../constants/apiUrl"
import {axiosPost,axiosGet} from "./serviceCall"
export function  getLocationTypes(){

 axiosGet(Constants.LOCATION_TYPES)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Location Types: ", responseJson);
      })
      .catch((error) => {
        console.error("Location Types Error: ", error);
       
      });

  var a = [{"id":15,"name":"AG","displayName":"Aggregate","isEnabled":true},{"id":24,"name":"BI","displayName":"Bilateral","isEnabled":false},{"id":25,"name":"BK","displayName":"Block","isEnabled":false},{"id":26,"name":"CA","displayName":"Control Area","isEnabled":true},{"id":22,"name":"CB","displayName":"Circuit Breaker","isEnabled":true},{"id":27,"name":"CL","displayName":"Comment Location","isEnabled":false},{"id":14,"name":"CO","displayName":"Configuration","isEnabled":true},{"id":28,"name":"CS","displayName":"CS","isEnabled":false},{"id":29,"name":"CT","displayName":"Combustion","isEnabled":false},{"id":30,"name":"CU","displayName":"CU","isEnabled":false},{"id":31,"name":"DC","displayName":"Duct","isEnabled":false},{"id":10,"name":"FL","displayName":"Fleet","isEnabled":true},{"id":9,"name":"FT","displayName":"Fossil Totals","isEnabled":true},{"id":3,"name":"GN","displayName":"Generator","isEnabled":true},{"id":32,"name":"HQ","displayName":"Headquarters","isEnabled":false},{"id":33,"name":"HT","displayName":"Heater","isEnabled":false},{"id":7,"name":"HY","displayName":"Hydro","isEnabled":true},{"id":34,"name":"IN","displayName":"Inverter","isEnabled":false},{"id":35,"name":"LL","displayName":"Loggable Location","isEnabled":false},{"id":13,"name":"MS","displayName":"Multistage Generator","isEnabled":true},{"id":36,"name":"MT","displayName":"Met Tower","isEnabled":false},{"id":37,"name":"ND","displayName":"Node","isEnabled":false},{"id":38,"name":"NU","displayName":"NUG","isEnabled":false},{"id":5,"name":"PB","displayName":"Power Block","isEnabled":true},{"id":11,"name":"PH","displayName":"Powerhouse","isEnabled":true},{"id":39,"name":"PK","displayName":"Peaker","isEnabled":false},{"id":40,"name":"RG","displayName":"Region","isEnabled":true},{"id":41,"name":"RT","displayName":"Report Location","isEnabled":false},{"id":42,"name":"RV","displayName":"RV","isEnabled":false},{"id":12,"name":"SC","displayName":"Switching Center","isEnabled":true},{"id":43,"name":"SF","displayName":"Solar Farm","isEnabled":true},{"id":20,"name":"SS","displayName":"Switching Station","isEnabled":true},{"id":2,"name":"ST","displayName":"Station","isEnabled":true},{"id":18,"name":"SU","displayName":"Substation","isEnabled":true},{"id":4,"name":"TB","displayName":"Turbine","isEnabled":true},{"id":16,"name":"TL","displayName":"Transmission Line","isEnabled":true},{"id":19,"name":"TR","displayName":"Transformer","isEnabled":true},{"id":17,"name":"TS","displayName":"Transmission Line Segment","isEnabled":true},{"id":21,"name":"TW","displayName":"Transmission Tower","isEnabled":true},{"id":23,"name":"VR","displayName":"Voltage Regulator","isEnabled":true},{"id":6,"name":"VU","displayName":"Virtual Unit","isEnabled":true},{"id":1,"name":"WF","displayName":"Wind Farm","isEnabled":true},{"id":8,"name":"WT","displayName":"Wind Totals","isEnabled":true},{"id":44,"name":"ZN","displayName":"Zone","isEnabled":false}];
  return a;
  };




     /* constructor(props) {
        super(props);
        this.state = {
            menuoneOpen: true,
            menuOneClass: "fa fa-chevron-down"
        }
    }
   
    render() {
        var timezones = [
            { code: "AST", value: "Atlantic Standard Time" },
            { code: "EST", value: "Eastern Standard Time" },
            { code: "CST", value: "Central Standard Time" },
            { code: "MST", value: "Mountain Standard Time" },
            { code: "PST", value: "Pacific Standard Time" },
            { code: "AKST", value: "Alaska Standard Time" },
            { code: "HAST", value: "Hawaii-Aleutian Standard Time" },
            { code: "ADT", value: "Atlantic Daylight Time" },
            { code: "EDT", value: "Eastern Daylight Time" },
            { code: "CDT", value: "Central Daylight Time" },
            { code: "MDT", value: "Mountain Daylight Time" },
            { code: "PDT", value: "Pacific Daylight Time" },
            { code: "AKDT", value: "Alaska Daylight Time" },
            { code: "HADT", value: "Hawaii-Aleutian Daylight Time" }
        ]

        var types = [
            { typeId: 1, type: "Aggregate" },
            { typeId: 2, type: "Control Area" },
            { typeId: 3, type: "Circuit breaker" },
            { typeId: 4, type: "Configuration" },
            { typeId: 5, type: "Fleet" },
            { typeId: 6, type: "Fossil Totals" },
            { typeId: 7, type: "Generator" },
            { typeId: 8, type: "Hydro" },
            { typeId: 9, type: "Multistage Generator" },
            { typeId: 10, type: "Power block" },
            { typeId: 11, type: "Powerhouse" },
            { typeId: 12, type: "Region" },
            { typeId: 13, type: "Switching Center" },
            { typeId: 14, type: "Solar Farm" },
            { typeId: 15, type: "Switching station" },
            { typeId: 16, type: "Station" },
            { typeId: 17, type: "Turbine" },
            { typeId: 18, type: "Transmission line" }
        ]
        var locations = [
            { code: "UPL", locationName: "Uppal" },
            { code: "WR", locationName: "Waverock" },
            { code: "JH", locationName: "Jubilee hills" },
            { code: "AUS", locationName: "Australia" },
            { code: "USA", locationName: "USA" }
        ]*/