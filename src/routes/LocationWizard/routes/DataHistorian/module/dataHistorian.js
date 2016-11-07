
export const ADD_MODAL = 'ADD_MODAL'

export function AddDataHistorianModalToggle(){	
  	alert('success');
return{	
	type:ADD_MODAL
	}
}

export const ACTION_HANDLERS = { 

  [ADD_MODAL]:(state,action)=>{
  	return Object.assign({},state,{showAddModal:!state.showAddModal})
  }
}

const initialState = {
  error: null,
  dataHistorian:null,
  showAddModal:false
};

export default function dataHistorianReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]; 
  return handler ? handler(state, action) : state;
}

