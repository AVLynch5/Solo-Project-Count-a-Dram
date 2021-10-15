const dramReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DRAMS':
            return action.payload;
        case 'EDIT_WHISKEY_NAME':
            return [...state, state[action.payload.index].whiskey_name = action.payload.name];
        case 'EDIT_WHISKEY_PROOF':
            return [...state, state[action.payload.index].whiskey_proof = action.payload.proof];
        case 'EDIT_DRAM_QUANTITY':
            return [...state, state[action.payload.index].dram_quantity = action.payload.quantity];
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.dram
  export default dramReducer;
  