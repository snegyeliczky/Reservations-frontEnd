import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

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
    const { id, name, room, email, status, checkIn, checkOut} = this.props.guest; 
    const btnStyle = {
      margin: '5px'
    } 

    return (
      <tr style={this.guestStyle()}>
        <td>{room}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{checkIn}</td>
        <td>{checkOut}</td>
        <td>
          <ButtonToolbar>
            <DropdownButton style={btnStyle} variant="info" id="status-changer" title={status} value={this.state.value} onChange={this.handleChange}>
              <Dropdown.Item value="CHECKIN">CHECKIN</Dropdown.Item>
              <Dropdown.Item value="IN">IN</Dropdown.Item>
              <Dropdown.Item value="CHECKOUT">CHECKOUT</Dropdown.Item>
            </DropdownButton>
            <Button
              style={btnStyle}
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
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

//PropTypes
Guest.protoTypes = {
  guest: PropTypes.object.isRequired
};

export default Guest;
