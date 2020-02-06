import React, { useState, useContext } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import { Link } from "react-router-dom";

const Guest = ({ guest }) => {
  const { id, name, roomNumber, status, checkIn, checkOut } = guest;
  const [updatedStatus, setUpdatedStatus] = useState("");

  const { updateGuestStatus } = useContext(HotelContext);


  const dropDownBtn =  () => {

    let statusColor = " ";

    switch (status) {
      case "IN":
        statusColor = "lightgreen";
        break;
      case "CHECKOUT":
        statusColor = "lightcoral";
        break;
      default:
        statusColor = "lightblue";
    }

    return {
      lineHeight: "1.5",
      padding: ".375rem .75rem",
      textAlign: "center",
      verticalAlign: "middle",
      userSelect: "none",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "400",
      color: "rgba(0, 0, 0, 0.68)",
      background: statusColor,
      borderColor: statusColor,
      border: "1px solid transparent",
      borderRadius: ".25rem",
      margin: "5px"
    };
  };

  const handleChange = event => {
    event.preventDefault();
    setUpdatedStatus(event.target.value);
    updateGuestStatus(id, event.target.value);
  };

  return (
    <tr className="tr-color" style={{backgroundColor: "#f5f5f5"}}>
      <td>{roomNumber}</td>
      <td>{checkIn}</td>
      <td>{name}</td>
      <td>{checkOut}</td>
      <td>
        <ButtonToolbar>
          <select
            style={dropDownBtn()}
            value={updatedStatus}
            onChange={handleChange}
          >
            <option>{status}</option>
            <option value="CHECKIN" style={{backgroundColor: "lightblue"}}>CHECKIN</option>
            <option value="IN" style={{backgroundColor: "lightgreen"}}>IN</option>
            <option value="CHECKOUT" style={{backgroundColor: "lightcoral"}}>CHECKOUT</option>
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
