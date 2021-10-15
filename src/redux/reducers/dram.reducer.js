const dramReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DRAMS':
            return action.payload;
        case 'EDIT_WHISKEY_NAME':
            return state.map((entry, i) => i === action.payload.index ? {...entry, whiskey_name: action.payload.name} : entry)
        case 'EDIT_WHISKEY_PROOF':
            return state.map((entry, i) => i === action.payload.index ? {...entry, whiskey_proof: action.payload.proof} : entry)
        case 'EDIT_DRAM_QUANTITY':
            return state.map((entry, i) => i === action.payload.index ? {...entry, dram_quantity: action.payload.quantity} : entry)
        case 'EDIT_DRAM_CALORIES':
            return state.map((entry, i) => i === action.payload.index ? {...entry, dram_calories: action.payload.calories} : entry)
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.dram
  export default dramReducer;
  