import {
  getWorkFlows
} from 'api/locationWizardApi'

export const BIND_WORKFLOW_ITEMS = 'BIND_WORKFLOW_ITEMS'
export const SELECT_ALL = 'SELECT_ALL'
export const REMOVE_ALL = 'REMOVE_ALL'
export const WORKFLOW_CHANGE = 'WORKFLOW_CHANGE'

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