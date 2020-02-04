import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HotelContext } from "./HotelContext";

const Nav = () => {
  const { fetchGuestList } = useContext(HotelContext);

  const onClickHandlerForHome = () => {
    fetchGuestList();
  };

  return (
    <header style={headerStyle}>
      <h1>Reservations</h1>
      <Link style={linkStyle} to="/home" onClick={onClickHandlerForHome}>
        Home
      </Link>{" "}
      |
      <Link style={linkStyle} to="/rooms">
        {" "}
        Rooms
      </Link>{" "}
      |
      <Link style={linkStyle} to="/newguest">
        {" "}
        New Guest
      </Link>
    </header>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default Nav;
