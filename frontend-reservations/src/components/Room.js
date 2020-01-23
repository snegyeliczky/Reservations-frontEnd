import React from "react";
import { Link } from "react-router-dom";

export const Room = ({ room }) => {
  const { roomNumber, reserved, guests } = room;

  const roomStyle = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    backgroundColor: guests.length !== 0 ? "orangered" : "lightgreen",
    display: "inline-flex",
    padding: "1.5%",
    margin: "1.5%",
    borderRadius: "15px"
  };

  const linkStyle = {
    color: "black"
  };

  let roomElement;

  if (guests.length !== 0) {
    roomElement = (
      <div style={roomStyle}>
        <Link style={linkStyle} to={"/guest/" + guests[0].id}>
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
