import {
  getAllUOMValues,
  getUnitCharacteristics
} from 'api/locationWizardApi'
import moment from 'moment'

export const GET_ALL_UOM_VALUES = 'GET_ALL_UOM_VALUES'
export const GET_UNIT_CHARACTERSTICS = 'GET_UNIT_CHARACTERSTICS'
export const SELECTED_UNIT_CHARACTERISTICS = 'SELECTED_UNIT_CHARACTERISTICS'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const EDITABLE_ATTRIBUTE = 'EDITABLE_ATTRIBUTE'
export const ADD_ROW = 'ADD_ROW'
export const UPDATE_ROW = 'UPDATE_ROW'
export const CURRENT_EDIT = 'CURRENT_EDIT'

function Arraycreator(data){
  let array=[]
  data.map((value)=>array.push(value))
  return array
}
export function removeEditableAttribute(element,i) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data =[]
        getState().unitCharacteristics.editableAttributes.map((values,j)=>{
          if(i!=j){
            data.push(values)
          }
        })
     dispatch({type:EDITABLE_ATTRIBUTE,
          payload : data
})
    })
  }
}

export function updateRow() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let i = getState().unitCharacteristics.currentediting.index
       let unSelectedUnitCharacteristics =[]
      let data =[]
      let secondarydata=[]
      let formdata = getState().form.UnitCharacteristicsForm.values
      getState().unitCharacteristics.selectedunitCharacteristics.map((value,j)=>{
        if(i !=j){
          data.push(value)
        }
        else{
            formdata.ucvalue.map((value,i)=>{
                    secondarydata.push({ucvalue:value,effectiveStartDate:formdata.effectiveStartDate[i],effectiveEndDate:formdata.effectiveEndDate[i]})
                })
              data.push(Object.assign({},formdata.charateristicName,{isSavable : true,isEditable : true,editableAttributes:secondarydata}))
        }
      })


     getState().unitCharacteristics.unSelectedUnitCharacteristics.map((value,i)=>{
        if(value.id != formdata.charateristicName.id ){
          unSelectedUnitCharacteristics.push(value)
        }

})
      dispatch({
        type:UPDATE_ROW,
        payload:data,
        unSelectedUnitCharacteristics:unSelectedUnitCharacteristics,
        showModal:false
      })
    })
  }
}


export function AddUnitCharateristic () {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data = getState().form.UnitCharacteristicsForm.values
      let unSelectedUnitCharacteristics =[]
      let toadd
      getState().unitCharacteristics.unSelectedUnitCharacteristics.map((value,i)=>{
        if(value.id != data.charateristicName.id ){
          unSelectedUnitCharacteristics.push(value)
        }else{
          toadd = value
          toadd.isDeletable = true
          toadd.isSavable = true
          toadd.isEditable = true
          toadd.editableAttributes=[]
        }
      } )

        data.ucvalue.map((value,i)=>{
          toadd.editableAttributes.push({ucvalue:value,effectiveStartDate:data.effectiveStartDate[i],effectiveEndDate:data.effectiveEndDate[i]})
        })


      let selectedunitCharacteristics = Arraycreator(getState().unitCharacteristics.selectedunitCharacteristics)
          selectedunitCharacteristics.push(toadd)
          dispatch({
            type:ADD_ROW,
              payload:{
                selectedunitCharacteristics:selectedunitCharacteristics,
                unSelectedUnitCharacteristics:unSelectedUnitCharacteristics,
                showModal:false
              }
          })
    })
  }
}

export function ToggleAddEditModal (action) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
    if(action.type == 'add'){
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: 'UnitCharacteristicsForm',
        },
        payload: ''

      })

      let data = [{}]
      dispatch({
          type:EDITABLE_ATTRIBUTE,
          payload : data

   })
      dispatch({type:TOGGLE_MODAL,payload:{showModal:true , disable:false,isEditable:false}})
    }
    if(action.type =='edit'){
      console.log('edit')
      dispatch({type:TOGGLE_MODAL,payload:{showModal:true , disable:false,isEditable:true}})
    }
if(action.type=='close'){
   dispatch({type:TOGGLE_MODAL,payload:{showModal:false , disable:false}})
}
    })
  }
}

export function pushEditableAtribute() {
return(dispatch, getState) => {
    return new Promise((resolve) => {
      let data = Arraycreator(getState().unitCharacteristics.editableAttributes)
      data.push({})
         dispatch({
          type:EDITABLE_ATTRIBUTE,
          payload:data

   })
  })
}
}

export function characteristicNameSelected(e) {
return(dispatch, getState) => {
    return new Promise((resolve) => {
     let data = getState().form.UnitCharacteristicsForm.values

      dispatch({
        type: 'redux-form/INITIALIZE',
        meta: {
          form: 'UnitCharacteristicsForm',
          keepDirty: false
        },
        payload: {
          charateristicName: e,
          displayNameLabel: e.display,
          descriptionLabel: e.description,
          UOMLabel: e.UOM,
          ucvalue:data.ucvalue,
          effectiveStartDate: data.effectiveStartDate,
          effectiveEndDate:data.effectiveEndDate
        }

      })

    })
  }
}
export function edit(name,i) {
return(dispatch, getState) => {
    return new Promise((resolve) => {
   let data = Arraycreator(getState().unitCharacteristics.selectedunitCharacteristics)

 
   let intializedata = {
          charateristicName: data[i],
          displayNameLabel: data[i].display,
          descriptionLabel: data[i].description,
          UOMLabel: data[i].UOM,
        }
   if(!data[i].isDeletable || !data[i].isEditable){
    dispatch({type:TOGGLE_MODAL,payload:{showModal:true , disable:true,isEditable:true}})
   }
   dispatch({
    type:EDITABLE_ATTRIBUTE,
    payload:data[i].editableAttributes

   })
   intializedata.ucvalue=[]
   intializedata.effectiveStartDate=[]
   intializedata.effectiveEndDate=[]
   data[i].editableAttributes.map((values,i)=>{
    intializedata.ucvalue.push(values.ucvalue)
    intializedata.effectiveEndDate.push(values.effectiveEndDate)
    intializedata.effectiveStartDate.push(values.effectiveStartDate)
   })
   console.log(intializedata)
   dispatch({
    type:CURRENT_EDIT,
    payload:{name:name,index:i},
    unSelectedUnitCharacteristics:Arraycreator(getState().unitCharacteristics.allexceptdefaultoptions)
   })
    dispatch({
        type: 'redux-form/INITIALIZE',
        meta: {
          form: 'UnitCharacteristicsForm',
          keepDirty: false
        },
        payload: intializedata
      })

    })
  }
}


export function getDefaultUnitCharacteristics (allUOMvalues) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {   
      getUnitCharacteristics().then(function (response) {
        let selectedunitCharacteristics = []
        let options = []
        dispatch({
          type: GET_UNIT_CHARACTERSTICS,
          payload: response.data
        })


        response.data.map((uc) => {
          if (uc.name.toLowerCase() === 'capacity' ||
            uc.name.toLowerCase() === 'eco min' ||
            uc.name.toLowerCase() === 'eco max') {
            uc.editableAttributes = [{}]
            uc.isDeletable = false
            uc.isSavable = false
            let i = 0
            for(i in allUOMvalues){
              if (uc.defaultUnitOfMeasureId === allUOMvalues[i].id) {
                  uc.UOM = allUOMvalues[i].name
                  break
              }
            }
            selectedunitCharacteristics.push(uc)
          }
          else{
             let i = 0
              for(i in allUOMvalues){
              if (uc.defaultUnitOfMeasureId === allUOMvalues[i].id) {
                  uc.UOM = allUOMvalues[i].name
                  break
              }
            }
            uc.isDeletable = true
            uc.isSavable = false
            options.push(uc)
          }

        })
    dispatch({
          type: SELECTED_UNIT_CHARACTERISTICS,
          payload: {
            selectedunitCharacteristics:selectedunitCharacteristics,
            unSelectedUnitCharacteristics:options,
            allexceptdefaultoptions:Arraycreator(options)
          }
        })

      })
    })
  }
}


export function getDefaultUnitCharacteristicsService () {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().unitCharacteristics.allUOMvalues.length === 0
        ? getAllUOMValues().then(function (response) {
          dispatch({
            type: GET_ALL_UOM_VALUES,
            payload: response.data
          })
          dispatch(getDefaultUnitCharacteristics(response.data))
        }) : null
    })
  }
}

export const ACTION_HANDLERS = {
[GET_ALL_UOM_VALUES] : (state,action)=>{
  return Object.assign({},state,{allUOMvalues:action.payload})
},
[GET_UNIT_CHARACTERSTICS] :(state,action) => {
  return Object.assign({},state,{unitCharacteristics:action.payload}) 
},
[SELECTED_UNIT_CHARACTERISTICS] :(state,action) => {
  return Object.assign({},state,{
    selectedunitCharacteristics:action.payload.selectedunitCharacteristics,
    unSelectedUnitCharacteristics:action.payload.unSelectedUnitCharacteristics,allexceptdefaultoptions:action.payload.allexceptdefaultoptions})  
},
[TOGGLE_MODAL] :(state,action) => {
  return Object.assign({},state,{showModal:action.payload.showModal,disable:action.payload.disable,isEditable:action.payload.isEditable}) 
},
[EDITABLE_ATTRIBUTE] :(state,action) => {
  return Object.assign({},state,{editableAttributes:action.payload}) 
},
[ADD_ROW] :(state,action) => {
  return Object.assign({},state,{selectedunitCharacteristics:action.payload.selectedunitCharacteristics,
    unSelectedUnitCharacteristics:action.payload.unSelectedUnitCharacteristics,
    showModal:action.payload.showModal
  }) 
},
[CURRENT_EDIT] :(state,action) => {
  return Object.assign({},state,{currentediting:action.payload,unSelectedUnitCharacteristics:action.unSelectedUnitCharacteristics}) 
},
[UPDATE_ROW] :(state,action) => {
  return Object.assign({},state,{selectedunitCharacteristics:action.payload,unSelectedUnitCharacteristics:action.unSelectedUnitCharacteristics,showModal:action.showModal}) 
},
}




const initialState = {
  error: '',
  unitCharacteristics: [],
  allUOMvalues: [],
  selectedunitCharacteristics: [],
  unSelectedUnitCharacteristics: [],
  defaultUnitCharacteristics: [],
  finalUnitCharacteristics: [],
  deletedUnitCharacteristics: [],
  showModal: false,
  showDeleteModal: false,
  deletingUnitIndex: 0,
  editableUnitCharacter: {},
  showEditModal: false,
  startDate: moment(),
  UOMLabel: '',
  descriptionLabel: '',
  displayNameLabel: '',
  isEditable: false,
  editableIndex: 0,
  disable:false,
  editableAttributes:null,
  dateRangeValidation: [],
  currentediting:{},
  allexceptdefaultoptions:[],
  isChanged: false
}

export default function unitCharacteristicsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
