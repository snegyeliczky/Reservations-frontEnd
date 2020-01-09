import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Room extends Component {
  render() {
    const { roomNumber, reserved, guest } = this.props.room;

    const roomStyle = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      backgroundColor: reserved ? "orangered" : "lightgreen",
      display: "inline-flex",
      padding: "1%",
      margin: "1%",
      borderRadius: "15px"
    };

    const linkStyle = {
      color: "black",
      textDecoration: "none"
    };

    return (
      <div style={roomStyle}>
        <p>
          {"Room"}
          <br />
          {roomNumber}
        </p>
      </div>
    );
  }
}

//PropTypes
Room.protoTypes = {
  room: PropTypes.object.isRequired
};

export default Room;
