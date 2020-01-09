import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Row } from "react-bootstrap";

export class Guest extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  guestStyle = () => {
    let statusColor = ""

    switch(this.props.guest.status) {
      case 'IN':
        statusColor = 'lightgreen';
        break
      case 'CHECKOUT':
        statusColor = 'lightcoral';
        break
      default:
        statusColor = 'white';
    }

    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      background: statusColor
    }
  }

  render() {
    const { id, name, email, room, status} = this.props.guest;

    const rowStlye = {
      display: "inline-flex"
    };    

    return (
      <div style={this.guestStyle()}>
        <div>
          <div style={rowStlye}>
            <Row>
              {name + " " + email + " " + room}
              <select value={this.state.value} onChange={this.handleChange}>
                <option >{status}</option>
                <option value="CHECKIN">CHECKIN</option>
                <option value="IN">IN</option>
                <option value="CHECKOUT">CHECKOUT</option>
              </select>
              <Button
                variant="dark"
                type="submit"
                onClick={this.props.changeStatus.bind(
                  this,
                  id,
                  this.state.value
                )}
              >
                Save
              </Button>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

//PropTypes
Guest.protoTypes = {
  guest: PropTypes.object.isRequired
};

export default Guest;
