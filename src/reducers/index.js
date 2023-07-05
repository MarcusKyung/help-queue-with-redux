import formVisibleReducer from './form-visible-reducer'; //must import reducers you want to combo
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux'; //This is core Redux functionality. When we make a reducer that combines other reducers we need to import this.

const rootReducer = combineReducers({ //Takes an object as an argument. Object's key represents state slice and value represents the reducer tha handles that action.
  formVisibleOnPage: formVisibleReducer,
  mainTicketList: ticketListReducer
});

export default rootReducer;

//This index.js reducer is designed to combine all other reducers (it is the ROOT REDUCER). This is needed to keep our code modular and because store can only take a single reducer as an argument
//It is called index.js because it retrieves logic from all other files in its directory and imports into one big module known as module index.