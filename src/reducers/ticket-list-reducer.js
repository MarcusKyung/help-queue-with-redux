import * as c from './../actions/ActionTypes';

//Function has two parameters, first is state that needs to be changed and second is action that needs to be applied
//To pass initial test return the same state as passed into reducer (return state;)

// ALL A REDUCER CARES ABOUT IS TAKING A THING, APPLYING AN ACTION TO A COPY THEN RETURNING ALTERED COPY. 

// Action types are strings. The name of the action should be capitalized with all words being separated by underscores. For example, this is correct syntax for an action: ACTION_ONE. Note that even though action types are strings, they are often saved as constants. We will go over this in a future lesson.


const reducer = (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
  // case 'ADD_TICKET':
  case c.ADD_TICKET:
    return Object.assign({}, state, { 
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });

  // case 'DELETE_TICKET':
  case c.DELETE_TICKET:
    let newState = { ...state }; //makes copy of state
    delete newState[id]; //delete object operator to remove key value pair from newState. Technically this is mutating, but we aren't mutating the original, just a copy.
    return newState; //returns newState with deleted ticket
  default:
    return state;
  }
};

export default reducer;