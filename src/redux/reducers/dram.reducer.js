const dramReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DRAMS':
            return action.payload;
        case 'EDIT_WHISKEY_NAME':
            //.map returns a new array. Here, if user mutates an object property value, an array containing the modified object is returned.
            return state.map((entry, i) => i === action.payload.index ? {...entry, whiskey_name: action.payload.NAME} : entry)
        case 'EDIT_WHISKEY_PROOF':
            return state.map((entry, i) => i === action.payload.index ? {...entry, whiskey_proof: action.payload.PROOF} : entry)
        case 'EDIT_DRAM_QUANTITY':
            return state.map((entry, i) => i === action.payload.index ? {...entry, dram_quantity: action.payload.QUANTITY} : entry)
        case 'EDIT_DRAM_CALORIES':
            return state.map((entry, i) => i === action.payload.index ? {...entry, dram_calories: action.payload.calories} : entry)
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.dram
  export default dramReducer;
  