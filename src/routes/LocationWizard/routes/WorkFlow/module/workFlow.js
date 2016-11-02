import {getWorkFlows} from 'api/locationWizardApi'

export const BIND_WORKFLOW_ITEMS = 'BIND_WORKFLOW_ITEMS'

export function bindWorkflowItems() {	
  return {
    type: BIND_WORKFLOW_ITEMS,
    payload: getWorkFlows()
  };

};

export const ACTION_HANDLERS = { 
  [BIND_WORKFLOW_ITEMS]: (state, action) => {
    return  Object.assign({},state,{workFlowItems:action.payload})
  }
}
const initialState = {
  error: null,
  workFlowItems:[]
};

export default function workFlowReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}