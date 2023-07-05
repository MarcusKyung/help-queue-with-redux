import * as c from './../actions/ActionTypes';
//Constant is stored in c variable 


const reducer = (state = false, action) => {
  switch (action.type) {
    // case 'TOGGLE_FORM': //This reducer will toggle the form visibility state from true to false and vice versa.
    case c.TOGGLE_FORM: //The above previous line used a string for the case, now we're using action constant.
      return !state;
    default:
      return state;
  }
};

export default reducer;