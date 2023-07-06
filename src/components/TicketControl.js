import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';




class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      // formVisibleOnPage: false, //Removed now that we're using rootReducer and Redux to handle formVisibleOnPage state
      selectedTicket: null,
      editing: false
    };
  }
  

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => { //Iterate over mainTicketList. 
        const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
          addSuffix: true
        });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }


  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({ //Removed now that we're using rootReducer and Redux to handle formVisibleOnPage state
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
      const { dispatch } = this.props;
      // const action = {
      //   type: 'TOGGLE_FORM'
      // }
      const action = a.toggleForm(); //We import our actions as a for brevity, but it's also fine to use actions as well. It's a common practice in the React community to use a single letter in this case, so you'll likely see this in other React code.
      dispatch(action);
    }
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props; //This is available to TicketControl through the connect() method at the bottom of the file.
    // const action = {
    //   type: 'DELETE_TICKET',
    //   id: id
    // }
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props; //deconstruct
    const { id, names, location, issue } = ticketToEdit; //deconstruct any objects needed for action
    const action = { //once action is defined we can dispatch it
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue
    }
      dispatch(action)
      this.setState({
        editing: false,
        selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = newTicket;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue
    // }
    const action = a.addTicket(newTicket);
    dispatch(action);
    // this.setState({formVisibleOnPage: false}); //Removed now that we're using rootReducer and Redux to handle formVisibleOnPage state
    // const action2 = {
    //   type: "TOGGLE_FORM"
    // }
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
      ticket={this.state.selectedTicket} 
      onClickingDelete={this.handleDeletingTicket}
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) { //changed from this.state.formVisibleOnPage
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} ticketList={this.props.mainTicketList}  />;
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};


const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

// Note: we are now passing mapStateToProps into the connect() function.
TicketControl = connect(mapStateToProps)(TicketControl);

// TicketControl = connect()(TicketControl); //Redefines TicketControl as a new component with additionlal functionality. Return of connect() function is the TicketControl component with dispatch and mapStateToProps functions.
//placement of above line is important. It must be placed before export default TicketControl; line. 
//Connect() is a higher order component which which takes existing component and wraps with additional functionality and returns it to be used elsewhere.

export default TicketControl;


