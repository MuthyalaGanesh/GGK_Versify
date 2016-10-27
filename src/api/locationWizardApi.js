import Constants  from "Constants/Api"
import {axiosPost,axiosGet} from "./serviceCall"
export function  getLocationTypes(){

 axiosGet(Constants.LOCATION_TYPES)
      .then((response) => response.json())
      .then((responseJson) => {        
          console.log("Location Types: ", responseJson);
          return responseJson;
      })
      .catch((error) => {
        console.error("Location Types Error: ", error);
      });
  };