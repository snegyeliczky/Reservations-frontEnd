import React, { Component } from "react";
import PropTypes from "prop-types";

export class Room extends Component {
  render() {
    const { roomNumber, reserved } = this.props.room;

    const roomStyle = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      backgroundColor: reserved ? "lightred" : "lightgreen",
      display: "inline-flex",
      padding: "1%",
      margin: "1%"
    };

    return (
      <div style={roomStyle}>
        <p>{"Room: " + roomNumber}</p>
      </div>
    );
  }
}

//PropTypes
Room.protoTypes = {
  room: PropTypes.object.isRequired
};

export default Room;
