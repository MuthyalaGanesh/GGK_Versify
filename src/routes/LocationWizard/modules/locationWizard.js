import {
  basicInfoDropdowns,
  finalLocationSaveObject,
  getOMSLocationwizardData,
  getMarketDrivenMappings,
  getDataHistorian,
  getUserInfo
} from 'api/locationWizardApi'

import {
  BindInitialValues
} from './basicInfo';
import {
  BindUnitCharacteristicsInitialValues
} from './unitCharacteristics';
import {
  bindLocationData
} from './dataHistorian'
import {
  bindGatewayLocationData
} from './gateways'
import {
  bindWorkLocationData
} from './workFlow'

import {
  editSystemIntegration
} from "./systemIntegration"

import {
  bindUserLocationData
} from "./user"
import {
  BindInitialEquipments
} from "./equipments"

import axios from 'axios'

export const TOGGLE_LEFTMENU_CLICK = 'TOGGLE_LEFTMENU_CLICK';
export const LOCATIONS_MENUITEM_DROPDOWN_CLICK = 'LOCATIONS_MENUITEM_DROPDOWN_CLICK';
export const GET_ALL_LOCATIONS_INFORMATION = "GET_ALL_LOCATIONS_INFORMATION";
export const DEFAULT_NODE_EXPANDED = "DEFAULT_NODE_EXPANDED";
export const SHOW_HIDE_ALERT = 'SHOW_HIDE_ALERT';
export const SAVE_RESPONSE_HANDLER = 'SAVE_RESPONSE_HANDLER';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';
var currentLocation = null;
var isLocationNameExists = false;

export function showSpinner() {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_SPINNER,
      payload: true
    })
  }
}

export function hideSpinner() {
  return (dispatch, getState) => {
    dispatch({
      type: HIDE_SPINNER,
      payload: false
    })
  }
}

export function toggleMenuClick(event) {
  return {
    type: TOGGLE_LEFTMENU_CLICK,
    payload: event
  };
}

export function toggleAlertPopup(event) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_HIDE_ALERT,
      payload: {
        locationState: getState().location,
        currentLocationId: 0
      }
    })
  }
}

export function toggleSaveResponsePopup(event) {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_RESPONSE_HANDLER,
      payload: {
        response: null,
        message: "",
        openSavePopup: false
      }
    })
  }
}

export function leftMenuDropdownClickEvent(id, event) {
  console.log("LOCATIONS_MENUITEM_DROPDOWN_CLICK:", id);
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_HIDE_ALERT,
      payload: {
        locationState: getState().location,
        currentLocationId: id
      }
    })
  }
}

function findLocation(allLocations, locationId) {
  _.each(allLocations, (item) => {
    if (currentLocation != null) {
      return false;
    }
    if (item.Id == locationId) {
      if (currentLocation == null) {
        currentLocation = item;
        return false;
      }
    } else {
      findLocation(item.Children, locationId)
    }
  });
}

function CheckLocationNameIsExists(allLocations, locationName) {
  _.each(allLocations, (item) => {
    if (isLocationNameExists) {
      return false;
    }
    if (item.Name == locationName) {
      if (!isLocationNameExists) {
        isLocationNameExists = true;
        return false;
      }
    } else {
      CheckLocationNameIsExists(item.Children, locationName)
    }
  });
}

export function LoadAndRefreshForms(id, event) {
  return (dispatch, getState) => {
    dispatch({
      type: DEFAULT_NODE_EXPANDED,
      payload: id
    })
    dispatch({
      type: SHOW_SPINNER,
      payload: true
    })
    dispatch({
      type: SHOW_HIDE_ALERT,
      payload: {
        locationState: getState().location,
        currentLocationId: id
      }
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "BasicInfoForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "CredentialsManagementForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "DataHistorianForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "EquipmentsForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "GatewayForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "SystemIntegrationForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "UnitCharacteristicsForm"
      },
      payload: ''
    })
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "UsersForm"
      },
      payload: ''
    })
    dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "WorkFlowForm"
        },
        payload: ''
      })
      //If Location Id > 0, only bind data. otherwise load new forms
    if (id > 0) {

      basicInfoDropdowns.getLocations().then(function(allLocationdata) {
        findLocation(allLocationdata.data.GetAllLocationsResult, id);
        var locationObj = currentLocation;
        currentLocation = null;

        dispatch(BindInitialValues(locationObj));

        var marketDrivenMappings = getMarketDrivenMappings(locationObj.PrimaryMarketId);
        var editSysIntegration = new Object({
          locationsInfo: locationsInfo,
          marketDrivenMappings: marketDrivenMappings
        })
        dispatch(editSystemIntegration(editSysIntegration));

      }).then(function() {
        dispatch({
          type: HIDE_SPINNER,
          payload: false
        })
      });
      let editObject = getOMSLocationwizardData(id);
      let locationsInfo = editObject.GetOMSLocationWizardDataResult.AssignedLocationMappings;
      let dataHistorianParticularLocationObject = editObject.GetOMSLocationWizardDataResult.AssignedScadaPoints;

      dispatch(bindLocationData(dataHistorianParticularLocationObject));
      dispatch(BindInitialEquipments(editObject.GetOMSLocationWizardDataResult.Equipment));

      dispatch(bindLocationData(dataHistorianParticularLocationObject, id));

      dispatch(bindGatewayLocationData(editObject.GetOMSLocationWizardDataResult.Gateways));
      dispatch(bindWorkLocationData(editObject.GetOMSLocationWizardDataResult.AssignedWorkflowGroups));
      dispatch(bindUserLocationData(editObject.GetOMSLocationWizardDataResult.AssignedContacts, id));
      dispatch(BindUnitCharacteristicsInitialValues(editObject.GetOMSLocationWizardDataResult.AllLocationAttributeWithValues))
    } else {
      dispatch({
        type: HIDE_SPINNER,
        payload: false
      })
    }

  };
}

function basicInforObjectPreparation(values) {
  var todayDate = new Date();
  return new Object({
    Id: values.locationId || 0,
    LocationId: values.locationId || 0,
    Name: values.locationName,
    Tz: values.timezone.id || values.timezone,
    ParentId: values.parentLocation || 0,
    LocationType: values.locationType.name || values.locationType,
    Notes: null,
    CreateDate: values.createDate || '/Date(' + todayDate.getTime() + ')/',
    CreateUser: null,
    UpdateDate: '/Date(' + todayDate.getTime() + ')/',
    UpdateUser: "GGK",
    IsDispatchLevel: false,
    IsScheduleLevel: false,
    IsOutageLevel: values.isOutageLevel,
    IsAFWLevel: false,
    CanTakeAFWorOutage: true,
    IsForecastLevel: false,
    IsLogLevel: false,
    TechnologyTypeId: values.technologyType.id || values.technologyType,
    SecondaryTechnologyTypeId: !!values.secondarytechnologyType ? values.secondarytechnologyType.id || values.secondarytechnologyType : null,
    PrimaryMarketId: values.primaryMarket.id || values.primaryMarket,
    SecondaryMarketId: null,
    FuelClassId: values.fuelClass.id || values.fuelClass,
    IsReportingLevel: false,
    DisplayRealTimeMonitor: false,
    OwnerOrgId: values.owner.id || values.owner,
    VTraderName: null,
    Attributes: null,
    IsSelected: false,
    MetricIds: null,
    PhysicalTz: values.physicalTimezone.id || values.physicalTimezone,
    Status: null,
    StatusDate: null,
    OwnershipPct: values.ownerShipPercentage,
    ShortName: null,
    CAISOMarketId: null,
    GADSUnitId: null,
    LocationScadaPoints: null,
    CustomValue1: 0,
    CustomValue2: 0,
    CustomValue3: 0,
    CustomValue4: 0,
    CustomValue5: 0,
    Children: []
  });
}


function prepareCredentialsAndIdentifiersObj(credentialsObj, primaryMarketTypeId, locationId) {

  var credentialsAndIdentifiersObj = [];
  //get MarketDrivenMappings from API based on marketType ID
  var marketDrivenMappings = getMarketDrivenMappings(primaryMarketTypeId);
  var omsLocationwizardData = getOMSLocationwizardData(locationId > 0 ? locationId : null);
  var locationMappingData = [];
  var itemDatawithMarketDrivenMappings = [];
  _.each(marketDrivenMappings, (item) => {
    var itemData = item;
    itemData.value = null;
    if (credentialsObj.hasOwnProperty(item.DisplayName)) {
      if (item.IsDropDown) {
        itemData.value = credentialsObj[item.DisplayName].key;
      } else {
        itemData.value = credentialsObj[item.DisplayName];
      }
    }
    itemDatawithMarketDrivenMappings.push(itemData);
  });
  var groupByItems = _.groupBy(itemDatawithMarketDrivenMappings, function(b) {
    return b.ExternalSystemName
  })
  var staticPjmemktToAdd = {
    "LocationMappingId": 0,
    "ExternalSystemName": "pjmemkt",
    "AliasName": "",
    "ExternalSystemLogin": "",
    "ExternalSystemPwd": "",
    "ParameterList": "https://emkt.pjm.com/emkt/xml/query",
    "FlaggedForDeletion": false
  };
  var staticVTraderToAdd = {
    "LocationMappingId": 0,
    "ExternalSystemName": "VTrader-Temp",
    "AliasName": "",
    "ExternalSystemLogin": "",
    "ExternalSystemPwd": "",
    "ParameterList": "",
    "FlaggedForDeletion": false
  }
  var assignedLocationMappings = omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings;
  _.each(groupByItems, (item) => {
    var locationMappingDataItem = {};
    locationMappingDataItem.LocationMappingId = 0;
    locationMappingDataItem.ExternalSystemName = '',
      locationMappingDataItem.AliasName = '',
      locationMappingDataItem.ExternalSystemLogin = '',
      locationMappingDataItem.ExternalSystemPwd = '',
      locationMappingDataItem.ParameterList = '',
      locationMappingDataItem.FlaggedForDeletion = false
    _.each(item, (itemData) => {
      locationMappingDataItem[itemData.Field] = itemData.value || '';
      locationMappingDataItem.ExternalSystemName = itemData.ExternalSystemName;

    });
    locationMappingData.push(locationMappingDataItem);
  })

  //ADD default location mappings
  if (!(locationId > 0)) {
    locationMappingData.push(staticVTraderToAdd);
  }

  var finalLocationMappingData = [];

  _.each(locationMappingData, (mappedItem) => {
    if (mappedItem.ExternalSystemName == 'PJMeDart') {
      mappedItem.AliasName = 'PJMeDartUnitNumber';

    }
    _.each(omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings, (wizardDataItem) => {
      var id = wizardDataItem.LocationMappingId
      if (wizardDataItem.LocationMappingId > 0) {
        if (wizardDataItem.ExternalSystemName == mappedItem.ExternalSystemName) {
          mappedItem.LocationMappingId = wizardDataItem.LocationMappingId;
        }
      }
    })
    finalLocationMappingData.push(mappedItem);
  });
  //Final  Credentials And Identifiers Object
  credentialsAndIdentifiersObj = [{
    LocationMappingRecords: finalLocationMappingData
  }];
  return credentialsAndIdentifiersObj;
}

function equipmentObjectPreparation(stateTree, dispatch, locationId) {
  var equipmentsObj = [];
  stateTree.equipments && stateTree.equipments.insertedEquipment ? stateTree.equipments.insertedEquipment.map(ie => {
    equipmentsObj.push(ie)
  }) : dispatch({
    type: 'ERROR',
    payload: 1
  })
   _.each(equipmentsObj, (equipment) => {
            equipment.ParentLocationId =locationId;
   });
  console.log(equipmentsObj, "Equipments")
  return equipmentsObj;

}


function SystemIntegrationObjectPreparation(stateTree, dispatch) {
  var systemIntegrationObj = []
  if (stateTree.systemIntegration) {
    stateTree.systemIntegration.selectedSystemIntegrationTypes.map(ssit => {
      systemIntegrationObj.push(ssit)
    })
    stateTree.systemIntegration.deletedSystemIntegrations.map(del => {
      systemIntegrationObj.push(del)
    })
    console.log(systemIntegrationObj, "SystemIntegrations")
  } else {
    dispatch({
      type: 'ERROR',
      payload: 1
    })
  }
  return systemIntegrationObj;
}


function unitCharacterSticObjectPreparation(stateTree, dispatch) {
  var unitCharacteristicsObj = [];
  stateTree.unitCharacteristics && stateTree.unitCharacteristics.selectedunitCharacteristics ?
    stateTree.unitCharacteristics.selectedunitCharacteristics.map(suc => {
      suc.editableAttributes.map(ea => {
        if (suc.isSavable) {
          unitCharacteristicsObj.push(new Object({
            LocationId: suc.LocationId != 0 ? suc.LocationId : 0,
            AttributeId: suc.id != 0 ? suc.id : 0,
            AttributeName: suc.name,
            AttributeDescription: suc.description,
            LocationAttributeId: suc.LocationAttributeId != 0 ? suc.LocationAttributeId : 0,
            UnitOfMeasureId: suc.defaultUnitOfMeasureId ? suc.defaultUnitOfMeasureId : 0,
            UnitOfMeasureName: suc.UOM,
            Value: ea.Value,
            EffectiveStartDate: !!ea.EffectiveStartDate ? '/Date(' + (new Date(ea.EffectiveStartDate)).getTime() + ')/' : null,
            EffectiveEndDate: !!ea.EffectiveEndDate ? '/Date(' + (new Date(ea.EffectiveEndDate)).getTime() + ')/' : null,
            DisplayName: suc.display
          }))
        }
      })
    }) : dispatch({
      type: 'ERROR',
      payload: 1
    })
  console.log(unitCharacteristicsObj, "UnitCharacteristics")
  return unitCharacteristicsObj;


}

function rolesObjectPreparation(stateTree, dispatch) {
  var rolesObj = [];
  stateTree.users && stateTree.users.saveRoles ?
    stateTree.users.saveRoles.map(role => {
      rolesObj.push(role)
    }) : dispatch({
      type: 'ERROR',
      payload: 1
    })
  return rolesObj;
}

function workflowsObjectPreparation(stateTree, dispatch) {
  var workflowObj = [];
  stateTree.workFlows && stateTree.workFlows.defaultWorkFlow ?
    stateTree.workFlows.defaultWorkFlow.map(w => {
      let workflow = {}
      workflow.WorkflowGroupLocationId = w.WorkflowGroupLocationId
      workflow.WorkflowGroupId = w.WorkflowGroupId
      workflow.WorkflowGroupName = w.WorkflowGroupName
      workflowObj.push(workflow)
    }) : dispatch({
      type: 'ERROR',
      payload: 1
    })
  return workflowObj;
}


function gateWayObjectPreparation(stateTree, dispatch) {
  var gatewayObj = [];
  stateTree.gateways && stateTree.gateways.saveGateway ?
    stateTree.gateways.saveGateway.map(gateway => {
      gatewayObj.push(gateway)
    }) : dispatch({
      type: 'ERROR',
      payload: 1
    })
  console.log("gateways..", gatewayObj)
  return gatewayObj
}

function dataHistorianObjectPreparation(stateTree, dispatch) {
  var dataHistorianObj = [];
  stateTree.dataHistorian && stateTree.dataHistorian.saveScada ?
    stateTree.dataHistorian.saveScada.map(scada => {
      dataHistorianObj.push(scada)
    }) : dispatch({
      type: 'ERROR',
      payload: 1
    })
  return dataHistorianObj
}

function credentialdatavalidation(data) {
  var CredentialBasicData = data.basic.CredentialBasicData
  if (data.form.CredentialsManagementForm.hasOwnProperty('values')) {
    var i = 0
    for (i in CredentialBasicData) {
      if (CredentialBasicData[i].IsDropDown) {
        if (data.form.CredentialsManagementForm.values.hasOwnProperty(`${CredentialBasicData[i].DisplayName}`)) {
          if (data.form.CredentialsManagementForm.values[`${CredentialBasicData[i].DisplayName}`] != null) {
            if (i == CredentialBasicData.length - 1) {
              return 1
            }
          } else {
            return 0
          }
        } else {
          return 0
        }
      } else {
        if (data.form.CredentialsManagementForm.values.hasOwnProperty(`${CredentialBasicData[i].DisplayName}`)) {
          if (i == CredentialBasicData.length - 1) {
            return 1
          }
        } else {
          return 0
        }
      }
    }
  }
  return 0
}

export function saveCompleteLocationWizard() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().form.BasicInfoForm.hasOwnProperty('values') ? Object.keys(getState().form.BasicInfoForm.values).length < 10 ? Object.keys(getState().form.BasicInfoForm.values).length == 9 ? !getState().form.BasicInfoForm.hasOwnProperty('parentLocation') ? (getState().form.BasicInfoForm.values.locationType != null && getState().form.BasicInfoForm.values.primaryMarket != null && getState().form.BasicInfoForm.values.timezone != null && getState().form.BasicInfoForm.values.technologyType != null && getState().form.BasicInfoForm.values.fuelClass != null && getState().form.BasicInfoForm.values.physicalTimezone != null && getState().form.BasicInfoForm.values.owner != null) ? (credentialdatavalidation(getState())) ? //Save
        saveObjectPreparationAndCall(getState, dispatch) : dispatch({
          type: 'ERROR',
          payload: 1
        }) && console.log('error') : dispatch({
          type: 'ERROR',
          payload: 1
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        }) : (getState().form.BasicInfoForm.values.technologyType == getState().form.BasicInfoForm.values.secondarytechnologyType) ? dispatch({
          type: 'ERROR',
          payload: 1
        }) && console.log('check here') : (getState().form.BasicInfoForm.values.locationType != null && getState().form.BasicInfoForm.values.primaryMarket != null && getState().form.BasicInfoForm.values.timezone != null && getState().form.BasicInfoForm.values.technologyType != null && getState().form.BasicInfoForm.values.fuelClass != null && getState().form.BasicInfoForm.values.physicalTimezone != null && getState().form.BasicInfoForm.values.owner != null) ? (credentialdatavalidation(getState())) ? //Save
        saveObjectPreparationAndCall(getState, dispatch) : dispatch({
          type: 'ERROR',
          payload: 1
        }) && console.log('error') : dispatch({
          type: 'ERROR',
          payload: 1
        })

      : dispatch({
        type: 'ERROR',
        payload: 1
      })
      console.log(Object.keys(getState().form.BasicInfoForm.values).length, 'stateobjectmo')

    })
  }
}

function saveObjectPreparationAndCall(getState, dispatch) {
  var values = getState().form.BasicInfoForm ? getState().form.BasicInfoForm.values : {};

  CheckLocationNameIsExists(getState().location.allLocations, values.locationName);
  var isLocationNamePresent = isLocationNameExists;
  if (isLocationNamePresent && !(values.locationId > 0)) {
    isLocationNameExists = false;
    dispatch({
      type: SAVE_RESPONSE_HANDLER,
      payload: {
        response: null,
        message: "Location Name is already present. Name should be unique",
        openSavePopup: true
      }
    });
  } else {
    isLocationNameExists = false;
    dispatch({
      type: 'ERROR',
      payload: 0
    });

    var locationId = values.locationId;
    var primaryMarketTypeId = values.primaryMarket.id || values.primaryMarket;
    var basicInfoObj = basicInforObjectPreparation(values)
    var credentialsAndIdentifier = prepareCredentialsAndIdentifiersObj(
      getState().form.CredentialsManagementForm ? getState().form.CredentialsManagementForm.values : {},
      primaryMarketTypeId,
      locationId)
    var equipmentsObj = equipmentObjectPreparation(getState(), dispatch, locationId)
    var systemIntegrationObj = SystemIntegrationObjectPreparation(getState(), dispatch)
    var unitCharacteristicsObj = unitCharacterSticObjectPreparation(getState(), dispatch)
    var rolesObj = rolesObjectPreparation(getState(), dispatch)
    var workflowObj = workflowsObjectPreparation(getState(), dispatch);
    var gatewayObj = gateWayObjectPreparation(getState(), dispatch);
    var dataHistorianObj = dataHistorianObjectPreparation(getState(), dispatch);

    var finalSaveObject = {
      "saveData": {
        Location: basicInfoObj,
        UnitCharacteristics: unitCharacteristicsObj,
        CredentialsAndIdentifiers: credentialsAndIdentifier,
        SupportInformation: systemIntegrationObj,
        WorkflowGroups: workflowObj,
        Roles: rolesObj,
        Gateways: gatewayObj,
        ScadaPoints: dataHistorianObj,
        Equipments: equipmentsObj
      }
    }

    // console.log('check')
    // var k = test(basicInfoObj.Id, getState().location.allLocations)
    // console.log(k);

    var finalData = JSON.stringify(finalSaveObject)
    console.log("finalSaveObject", finalData)
    dispatch({
      type: SHOW_SPINNER,
      payload: true
    })
    axios({
      method: 'post',
      url: 'https://web-dev-04.versifysolutions.com/GGKAPI/Services/API.svc/SaveOMSLocationWizardData',
      data: finalSaveObject
    }).then(function(response) {
      console.log("success", response);
      if (response.status === 200) {
        //ADD Location ID to Object
        var locationID = response.data.SaveOMSLocationWizardDataResult.Location.Id;
        getState().form.BasicInfoForm.values.locationId = locationID;
        //Refresh left menu        
        dispatch({
          type: SAVE_RESPONSE_HANDLER,
          payload: {
            response: response,
            message: "Location saved successfully",
            openSavePopup: true
          }
        });
        basicInfoDropdowns.getParentLocations().then(function(response) {
          dispatch({
            type: GET_ALL_LOCATIONS_INFORMATION,
            payload: response.data.GetAllLocationsResult
          });
        }).then(function() {
          //Expnd ADD Node in left menu
          dispatch({
            type: DEFAULT_NODE_EXPANDED,
            payload: locationID
          })
        })
        dispatch({
          type: HIDE_SPINNER,
          payload: false
        })
      }else{
        dispatch({
        type: SAVE_RESPONSE_HANDLER,
        payload: {
          response: null,
          message: "Error occured while saving the Location",
          openSavePopup: true
        }
      });
         dispatch({
          type: HIDE_SPINNER,
          payload: false
        })
      }
    }).catch(function(error) {
      dispatch({
        type: SAVE_RESPONSE_HANDLER,
        payload: {
          response: null,
          message: error,
          openSavePopup: true
        }
      });
      dispatch({
        type: HIDE_SPINNER,
        payload: false
      })
    });

  }
}

function test(Id, allLocations) {
  console.log('check2')
  let array = []
  let i = 0
  for (i in allLocations) {
    let element = findanddestroy(allLocations[i], Id);
    !!element ? array.push(element) : null
  }
  console.log(array)
  return array

}

function findanddestroy(Location, Id) {
  let array = []
  if (Location.id == Id) {
    return
  } else {
    if (!Location.Children) {
      console.log(Location)
      return Location
    } else {
      Location.Children.map((children, i) => {
        let element = findanddestroy(children, Id);
        !!element ? array.push(element) : null
      })
      return array
    }
  }
}

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}

function changeObjectTypeOfLocations(allLocations) {
  var changedLocationsObject = [];
  allLocations.forEach(function(item) {
    changedLocationsObject.push({
      key: item.Id,
      value: item.Id,
      label: item.Name,
      disabled: !item.IsOutageLevel || false,
      children: changeObjectTypeOfLocations(item.Children)
    });
  });
  return changedLocationsObject
}

function AddDefaultParent(objectfuncntion) {
  var object = objectfuncntion
  var returnObj = []
  returnObj.push({
    key: 0,
    value: 0,
    label: 'LOCATIONS'
  })
  object.map((element) => {
    returnObj.push(element)
  })
  return returnObj
}

export function getLocationsInformation() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      basicInfoDropdowns.getParentLocations().then(function(response) {
        dispatch({
          type: GET_ALL_LOCATIONS_INFORMATION,
          payload: response.data.GetAllLocationsResult
        });
      })
    }).then(function() {
      dispatch({
        type: HIDE_SPINNER,
        payload: false
      });
    })
  }
}

export const ACTION_HANDLERS = {
  [TOGGLE_LEFTMENU_CLICK]: (state, action) => {
    //Handling adding claases  sidebar-open,sidebar-collapse based on screen resolution
    var bodyClassList = toArray(document.getElementsByTagName('body')[0].classList);
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth;
    if (x <= 768) {
      if (bodyClassList.indexOf('sidebar-open') > 0) {
        document.getElementsByTagName('body')[0].className = "skin-qc fixed sidebar-mini";
      } else {
        document.getElementsByTagName('body')[0].className += " sidebar-open"
      }
    } else {
      if (bodyClassList.indexOf('sidebar-collapse') > 0) {
        document.getElementsByTagName('body')[0].className = "skin-qc fixed sidebar-mini";
      } else {
        document.getElementsByTagName('body')[0].className += " sidebar-collapse"
      }
    }
    return Object.assign({}, state)
  },
  [GET_ALL_LOCATIONS_INFORMATION]: (state, action) => {
    return Object.assign({}, state, {
      allLocations: action.payload,
      parentLocations: AddDefaultParent(changeObjectTypeOfLocations(action.payload)),
      isLoading: false
    })
  },
  [SHOW_SPINNER]: (state, action) => {
    return Object.assign({}, state, {
      isLoading: action.payload || true
    })
  },
  [HIDE_SPINNER]: (state, action) => {
    return Object.assign({}, state, {
      isLoading: action.payload || false
    })
  },
  [DEFAULT_NODE_EXPANDED]: (state, action) => {
    return Object.assign({}, state, {
      defaultNodeExpanded: action.payload || 0
    })
  },
  [SHOW_HIDE_ALERT]: (state, action) => {
    if (action.payload.locationState.showClickChangePopUp) {
      return Object.assign({}, state, {
        showClickChangePopUp: false,
        currentLocationId: action.payload.currentLocationId || 0
      })
    } else {
      return Object.assign({}, state, {
        showClickChangePopUp: true,
        currentLocationId: action.payload.currentLocationId || 0
      })
    }
  },
  [SAVE_RESPONSE_HANDLER]: (state, action) => {
    //action.response:.message:.isSaved: 
    if (action.payload.openSavePopup) {
      return Object.assign({}, state, {
        showLocationSaveResponsePopup: true,
        responseMessage: action.payload.message || ''
      })

    } else {
      return Object.assign({}, state, {
        showLocationSaveResponsePopup: false,
        responseMessage: ''
      })
    }


  },
}

const initialState = {
  error: null,
  allLocations: [],
  parentLocations: [],
  defaultNodeExpanded: 0,
  showClickChangePopUp: false,
  showLocationSaveResponsePopup: false,
  responseMessage: '',
  currentLocationId: 0,
  isLoading: true
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}