import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props){


  //We just add formattedWaitTime as a prop to pass down to Ticket.js. We don't need to pass timeOpen as a prop because we won't be displaying it in Ticket.js. We'll only be showing the formattedWaitTime.
  return (
    <React.Fragment>
      <hr/>
      {Object.values(props.ticketList).map((ticket) =>
        <Ticket 
          whenTicketClicked={props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime} 
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;

