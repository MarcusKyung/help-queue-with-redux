import ticketListReducer from "../../reducers/ticket-list-reducer"; //import the reducer which we've stored in variable called ticketListReducer

//JEST Refresher: 
// Describe blocks group related tests
// Test blocks are the individual tests, this test makes sure our reducer returns correct default value
// Expect statements are assertions of what code should return.

// Reducers are pure functions that won't hold any info about applications current state
// Initial test will check that our reducer returns default state when no action is passed into it (or null)

describe("ticketListReducer", () => {
  
  const currentState = {
    1: {
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1 
    }, 2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2 
    }
  }
  
  test("Should sucessfully delete a ticket", () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2
      }
    });
  });

  let action;
  const ticketData = {
    names: "Ryan and Aimen",
    Location: "4b",
    issue: "Redux action is not working correctly.",
    id: 1,
  };

  test("Should successfully add new ticket data to mainTicketList", () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      id: id,
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id,
      },
    });
  });

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(ticketListReducer({}, {type: null })).toEqual({}); //reducer takes two arguments, current state and action that will be applied. Action is stored in an object.
  });
});

