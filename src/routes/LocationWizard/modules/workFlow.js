import {
  getWorkFlows
} from 'api/locationWizardApi'

export const BIND_WORKFLOW_ITEMS = 'BIND_WORKFLOW_ITEMS'
export const SELECT_ALL = 'SELECT_ALL'
export const REMOVE_ALL = 'REMOVE_ALL'
export const WORKFLOW_CHANGE = 'WORKFLOW_CHANGE'
export const BIND_LOCATION_WORKFOW = 'BIND_LOCATION_WORKFOW'

export function bindWorkflowItems() {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: BIND_WORKFLOW_ITEMS,
        payload: getWorkFlows()
      })
    })
  }
};

export function bindWorkLocationData(assignedWorkflows) {
  let Work = {}
  Work.allWorkflows = getWorkFlows();
  Work.defaultWorkFlow = []
  if (assignedWorkflows != null) {
    assignedWorkflows.map((assigned) => {
      let index = Work.allWorkflows.findIndex((workflow) => workflow.WorkflowGroupId === assigned.WorkflowGroupId);
      if(index>0)
      {
        let workflowinfo = Work.allWorkflows[index];
        workflowinfo.WorkflowGroupLocationId = assigned.WorkflowGroupLocationId;
        Work.allWorkflows[index]=workflowinfo
        Work.defaultWorkFlow.push(workflowinfo);
      }
      else
      {
        Work.allWorkflows.push(assigned);
        Work.defaultWorkFlow.push(assigned);
      }
    })
  }
  return {
    type: BIND_LOCATION_WORKFOW,
    payload: Work
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
      defaultWorkFlow: defaultvalues
    })
  },
  [BIND_LOCATION_WORKFOW]:(state,action)=>{
    return Object.assign({}, state, {
      workFlowItems: action.payload.allWorkflows,
      defaultWorkFlow : action.payload.defaultWorkFlow
    })
  }
}
const initialState = {
  error: null,
  workFlowItems: getWorkFlows(),
  defaultWorkFlow: []
};

export default function workFlowReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}