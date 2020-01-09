import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export class GuestProfile extends Component {
  state = {
    guest: {},
    room: {}
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ room: event.target.value });
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
      return <option value={room}>{room.roomNumber}</option>;
    }
  }

  render() {
    console.log(this.props);
    console.log(this.props.guestList);
    console.log(this.props.match.params.guestId);
    return (
      <div>
        {this.getGuestById()}
        {this.state.guest.name}
        {this.state.guest.email}
        {this.state.guest.checkIn}
        {this.state.guest.checkOut}
        {this.state.guest.status}
        {this.state.guest.id}
        <select value={this.state.room} onChange={this.handleChange}>
          {this.props.roomList.map(room => this.generateRoomOption(room))}
        </select>
        <Button
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
      </div>
    );
  }
}

//PropTypes
GuestProfile.protoTypes = {
  guestProfile: PropTypes.object.isRequired
};

export default GuestProfile;
