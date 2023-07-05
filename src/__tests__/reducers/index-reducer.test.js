import rootReducer from '../../reducers/index';
import { createStore } from 'redux'; //we need this to create a "smoke test", a surface level test to see if reducers are connected to root
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from './../../actions/ActionTypes';


let store = createStore(rootReducer); 

describe("rootReducer", () => {

  //Smoke tests, first one is testing that default state of each individual reducer matches default state for each state slice in the root reducer.
  test('Check that initial state of ticketListReducer matches root reducer', () => {
    expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  }); 
  
  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  //Second smoke test. This test is testing that when we pass actions into combined reducers that root reducer reflects changes.
  test('Check that ADD_TICKET action works for ticketListReducer and root reducer', () => {
    const action = {
      type: c.ADD_TICKET,
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, action));
  });
  
  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: c.TOGGLE_FORM
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      mainTicketList: {},
      formVisibleOnPage: false
    });
  });

});