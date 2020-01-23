import React from "react";
import { Link } from "react-router-dom";

export const Room = ({ room }) => {
  const { roomNumber, guest } = room;

  const roomStyle = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    backgroundColor: guest != null ? "orangered" : "lightgreen",
    display: "inline-flex",
    padding: "1.5%",
    margin: "1.5%",
    borderRadius: "15px"
  };

  const linkStyle = {
    color: "black"
  };

  let roomElement;

  if (guest != null) {
    roomElement = (
      <div style={roomStyle}>
        <Link style={linkStyle} to={"/guest/" + guest.id}>
          <p>
            Room
            <br />
            {roomNumber}
          </p>
        </Link>
      </div>
    );
  } else {
    roomElement = (
      <div style={roomStyle}>
        <p>
          Room
          <br />
          {roomNumber}
        </p>
      </div>
    );
  }

  return roomElement;
};

export default Room;
