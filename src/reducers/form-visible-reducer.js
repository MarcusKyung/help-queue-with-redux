const reducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM': //This reducer will toggle the form visibility state from true to false and vice versa.
      return !state;
    default:
      return state;
  }
};

export default reducer;