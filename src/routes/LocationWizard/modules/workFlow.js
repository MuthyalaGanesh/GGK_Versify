import {
  getWorkFlows,
  getWorkFlowGroups,
  getWorkFlowTypes,
} from 'api/locationWizardApi'

import {
  ConstatntValues
} from "constants/constantValues"

export const BIND_WORKFLOW_ITEMS = 'BIND_WORKFLOW_ITEMS'
export const SELECT_ALL = 'SELECT_ALL'
export const REMOVE_ALL = 'REMOVE_ALL'
export const WORKFLOW_CHANGE = 'WORKFLOW_CHANGE'
export const BIND_LOCATION_WORKFOW = 'BIND_LOCATION_WORKFOW'
export const GET_WORKFLOW_SERVICE = "GET_WORKFLOW_SERVICE"
export const WORK_FLOW_NEW_LOCATION ="WORK_FLOW_NEW_LOCATION"

export function bindWorkLocationData(assignedWorkflows) {

  return {
    type: BIND_LOCATION_WORKFOW,
    payload: assignedWorkflows
  };
}

export function selectAll() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: SELECT_ALL
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "WorkFlowForm"
        },
        payload: ""
      })
    })
  }
};

export function removeAll() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: REMOVE_ALL
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "WorkFlowForm"
        },
        payload: ""
      })
    })
  }
};

export function workFlowChange() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: WORKFLOW_CHANGE,
        payload: getState().form.WorkFlowForm
      })
      dispatch({
        type: 'redux-form/DESTROY',
        meta: {
          form: "WorkFlowForm"
        },
        payload: ""
      })
    })
  }
};

export function getWorkFlowsService() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getState().workFlows.staticServiceWorkflows.length == 0 ?
      getWorkFlows().then(function(workFlowDataResponse) {
        getWorkFlowGroups().then(function(response) {
          getWorkFlowTypes().then(function(workflowTypeResponse) {
            let workflowTypeId
            workflowTypeResponse.data.map((type) => {
              if (type.name === ConstatntValues.DEFAULT_WORKFLOW_TYPE) {
                workflowTypeId = type.id
              }
            })
            let workFlowData = workFlowDataResponse.data.GetWorkflowDataResult.WorkflowGroupsWorkflows;
            let workFlows = response.data;
            var finalArray = _.map(workFlows, function(workflow) {
              return _.extend(workflow, _.omit(_.find(workFlowData, {
                Key: workflow.id
              }), 'Key'));
            });
            let workFlowGroup = []
            finalArray.map((final) => {
              if (final.workflowTypeId == workflowTypeId) {
                let newData = {};
                newData.WorkflowGroupLocationId = 0
                newData.WorkflowGroupId = final.id
                newData.WorkflowGroupName = final.name
                newData.isActive = final.isActive
                newData.workflowTypeId = final.workflowTypeId
                newData.title = final.Value != null && final.Value.length > 0 ? final.Value.join('\n') : null
                workFlowGroup.push(newData)
              }
            });
            dispatch({
              type: GET_WORKFLOW_SERVICE,
              payload: workFlowGroup
            })
          })
        })
      }):null
      dispatch({
        type:WORK_FLOW_NEW_LOCATION
      })
    })
  }
}

export const ACTION_HANDLERS = {
  [BIND_WORKFLOW_ITEMS]: (state, action) => {
    return Object.assign({}, state, {
      workFlowItems: action.payload
    })
  },
  [SELECT_ALL]: (state, action) => {
    return Object.assign({}, state, {
      defaultWorkFlow: state.workFlowItems.map((workFlow) => workFlow)
    })
  },
  [REMOVE_ALL]: (state, action) => {
    return Object.assign({}, state, {
      defaultWorkFlow: []
    })
  },
  [WORKFLOW_CHANGE]: (state, action) => {
    let defaultvalues = action.payload.values.workFlowItem;
    return Object.assign({}, state, {
      defaultWorkFlow: defaultvalues,
      isChanged:true
    })
  },
  [BIND_LOCATION_WORKFOW]: (state, action) => {
    let work = {}
    let assignedWorkflows = action.payload
    work.allWorkflows = state.staticServiceWorkflows;
    work.defaultWorkFlow = []
    if (assignedWorkflows != null) {
      assignedWorkflows.map((assigned) => {
        let index = work.allWorkflows.findIndex((workflow) => workflow.WorkflowGroupId === assigned.WorkflowGroupId);
        if (index > 0) {
          let workflowinfo = work.allWorkflows[index];
          workflowinfo.WorkflowGroupLocationId = assigned.WorkflowGroupLocationId;
          work.allWorkflows[index] = workflowinfo
          work.defaultWorkFlow.push(workflowinfo);
        } else {
          work.allWorkflows.push(assigned);
          work.defaultWorkFlow.push(assigned);
        }
      })
    }
    return Object.assign({}, state, {
      workFlowItems: work.allWorkflows,
      defaultWorkFlow: work.defaultWorkFlow,
      isChanged:false
    })
  },
  [GET_WORKFLOW_SERVICE]: (state, action) => {
    return Object.assign({}, state, {
      workFlowItems: action.payload,
      staticServiceWorkflows: action.payload,
      defaultWorkFlow : []
    })
  },
  [WORK_FLOW_NEW_LOCATION]: (state, action) => {
     return Object.assign({}, state, {
      workFlowItems: state.staticServiceWorkflows,
      defaultWorkFlow: [],
      isChanged:false
    })
  }
}
const initialState = {
  error: null,
  workFlowItems: [],
  defaultWorkFlow: [],
  staticServiceWorkflows: [],
  isChanged:false
};

export default function workFlowReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}