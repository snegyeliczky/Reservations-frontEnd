import React, { useState, useContext, useEffect } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import GuestProfile from "./GuestList";
import { HotelContext } from "./HotelContext";
import { Link } from "react-router-dom";

const Guest = ({ guest }) => {
  const { id, name, roomNumber, status, checkIn, checkOut } = guest;
  const [updatedStatus, setUpdatedStatus] = useState("");

  const { updateGuestStatus } = useContext(HotelContext);

  const guestStyle = () => {
    let statusColor = "";

    switch (status) {
      case "IN":
        statusColor = "lightgreen";
        break;
      case "CHECKOUT":
        statusColor = "lightcoral";
        break;
      default:
        statusColor = "beige";
    }

    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      background: statusColor
    };
  };

  const dropDownBtn = {
    lineHeight: "1.5",
    padding: ".375rem .75rem",
    textAlign: "center",
    verticalAlign: "middle",
    userSelect: "none",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "400",
    color: "#fff",
    background: "#17a2b8",
    borderColor: "#17a2b8",
    border: "1px solid transparent",
    borderRadius: ".25rem",
    margin: "5px"
  };

  const handleChange = event => {
    event.preventDefault();
    setUpdatedStatus(event.target.value);
    updateGuestStatus(id, event.target.value);
  };
  return (
    <tr style={guestStyle()}>
      <td>{roomNumber}</td>
      <td>{checkIn}</td>
      <td>{name}</td>
      <td>{checkOut}</td>
      <td>
        <ButtonToolbar>
          <select
            style={dropDownBtn}
            value={updatedStatus}
            onChange={handleChange}
          >
            <option>{status}</option>
            <option value="CHECKIN">CHECKIN</option>
            <option value="IN">IN</option>
            <option value="CHECKOUT">CHECKOUT</option>
          </select>
        </ButtonToolbar>
      </td>
      <td>
        <Link to={"/guest/" + guest.id}>
          <Button variant="dark">Edit</Button>
        </Link>
      </td>
    </tr>
  );
};

export default Guest;
