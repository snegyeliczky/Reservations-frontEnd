import React, { Component } from "react";
import PropTypes from "prop-types";
import Room from "./Room";

export class RoomList extends Component {
  render() {
    return this.props.roomList.map(room => (
      <Room key={room.roomNumber} room={room} />
    ));
  }
}

//PropTypes
RoomList.protoTypes = {
  RoomList: PropTypes.array.isRequired
};

export default RoomList;
