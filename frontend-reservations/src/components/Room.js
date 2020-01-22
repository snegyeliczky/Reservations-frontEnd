import React from "react";
import { Link } from "react-router-dom";

export const Room = ({ room }) => {
  const { roomNumber, reserved, guest } = room;

  const roomStyle = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    backgroundColor: reserved ? "orangered" : "lightgreen",
    display: "inline-flex",
    padding: "1.5%",
    margin: "1.5%",
    borderRadius: "15px"
  };

  const linkStyle = {
    color: "black"
  };

  return (
    <div
      style={roomStyle}
      //   onClick={this.props.getGuestProfile.bind(
      //     this,
      //     guest != null ? guest.id : null
      //   )}
    >
      {" "}
      <Link style={linkStyle} to={"/guest/" + guest.id}>
        <p>
          Room
          <br />
          {roomNumber}
        </p>
      </Link>
    </div>
  );
};

export default Room;
