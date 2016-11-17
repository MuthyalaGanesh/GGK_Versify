import {
  basicInfoDropdowns,
  finalLocationSaveObject,
  getOMSLocationwizardData,
  getMarketDrivenMappings,
  getDataHistorian
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

import axios from 'axios'

export const TOGGLE_LEFTMENU_CLICK = 'TOGGLE_LEFTMENU_CLICK';

export const LOCATIONS_MENUITEM_DROPDOWN_CLICK = 'LOCATIONS_MENUITEM_DROPDOWN_CLICK';

export function toggleMenuClick(event) {
  return {
    type: TOGGLE_LEFTMENU_CLICK,
    payload: event
  };
}

var currentLocation = null;
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

export function leftMenuDropdownClickEvent(id, event) {
  console.log("LOCATIONS_MENUITEM_DROPDOWN_CLICK:", id);
  return (dispatch, getState) => {
    var allLocationdata = basicInfoDropdowns.getLocations;
    findLocation(allLocationdata, id);
    var locationObj = currentLocation;
    currentLocation = null;
    let editObject = getOMSLocationwizardData(id);
    let locationsInfo = editObject.GetOMSLocationWizardDataResult.AssignedLocationMappings;
    let dataHistorianParticularLocationObject = editObject.GetOMSLocationWizardDataResult.AssignedScadaPoints;
    dispatch(bindLocationData(dataHistorianParticularLocationObject));
    var selected_system_integrations = []
    for (var i = 0; i < locationsInfo.length; i++) {
      if (locationsInfo[i].AliasName && locationsInfo[i].LocationMappingId > 0) {
        selected_system_integrations.push(locationsInfo[i]);
      }
    }
    dispatch(bindGatewayLocationData(editObject.GetOMSLocationWizardDataResult.Gateways))
    dispatch(editSystemIntegration(selected_system_integrations));
    dispatch(bindWorkLocationData(editObject.GetOMSLocationWizardDataResult.AssignedWorkflowGroups));
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

    dispatch(BindInitialValues(locationObj));

    // dispatch(BindUnitCharacteristicsInitialValues(locationObj))
  };
};


function basicInforObjectPreparation(values) {
  var todayDate = new Date();
  return new Object({
    Id: values.locationId || 0,
    LocationId: values.locationId || 0,
    Name: values.locationName,
    Tz: values.timezone.id,
    ParentId: values.parentLocation || 0,
    LocationType: values.locationType.name,
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
    TechnologyTypeId: values.technologyType.id,
    SecondaryTechnologyTypeId: values.secondarytechnologyType.id,
    PrimaryMarketId: values.primaryMarket.id,
    SecondaryMarketId: null,
    FuelClassId: values.fuelClass.id,
    IsReportingLevel: false,
    DisplayRealTimeMonitor: false,
    OwnerOrgId: values.owner.id,
    VTraderName: null,
    Attributes: null,
    IsSelected: false,
    MetricIds: null,
    PhysicalTz: values.physicalTimezone.id,
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


function credentialsAndIdentifiersObj(credentialsObj, primaryMarketTypeId, locationId) {

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
  var groupByItems = _.groupBy(itemDatawithMarketDrivenMappings, function (b) {
    return b.ExternalSystemName
  })
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
  //Final  Credentials And Identifiers Object
  credentialsAndIdentifiersObj = [{
    LocationMappingRecords: locationMappingData
  }];
  return credentialsAndIdentifiersObj;
}

function equipmentObjectPreparation(stateTree, dispatch) {
  var equipmentsObj = []
  stateTree.equipments && stateTree.equipments.insertedEquipment ? stateTree.equipments.insertedEquipment.map(eq => {
    equipmentsObj.push({
      id: 0,
      LocationId: 0,
      Name: eq,
      IsDirty: false
    })
  }) : dispatch({
    type: 'ERROR',
    payload: 1
  })
  console.log(equipmentsObj, "Equipments")
  return equipmentsObj;

}


function SystemIntegrationObjectPreparation(stateTree, dispatch) {
  var systemIntegrationObj = []
  if (stateTree.systemIntegration) {
    systemIntegrationObj = stateTree.systemIntegration.selectedSystemIntegrationTypes;
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
            LocationId: 0,
            AttributeId: suc.id != 0 ? suc.id : 0,
            AttributeName: suc.name,
            AttributeDescription: suc.description,
            LocationAttributeId: 0,
            UnitOfMeasureId: suc.defaultUnitOfMeasureId,
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
          if (i == CredentialBasicData.length -1) {
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
      getState().form.BasicInfoForm.hasOwnProperty('values')
       ? Object.keys(getState().form.BasicInfoForm.values).length < 10 
          ? Object.keys(getState().form.BasicInfoForm.values).length == 9 
              ? !getState().form.BasicInfoForm.hasOwnProperty('parentLocation') 
                  ? (getState().form.BasicInfoForm.values.locationType != null && getState().form.BasicInfoForm.values.primaryMarket != null && getState().form.BasicInfoForm.values.timezone != null && getState().form.BasicInfoForm.values.technologyType != null && getState().form.BasicInfoForm.values.fuelClass != null && getState().form.BasicInfoForm.values.physicalTimezone != null  && getState().form.BasicInfoForm.values.owner != null) 
                    ? (credentialdatavalidation(getState()))  
                      ? dispatch({
                         type: 'ERROR',
                          payload: 0
                        }) && console.log('NOerror') 
                      : dispatch({
                          type: 'ERROR',
                          payload: 1
                        }) && console.log('error') 
                    : dispatch({
                       type: 'ERROR',
                        payload: 1
                      }) 
                  : dispatch({
                      type: 'ERROR',
                      payload: 1
                    }) 
                : dispatch({
                    type: 'ERROR',
                    payload: 1
                  }) 
              : (getState().form.BasicInfoForm.values.technologyType == getState().form.BasicInfoForm.values.secondarytechnologyType) 
                  ? dispatch({
                    type: 'ERROR',
                    payload: 1
                  }) && console.log( 'check here' )
                  : (getState().form.BasicInfoForm.values.locationType != null && getState().form.BasicInfoForm.values.primaryMarket != null && getState().form.BasicInfoForm.values.timezone != null && getState().form.BasicInfoForm.values.technologyType != null && getState().form.BasicInfoForm.values.fuelClass != null && getState().form.BasicInfoForm.values.physicalTimezone != null  && getState().form.BasicInfoForm.values.owner != null) ? (credentialdatavalidation(getState())) 
                      ? dispatch({
                          type: 'ERROR',
                          payload: 0
                        }) && console.log('NOerror') 
                      : dispatch({
                          type: 'ERROR',
                          payload: 1
                        }) && console.log('error') 
            : dispatch({
                type: 'ERROR',
                payload: 1
              })

         : dispatch({
        type: 'ERROR',
        payload: 1
      })
      console.log(Object.keys(getState().form.BasicInfoForm.values).length, 'stateobjectmo')
      var values = getState().form.BasicInfoForm ? getState().form.BasicInfoForm.values : {};
      var locationId = values.LocationId;
      var primaryMarketTypeId = values.primaryMarket.id;

      var basicInfoObj = basicInforObjectPreparation(values)
      var credentialsAndIdentifier = credentialsAndIdentifiersObj(
        getState().form.CredentialsManagementForm ? getState().form.CredentialsManagementForm.values : {},
        primaryMarketTypeId,
        locationId)
      var equipmentsObj = equipmentObjectPreparation(getState(), dispatch)
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
      var finalData = JSON.stringify(finalSaveObject)
      console.log("finalSaveObject", finalData)
      // axios({
      //   method: 'post',
      //   url: 'https://web-dev-04.versifysolutions.com/GGKAPI/Services/API.svc/SaveOMSLocationWizardData',
      //   data: finalSaveObject
      // }).then(function(response) {
      //   console.log("success", response);
      // }).catch(function(error) {
      //   alert("error" + JSON.stringify(error));
      // });

    })
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
}

function changeObjectTypeOfLocations(allLocations) {
  var changedLocationsObject = [];
  allLocations.forEach(function (item) {
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

const allParentLocationsObject = basicInfoDropdowns.getParentLocations;

const initialState = {
  error: null,
  allLocations: allParentLocationsObject,
  parentLocations: AddDefaultParent(changeObjectTypeOfLocations(allParentLocationsObject)),

};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}