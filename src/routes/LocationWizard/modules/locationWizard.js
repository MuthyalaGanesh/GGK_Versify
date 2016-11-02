export const SAVE_COMPLETE_LOCATIONWIZARD = 'SAVE_COMPLETE_LOCATIONWIZARD';

export function saveCompleteLocationWizard(event) {
  console.log("locationWizard:", event);
  return {
    type: SAVE_COMPLETE_LOCATIONWIZARD,
    payload: event
  };
};

export const ACTION_HANDLERS = {
  [SAVE_COMPLETE_LOCATIONWIZARD]: (state, action) => {
    console.log("locationWizard AH:", action.payload);
    return Object.assign({}, state)
  }
}
const initialState = {
  error: null,
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];


  return handler ? handler(state, action) : state;
}