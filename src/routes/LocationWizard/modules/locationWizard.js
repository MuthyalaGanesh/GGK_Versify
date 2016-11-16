import {
  basicInfoDropdowns,
  finalLocationSaveObject,
  getOMSLocationwizardData,
  getMarketDrivenMappings 
} from 'api/locationWizardApi'

import {
  BindInitialValues
} from './basicInfo';

export const TOGGLE_LEFTMENU_CLICK = 'TOGGLE_LEFTMENU_CLICK';

export const LOCATIONS_MENUITEM_DROPDOWN_CLICK = 'LOCATIONS_MENUITEM_DROPDOWN_CLICK';

export function toggleMenuClick(event) {
  return {
    type: TOGGLE_LEFTMENU_CLICK,
    payload: event
  };
}


export function leftMenuDropdownClickEvent(id, event) {
  console.log("LOCATIONS_MENUITEM_DROPDOWN_CLICK:", id);
  return (dispatch, getState) => {
    dispatch({
      type: 'redux-form/DESTROY',
      meta: {
        form: "BasicInfoForm"
      },
      payload: ''
    })
    dispatch(BindInitialValues(id));

  };
};
export function saveCompleteLocationWizard() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      console.log("state pro-", getState())
      getState().form.BasicInfoForm.hasOwnProperty('values') ? Object.keys(getState().form.BasicInfoForm.values).length < 11 ? dispatch({
        type: 'ERROR',
        payload: 1
      }) : (getState().form.BasicInfoForm.values.technologyType == getState().form.BasicInfoForm.values.secondarytechnologyType) ? dispatch({
        type: 'ERROR',
        payload: 1
      }) : console.log(getState(), 'stateobject') : dispatch({
        type: 'ERROR',
        payload: 1
      })

      var basicInfoObj = {}
      var todayDate = new Date();
      
      var values = getState().form.BasicInfoForm ? getState().form.BasicInfoForm.values : {};
      var locationId = values.LocationId;
      var primaryMarketTypeId= values.primaryMarket.id;
      basicInfoObj = new Object({
        Id: 0,
        LocationId: 0,
        Name: values.locationName,
        Tz: values.timezone.id,
        ParentId: values.parentLocation,
        LocationType: values.locationType.name,
        Notes: null,
        CreateDate: '\\/Date(' + todayDate.getTime() + ')\\/',
        CreateUser: null,
        UpdateDate: '\\/Date(' + todayDate.getTime() + ')\\/',
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
      })
      console.log("Basic info-", basicInfoObj, )
      var credentialsAndIdentifiersObj = [];
      var credentialsObj = getState().form.CredentialsManagementForm ? getState().form.CredentialsManagementForm.values : {};
       //get MarketDrivenMappings from API based on marketType ID
    var marketDrivenMappings = getMarketDrivenMappings(primaryMarketTypeId);
    var omsLocationwizardData = getOMSLocationwizardData(locationId >0 ? locationId : null);    
    var locationMappingData = [];
     var itemDatawithMarketDrivenMappings =[];
    _.each(marketDrivenMappings, (item) => {
      var itemData = item;
      itemData.value=null;
       if(credentialsObj.hasOwnProperty(item.DisplayName)){
         if(item.IsDropDown){
          itemData.value = credentialsObj[item.DisplayName].key;
         }else{
          itemData.value = credentialsObj[item.DisplayName];
         }
        }
        itemDatawithMarketDrivenMappings.push(itemData);
      // _.each(omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings, (wizardDataItem) => {
      //   debugger;
        
      //     locationMappingData.push(
      //       {
      //         LocationMappingId: wizardDataItem.LocationMappingId || 0,
      //         ExternalSystemName: itemData.ExternalSystemName || '',
      //         AliasName: itemData.AliasName ||'',
      //         ExternalSystemLogin: itemData.ExternalSystemLogin || '',
      //         ExternalSystemPwd:itemData.ExternalSystemPwd || '',
      //         ParameterList: itemData.ParameterList || '',
      //         FlaggedForDeletion: false
      
      //     });
      //})
    });
//     var groupByItems = _(itemDatawithMarketDrivenMappings).groupBy("ExternalSystemName");
//     var c = _.groupBy(itemDatawithMarketDrivenMappings, function(b) { return b.ExternalSystemName})
// _.each(groupByItems, (item) => {
//   debugger;
//        locationMappingData.push(
//             {
//               LocationMappingId: item.LocationMappingId || 0,
//               ExternalSystemName: itemData.ExternalSystemName || '',
//               AliasName: itemData.AliasName ||'',
//               ExternalSystemLogin: itemData.ExternalSystemLogin || '',
//               ExternalSystemPwd:itemData.ExternalSystemPwd || '',
//               ParameterList: itemData.ParameterList || '',
//               FlaggedForDeletion: false
      
//           });
// })

      var assignedLocationMappings = omsLocationwizardData.GetOMSLocationWizardDataResult.AssignedLocationMappings;
      
      var equipmentsObj = []
      getState().equipments && getState().equipments.insertedEquipment ? getState().equipments.insertedEquipment.map(eq => {
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

      var systemIntegrationObj = [];
      if (getState().systemIntegration) {
        systemIntegrationObj = getState().selectedSystemIntegrationTypes;
        console.log(getState().systemIntegration.selectedSystemIntegrationTypes, "SystemIntegrations")
      } else {
        dispatch({
          type: 'ERROR',
          payload: 1
        })
      }

      var unitCharacteristicsObj = [];
      getState().unitCharacteristics && getState().unitCharacteristics.selectedunitCharacteristics ?
        getState().unitCharacteristics.selectedunitCharacteristics.map(suc => {
          suc.editableAttributes.map(ea => {
            if (suc.isSavable) {
              unitCharacteristicsObj.push(new Object({
                LocationId: 0,
                AttributeId: suc.id,
                AttributeName: suc.name,
                AttributeDescription: suc.description,
                LocationAttributeId: 0,
                UnitOfMeasureId: suc.defaultUnitOfMeasureId,
                UnitOfMeasureName: suc.UOM,
                Value: ea.Value,
                EffectiveStartDate: ea.EffectiveStartDate,
                EffectiveEndDate: ea.EffectiveEndDate,
                DisplayName: suc.display
              }))
            }
          })
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        })
      console.log(unitCharacteristicsObj, "UnitCharacteristics")

      var rolesObj = [];
      getState().users && getState().users.saveRoles ?
        getState().users.saveRoles.map(role => {
          rolesObj.push(role)
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        })

      var workflowObj = [];
      getState().workFlows && getState().workFlows.defaultWorkFlow ?
        getState().workFlows.defaultWorkFlow.map(workflow => {
          workflowObj.push(workflow)
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        })

      var gatewayObj = [];
      getState().gateways && getState().gateways.saveGateway ?
        getState().gateways.saveGateway.map(gateway => {
          gatewayObj.push(gateway)
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        })

      var dataHistorianObj = [];
      getState().dataHistorian && getState().gateways.saveScada ?
        getState().gateways.saveScada.map(scada => {
          dataHistorianObj.push(scada)
        }) : dispatch({
          type: 'ERROR',
          payload: 1
        })

      var finalSaveObject = {
        saveData: {
          Location: basicInfoObj,
          UnitCharacteristics: unitCharacteristicsObj,
          CredentialsAndIdentifiers: credentialsAndIdentifiersObj,
          SupportInformation: systemIntegrationObj,
          WorkflowGroups: workflowObj,
          Roles: rolesObj,
          Gateways: gatewayObj,
          ScadaPoints: dataHistorianObj,
          Equipments: equipmentsObj
        }
      }
      var finalData = JSON.parse(JSON.stringify(finalSaveObject));
      console.log("finalSaveObject", finalData)
        //Call save Functionality
        //finalLocationSaveObject(finalData);
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
  allLocations.forEach(function(item) {
    changedLocationsObject.push({
      key: item.Id,
      value: item.Id,
      label: item.Name,
      disabled: !item.IsOutageLevel || false,
      children: changeObjectTypeOfLocations(item.Children)
    });
  });
  return changedLocationsObject;
}

const allLocationsObject = basicInfoDropdowns.getLocations;

const initialState = {
  error: null,
  allLocations: allLocationsObject,
  parentLocations: changeObjectTypeOfLocations(allLocationsObject),

};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}