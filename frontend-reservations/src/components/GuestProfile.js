import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export class GuestProfile extends Component {
  state = {
    guest: {},
    room: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.state.room = event.target.value;
    console.log(this.state.room);
  };

  getGuestById() {
    for (let guest of this.props.guestList) {
      if (guest.id === this.props.match.params.guestId) {
        this.state.guest = guest;
      }
    }
  }

  generateRoomOption(room) {
    if (room.reserved === false) {
      return <option value={room.roomNumber}>{room.roomNumber}</option>;
    }
  }

  render() {
    const dropDownBtn = {
      lineHeight: "1.5",
      padding: ".375rem .75rem",
      textAlign: "center",
      verticalAlign: "middle",
      userSelect: "none",
      fonstSize: "1rem",
      cursor: "pointer",
      fontWeight: "400",
      color: "#fff",
      background: "#17a2b8",
      bordelColor: "#17a2b8",
      border: "1px solid transparent",
      borderRadius: ".25rem",
      margin: "5px"
    };
    return (
      <tr>
        {this.getGuestById()}
        <td>{this.state.guest.name}</td>
        <td>{this.state.guest.email}</td>
        <td>{this.state.guest.checkIn}</td>
        <td>{this.state.guest.checkOut}</td>
        <td>{this.state.guest.status}</td>
        <td>
          <select
            style={dropDownBtn}
            value={this.state.room}
            onChange={this.handleChange}
          >
            {this.props.roomList.map(room => this.generateRoomOption(room))}
          </select>
          <Button
            style={{ margin: "5px" }}
            variant="dark"
            type="submit"
            onClick={this.props.setRoom.bind(
              this,
              this.state.room,
              this.state.guest
            )}
          >
            Save
          </Button>
        </td>
      </tr>
    );
  }
}

//PropTypes
GuestProfile.protoTypes = {
  guestProfile: PropTypes.object.isRequired
};

export default GuestProfile;
