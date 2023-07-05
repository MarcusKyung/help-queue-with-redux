import formVisibleReducer from '../../reducers/form-visible-reducer';
import * as c from './../../actions/ActionTypes';

describe("formVisibleReducer", () => {

  test('Should toggle form visibility state to true', () => {
    expect(formVisibleReducer(false, { type: c.TOGGLE_FORM })).toEqual(true);
  })


  test('Should return default state if no action type is recognized', () => { //Testing if the reducer returns the default state when no action is passed in (null), does it return false
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });
});