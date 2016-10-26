export const SHOW_RESULTS = 'SHOW_RESULTS';

export const showResults = function(event){
     console.log("locationWizard:", event);  
  return {
    type: SHOW_RESULTS,
    payload: event
  };
};
const ACTION_HANDLERS = {
  [SHOW_RESULTS]: (state, action) => {
     console.log("locationWizard AH:",action.payload);  
    return {
      page:state.page +2,
      error:null,      
      values : action.payload
    };
  },
}
const initialState = {  
  error: null,
  page:1
};

export default function locationWizardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log("Reducer",state);

  return handler ? handler(state, action) : state;
}