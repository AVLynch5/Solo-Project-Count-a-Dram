const dataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RANGE_DRAMS':
            return action.payload;
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.dram
  export default dataReducer;
  