import React, { useState, useContext } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HotelContext } from "./HotelContext";

const Guest = ({ guest }) => {
  const { id, name, room, status, checkIn, checkOut } = guest;
  const [updatedStatus, setUpdatedStatus] = useState("");

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
        statusColor = "white";
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
    fonstSize: "1rem",
    cursor: "pointer",
    fontWeight: "400",
    color: "#fff",
    background: "#17a2b8",
    bordelColor: "#17a2b8",
    border: "1px solid transparent",
    borderRadius: ".25rem",
    margin: "5px"
  };

  const handleChange = event => {
    event.preventDefault();
    setUpdatedStatus({ updatedStatus: event.target.updatedStatus });
  };

  // const changeStatus = (id, updatedStatus) => {
  //   setIsUpdated({ isUpdated: true });
  // };

  return (
    <tr style={guestStyle()}>
      <td>{room}</td>
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
          <Button
            style={{ margin: "5px" }}
            variant="dark"
            type="submit"
            // onClick={changeStatus(id, updatedStatus)}
          >
            Save
          </Button>
        </ButtonToolbar>
      </td>
      <td>
        <Link to={"/guest/" + id} role="button">
          <Button variant="dark">Edit</Button>
        </Link>
      </td>
    </tr>
  );
};

export default Guest;
