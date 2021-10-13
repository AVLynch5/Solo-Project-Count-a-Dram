const whiskeyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WHISKIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default whiskeyReducer;
  