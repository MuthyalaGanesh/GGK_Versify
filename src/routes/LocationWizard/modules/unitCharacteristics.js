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
export const ERROR = 'ERROR'
export const UPDATE_ROW = 'UPDATE_ROW'
export const CURRENT_EDIT = 'CURRENT_EDIT'
export const TO_BE_DELETED = 'TO_BE_DELETED'
export const DELETE_ROW = 'DELETE_ROW'
export const BIND_INITIAL_ATTRIBUTES = 'BIND_INITIAL_ATTRIBUTES'
export const BIND_INITIAL_ATTRIBUTES_NEW_LOCATION = 'BIND_INITIAL_ATTRIBUTES_NEW_LOCATION'

function Arraycreator(data) {
  let array = []
  data.map((value) => array.push(value))
  return array
}

function dateConversion(date) {
  var data = date.split('T')
  var preresult = data[0].split('-')
  var result = preresult[1] + '/' + preresult[2] + '/' + preresult[0]
  return result
}

function returndate(value) {
  var array = value.split('/')
  var preresult = array[1].split('(')
  var result = preresult[1].split(')')
  parseInt(result[0])
  return dateConversion(new Date(parseInt(result[0])).toISOString())
}
 function DateValidations (editableAttributes) {
  var errorStatus = false
  var dateValidations = []
  if (editableAttributes && editableAttributes.length > 0) {
    editableAttributes.map((ea, i) => {
      if (!ea.effectiveEndDate || !ea.effectiveStartDate || !ea.ucvalue) {
        errorStatus = true
      } else {
        var dateVariations = (editableAttributes[i - 1] && editableAttributes[i - 1].effectiveEndDate
          ? (new Date(editableAttributes[i - 1].effectiveEndDate) - new Date(ea.effectiveStartDate)) : (i > 0)
            ? (new Date(editableAttributes[0].effectiveEndDate) - new Date(ea.effectiveStartDate)) : null)
        if (dateVariations) {
          errorStatus = true
          dateValidations.push(dateVariations < 0
            ? 'Effective end date and start dates should not have gaps'
            : 'Effective end date and start dates should not overlap')
        }
        if ((new Date(ea.effectiveEndDate) - new Date(ea.effectiveStartDate)) < 0) {
          errorStatus = true
          dateValidations.push('Effective start date must be less than effective End date')
        }
      }
    })
  }
  return {
    errorStatus: errorStatus,
    dateValidations: dateValidations
  }
}

export function BindValuesForNewLocation() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {

      let selectedunitCharacteristics = Arraycreator(getState().unitCharacteristics.defaultUnitCharacteristics)
      let unSelectedUnitCharacteristics = Arraycreator(getState().unitCharacteristics.allexceptdefaultoptions)

      dispatch({
        type: BIND_INITIAL_ATTRIBUTES_NEW_LOCATION,
        payload: {
          selectedunitCharacteristics,
          unSelectedUnitCharacteristics
        }
      })
    })
  }
}


export function removeEditableAttribute(element, i) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data = []
      getState().unitCharacteristics.editableAttributes.map((values, j) => {
        if (i != j) {
          data.push(values)
        }
      })
      dispatch({
        type: EDITABLE_ATTRIBUTE,
        payload: data
      })
    })
  }
}


export function BindUnitCharacteristicsInitialValues(locationObj) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      console.log(locationObj)
      let selectedunitCharacteristics = []
      let unSelectedUnitCharacteristics = []
      if (locationObj.length == 0) {
        selectedunitCharacteristics = Arraycreator(getState().unitCharacteristics.defaultUnitCharacteristics)
      } else {
        locationObj.map((values, i) => {
            let flag = 0
            if (selectedunitCharacteristics.length == 0) {
              selectedunitCharacteristics.push({
                id: values.AttributeId,
                name: values.AttributeName,
                description: values.AttributeDescription,
                isVisible: true,
                defaultUnitOfMeasureId: values.UnitOfMeasureId,
                display: values.AttributeName,
                UOM: values.UnitOfMeasureName,
                isDeletable: false,
                isSavable: false,
                isEditable: true,
                editableAttributes: [],
                displayAttributes: {}
              })
              selectedunitCharacteristics[0].editableAttributes.push({
                ucvalue: values.Value,
                effectiveStartDate: returndate(values.EffectiveStartDate),
                effectiveEndDate: returndate(values.EffectiveEndDate)
              })
            } else {
              selectedunitCharacteristics.map((data) => {
                if (data.id == values.AttributeId) {
                  flag = 1
                  data.editableAttributes.push({
                    ucvalue: values.Value,
                    effectiveStartDate: returndate(values.EffectiveStartDate),
                    effectiveEndDate: returndate(values.EffectiveEndDate)
                  })
                }
              })
              if (flag != 1) {
                selectedunitCharacteristics.push({
                  id: values.AttributeId,
                  name: values.AttributeName,
                  description: values.AttributeDescription,
                  isVisible: true,
                  defaultUnitOfMeasureId: values.UnitOfMeasureId,
                  display: values.AttributeName,
                  UOM: values.UnitOfMeasureName,
                  isDeletable: false,
                  isSavable: false,
                  isEditable: true,
                  editableAttributes: [],
                  displayAttributes: {}
                })
                selectedunitCharacteristics[i].editableAttributes.push({
                  ucvalue: values.Value,
                  effectiveStartDate: returndate(values.EffectiveStartDate),
                  effectiveEndDate: returndate(values.EffectiveEndDate)
                })
              }
            }

          }

        )
      }
      console.log(selectedunitCharacteristics)

      getState().unitCharacteristics.allexceptdefaultoptions.map((values) => {
        let flag = 0
        selectedunitCharacteristics.map((data) => {
          data.displayAttributes = DateSwap(data.editableAttributes)
          if (data.id == values.id) {
            flag = 1
          }
        })
        if (flag != 1) {
          unSelectedUnitCharacteristics.push(values)
        }
      })

      getState().unitCharacteristics.defaultUnitCharacteristics.map((values) => {
        let flag = 0
        selectedunitCharacteristics.map((data) => {
          if (values.id == data.id) {
            flag = 1
          }

        })
        if (flag != 1) {
          selectedunitCharacteristics.push(values)
        }
      })



      console.log(selectedunitCharacteristics)



      dispatch({
        type: BIND_INITIAL_ATTRIBUTES,
        payload: {
          selectedunitCharacteristics,
          unSelectedUnitCharacteristics
        }
      })


    })
  }
}


export function DateSwap(editableAttributes) {
  var displayDateAttributes = {
    effectiveEndDate: editableAttributes[0].effectiveEndDate,
    effectiveStartDate: editableAttributes[0].effectiveStartDate,
    ucvalue: editableAttributes[0].ucvalue
  }
  var todayDate = new Date()
  var effDate = new Date(editableAttributes[0].effectiveStartDate)
  var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime())
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  var minDiff = diffDays < 0 ? (-1)(diffDays) : diffDays
  editableAttributes.map((ea, i) => {
    var effDate = new Date(ea.effectiveStartDate)
    var timeDiff = Math.abs(effDate.getTime() - todayDate.getTime())
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    diffDays = diffDays < 0 ? (-1)(diffDays) : diffDays
    if (diffDays < minDiff) {
      minDiff = diffDays
      displayDateAttributes = {
        effectiveEndDate: ea.effectiveEndDate,
        effectiveStartDate: ea.effectiveStartDate,
        ucvalue: ea.ucvalue
      }
    }
  })
  return displayDateAttributes
}

export function updateRow() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let formdata = getState().form.UnitCharacteristicsForm.values
      let checklength = getState().unitCharacteristics.editableAttributes.length
      if ( formdata.length == 0 || !formdata.hasOwnProperty('charateristicName')||  formdata.length <5 ||checklength != formdata.ucvalue.length || checklength != formdata.effectiveStartDate.length || checklength != formdata.effectiveEndDate.length) {
        dispatch({
          type: ERROR,
          payload: []

        })

      } else {
        let i = getState().unitCharacteristics.currentediting.index
        let unSelectedUnitCharacteristics = []
        let data = []
        let secondarydata = []
        let errorflag = false
        getState().unitCharacteristics.selectedunitCharacteristics.map((value, j) => {
          if (i != j) {
            data.push(value)
          } else {
            formdata.ucvalue.map((value, i) => {
              if(value == ''){
                errorflag = true
              }
              secondarydata.push({
                ucvalue: value,
                effectiveStartDate: formdata.effectiveStartDate[i],
                effectiveEndDate: formdata.effectiveEndDate[i]
              })
            })

            data.push(Object.assign({}, formdata.charateristicName, {
              isSavable: true,
              isEditable: true,
              editableAttributes: secondarydata,
              displayAttributes: DateSwap(secondarydata)
            }))
          }
        })


        getState().unitCharacteristics.unSelectedUnitCharacteristics.map((value, i) => {
          if (value.id != formdata.charateristicName.id) {
            unSelectedUnitCharacteristics.push(value)
          }

        })

        let errorobj = DateValidations(secondarydata)
        if(errorflag ||  errorobj.errorStatus ){
          console.log(errorobj.dateValidations)
          dispatch({
            type:ERROR,
            payload:errorobj.dateValidations
          })

        }else{

        dispatch({
          type: UPDATE_ROW,
          payload: data,
          unSelectedUnitCharacteristics: unSelectedUnitCharacteristics,
          showModal: false,
        })
}
      }
    })
  }
}



export function AddUnitCharateristic() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data = getState().form.UnitCharacteristicsForm.values
      let checklength = getState().unitCharacteristics.editableAttributes.length
      if (!!data ==false ||data.length == 0 || !data.hasOwnProperty('charateristicName')||  data.length <5 || checklength != data.ucvalue.length || checklength != data.effectiveStartDate.length || checklength != data.effectiveEndDate.length) {
        dispatch({
          type: ERROR,
          payload: []

        })

      } else {
        let unSelectedUnitCharacteristics = []
        let toadd
        let errorflag = false
        getState().unitCharacteristics.unSelectedUnitCharacteristics.map((value, i) => {
          if (value.id != data.charateristicName.id) {
            unSelectedUnitCharacteristics.push(value)
          } else {
            toadd = value
            toadd.isDeletable = true
            toadd.isSavable = true
            toadd.isEditable = true
            toadd.editableAttributes = []
            toadd.displayAttributes = {}
          }
        })

        data.ucvalue.map((value, i) => {
          if(value == ''){
                errorflag = true
              }
          toadd.editableAttributes.push({
            ucvalue: value,
            effectiveStartDate: data.effectiveStartDate[i],
            effectiveEndDate: data.effectiveEndDate[i]
          })
        })


        let selectedunitCharacteristics = Arraycreator(getState().unitCharacteristics.selectedunitCharacteristics)
        selectedunitCharacteristics.push(Object.assign({}, toadd, {
          displayAttributes: DateSwap(toadd.editableAttributes)
        }))
        let errorobj = DateValidations(toadd.editableAttributes)
        if(errorflag || errorobj.errorStatus ){
          console.log(errorobj.dateValidations)
          dispatch({
            type:ERROR,
            payload:errorobj.dateValidations
          })

        }else{
        dispatch({
          type: ADD_ROW,
          payload: {
            selectedunitCharacteristics: selectedunitCharacteristics,
            unSelectedUnitCharacteristics: unSelectedUnitCharacteristics,
            showModal: false
          }
        })
}
      }
    })
  }
}

export function ToggleAddEditModal(action) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      if (action.type == 'add') {
        dispatch({
          type: 'redux-form/DESTROY',
          meta: {
            form: 'UnitCharacteristicsForm',
          },
          payload: ''

        })

        let data = [{}]
        dispatch({
          type: EDITABLE_ATTRIBUTE,
          payload: data

        })
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            showModal: true,
            disable: false,
            isEditable: false
          }
        })
      }
      if (action.type == 'edit') {
        console.log('edit')
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            showModal: true,
            disable: false,
            isEditable: true
          }
        })
      }
      if (action.type == 'close') {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            showModal: false,
            disable: false
          }
        })
      }
    })
  }
}

export function pushEditableAtribute() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      console.log(!!getState().form.UnitCharacteristicsForm.values)
      let data = Arraycreator(getState().unitCharacteristics.editableAttributes)

      let formdata = !!getState().form.UnitCharacteristicsForm.values ? getState().form.UnitCharacteristicsForm.values : {
        ucvalue: [null],
        effectiveStartDate: [null],
        effectiveEndDate: [null]
      }
      console.log(!!getState().form.UnitCharacteristicsForm.values)
      let ucvalue = !!formdata.ucvalue ? Arraycreator(formdata.ucvalue) : [null]
      console.log(!!getState().form.UnitCharacteristicsForm.values)
      let effectiveStartDate = formdata.effectiveStartDate.length > 0 ? Arraycreator(formdata.effectiveStartDate) : [null]
      console.log(!!getState().form.UnitCharacteristicsForm.values)
      let effectiveEndDate = formdata.effectiveEndDate.length > 0 ? Arraycreator(formdata.effectiveEndDate) : [null]
      data.push({})
      dispatch({
        type: EDITABLE_ATTRIBUTE,
        payload: data

      })

      effectiveEndDate[effectiveEndDate.length - 1] == null ? effectiveStartDate.push(new Date()) : effectiveStartDate.push(effectiveEndDate[effectiveEndDate.length - 1])


      console.log(effectiveEndDate)
      dispatch({
        type: 'redux-form/INITIALIZE',
        meta: {
          form: 'UnitCharacteristicsForm',
          keepDirty: false
        },
        payload: Object.assign({}, formdata, {
          effectiveStartDate: effectiveStartDate,
          effectiveEndDate: effectiveEndDate
        })
      })

    })
  }
}

export function characteristicNameSelected(e) {
  return (dispatch, getState) => {
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
          ucvalue: data.ucvalue,
          effectiveStartDate: data.effectiveStartDate,
          effectiveEndDate: data.effectiveEndDate
        }

      })

    })
  }
}


export function deleteConfirmation(name, i) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      if (i != -1) {
        dispatch({
          type: TO_BE_DELETED,
          payload: {
            name: name,
            index: i
          },
          showDeleteModal: true
        })
      } else {
        dispatch({
          type: TO_BE_DELETED,
          payload: {
            name: name,
            index: i
          },
          showDeleteModal: false
        })
      }

    })
  }
}


export function DeleteUnitCharateristic() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let selectedunitCharacteristics = []
      let i = getState().unitCharacteristics.tobedeleted.index
      let unSelectedUnitCharacteristics = Arraycreator(getState().unitCharacteristics.unSelectedUnitCharacteristics)
      getState().unitCharacteristics.selectedunitCharacteristics.map((value, j) => {
        if (i != j) {
          selectedunitCharacteristics.push(value)
        } else {
          unSelectedUnitCharacteristics.push(Object.assign({}, value, {
            isSavable: false,
            editableAttributes: [{}]
          }))
        }
      })

      dispatch({
        type: DELETE_ROW,
        payload: {
          selectedunitCharacteristics: selectedunitCharacteristics,
          unSelectedUnitCharacteristics: unSelectedUnitCharacteristics,
          showDeleteModal: false
        }
      })

    })
  }

}

export function edit(name, i) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let data = Arraycreator(getState().unitCharacteristics.selectedunitCharacteristics)


      let intializedata = {
        charateristicName: data[i],
        displayNameLabel: data[i].display,
        descriptionLabel: data[i].description,
        UOMLabel: data[i].UOM,
      }
      if (!data[i].isDeletable || !data[i].isEditable) {
        dispatch({
          type: TOGGLE_MODAL,
          payload: {
            showModal: true,
            disable: true,
            isEditable: true
          }
        })
      }
      dispatch({
        type: EDITABLE_ATTRIBUTE,
        payload: data[i].editableAttributes

      })
      intializedata.ucvalue = []
      intializedata.effectiveStartDate = []
      intializedata.effectiveEndDate = []
      data[i].editableAttributes.map((values, i) => {
        intializedata.ucvalue.push(values.ucvalue)
        intializedata.effectiveEndDate.push(values.effectiveEndDate)
        intializedata.effectiveStartDate.push(values.effectiveStartDate)
      })
      console.log(intializedata)
      dispatch({
        type: CURRENT_EDIT,
        payload: {
          name: name,
          index: i
        },
        unSelectedUnitCharacteristics: Arraycreator(getState().unitCharacteristics.allexceptdefaultoptions)
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


export function getDefaultUnitCharacteristics(allUOMvalues) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getUnitCharacteristics().then(function(response) {
        let selectedunitCharacteristics = []
        let options = []
        let defaultUnitCharacteristics = []
        dispatch({
          type: GET_UNIT_CHARACTERSTICS,
          payload: response.data
        })


        response.data.map((uc) => {
          if (uc.name.toLowerCase() == 'capacity' ||
            uc.name.toLowerCase() == 'eco min' ||
            uc.name.toLowerCase() == 'eco max') {
            uc.editableAttributes = [{}]
            uc.isDeletable = false
            uc.isSavable = false
            let i = 0
            for (i in allUOMvalues) {
              if (uc.defaultUnitOfMeasureId === allUOMvalues[i].id) {
                uc.UOM = allUOMvalues[i].name
                break
              }
            }
            selectedunitCharacteristics.push(uc)
            defaultUnitCharacteristics.push(uc)
          } else {
            let i = 0
            for (i in allUOMvalues) {
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
            selectedunitCharacteristics: selectedunitCharacteristics,
            defaultUnitCharacteristics: defaultUnitCharacteristics,
            unSelectedUnitCharacteristics: options,
            allexceptdefaultoptions: Arraycreator(options)
          }
        })

      })
    })
  }
}


export function getDefaultUnitCharacteristicsService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().unitCharacteristics.allUOMvalues.length === 0 ? getAllUOMValues().then(function(response) {
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
  [GET_ALL_UOM_VALUES]: (state, action) => {
    return Object.assign({}, state, {
      allUOMvalues: action.payload
    })
  },
  [GET_UNIT_CHARACTERSTICS]: (state, action) => {
    return Object.assign({}, state, {
      unitCharacteristics: action.payload
    })
  },
  [SELECTED_UNIT_CHARACTERISTICS]: (state, action) => {
    return Object.assign({}, state, {
      selectedunitCharacteristics: action.payload.selectedunitCharacteristics,
      unSelectedUnitCharacteristics: action.payload.unSelectedUnitCharacteristics,
      allexceptdefaultoptions: action.payload.allexceptdefaultoptions,
      defaultUnitCharacteristics: action.payload.defaultUnitCharacteristics
    })
  },
  [TOGGLE_MODAL]: (state, action) => {
    return Object.assign({}, state, {
      showModal: action.payload.showModal,
      disable: action.payload.disable,
      isEditable: action.payload.isEditable,
      error:false,
      errorMessage:[]
    })
  },
  [EDITABLE_ATTRIBUTE]: (state, action) => {
    return Object.assign({}, state, {
      editableAttributes: action.payload
    })
  },
  [ADD_ROW]: (state, action) => {
    return Object.assign({}, state, {
      selectedunitCharacteristics: action.payload.selectedunitCharacteristics,
      unSelectedUnitCharacteristics: action.payload.unSelectedUnitCharacteristics,
      showModal: action.payload.showModal,
      error: false,
      errorMessage: []
    })
  },
  [CURRENT_EDIT]: (state, action) => {
    return Object.assign({}, state, {
      currentediting: action.payload,
      unSelectedUnitCharacteristics: action.unSelectedUnitCharacteristics
    })
  },
  [UPDATE_ROW]: (state, action) => {
    return Object.assign({}, state, {
      selectedunitCharacteristics: action.payload,
      unSelectedUnitCharacteristics: action.unSelectedUnitCharacteristics,
      showModal: action.showModal,
      error: false,
      errorMessage: []
    })
  },
  [TO_BE_DELETED]: (state, action) => {
    return Object.assign({}, state, {
      showDeleteModal: action.showDeleteModal,
      tobedeleted: action.payload
    })
  },
  [DELETE_ROW]: (state, action) => {
    return Object.assign({}, state, {
      showDeleteModal: action.payload.showDeleteModal,
      tobedeleted: {},
      selectedunitCharacteristics: action.payload.selectedunitCharacteristics,
      unSelectedUnitCharacteristics: action.payload.unSelectedUnitCharacteristics
    })
  },
  [BIND_INITIAL_ATTRIBUTES]: (state, action) => {
    return Object.assign({}, state, {
      selectedunitCharacteristics: action.payload.selectedunitCharacteristics,
      unSelectedUnitCharacteristics: action.payload.unSelectedUnitCharacteristics
    })
  },
  [BIND_INITIAL_ATTRIBUTES_NEW_LOCATION]: (state, action) => {
    return Object.assign({}, state, {
      selectedunitCharacteristics: action.payload.selectedunitCharacteristics,
      unSelectedUnitCharacteristics: action.payload.unSelectedUnitCharacteristics
    })
  },
  [ERROR]: (state, action) => {
    return Object.assign({}, state, {
      error: true,
      errorMessage: action.payload
    })
  },
}



const initialState = {
  error: false,
  errorMessage:[],
  unitCharacteristics: [],
  allUOMvalues: [],
  selectedunitCharacteristics: [],
  unSelectedUnitCharacteristics: [],
  defaultUnitCharacteristics: [],
  finalUnitCharacteristics: [],
  deletedUnitCharacteristics: [],
  showModal: false,
  showDeleteModal: false,
  editableUnitCharacter: {},
  showEditModal: false,
  startDate: moment(),
  isEditable: false,
  disable: false,
  tobedeleted: {},
  editableAttributes: null,
  dateRangeValidation: [],
  currentediting: {},
  allexceptdefaultoptions: [],
  isChanged: false
}

export default function unitCharacteristicsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}