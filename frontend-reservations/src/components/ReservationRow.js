import React, { useState, useContext, useEffect } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import { Link } from "react-router-dom";

const ReservationRow = ({ reservation }) => {
  const { id, roomId, status, checkIn, checkOut, guest } = reservation;
  const {
    updateGuestStatus,
    roomList,
    fetchAvailableRoomsByDate,
    updateGuestRoom,
    handleStatusChange
  } = useContext(HotelContext);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    fetchAvailableRoomsByDate(
      new Date(checkIn),
      new Date(checkOut)
    ).then(result => setAvailableRooms(result));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    // setSelectedRoom(event.target.value);
    if (event.target.value === "-") {
      updateGuestRoom("-", id);
    } else {
      updateGuestRoom(event.target.value, id);
    }
    fetchAvailableRoomsByDate(new Date(checkIn), new Date(checkOut));
    handleStatusChange();
  };

  const roomDownBtn = {
    lineHeight: "1.5",
    padding: ".375rem .75rem",
    textAlign: "center",
    verticalAlign: "middle",
    userSelect: "none",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.68)",
    background: "white",
    border: "1px solid transparent grey",
    borderRadius: ".25rem",
    margin: "5px"
  };

  const dropDownBtn = () => {
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
      border: "1px solid grey",
      borderRadius: ".25rem",
      margin: "5px"
    };
  };

  const handleChange = event => {
    event.preventDefault();
    setUpdatedStatus(event.target.value);
    updateGuestStatus(id, event.target.value);
  };

  const getRoomNumberByRoomId = roomId => {
    for (let room of roomList) {
      if (room.id === roomId) {
        return room.number;
      }
    }
  };

  const filterAvailableRooms = room => {
    return (
      <option value={room.id} key={room.id}>
        {room.number}
      </option>
    );
  };

  return (
    <tr
      id={`reservation-row-${reservation.id}`}
      className="tr-color"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <td>{roomId ? getRoomNumberByRoomId(roomId) : "-"}</td>
      <td>{checkIn}</td>
      <td>{`${guest.firstName} ${guest.lastName}`}</td>
      <td>{checkOut}</td>
      <td>
        <ButtonToolbar>
          <select style={dropDownBtn()} value={status} onChange={handleChange}>
            <option value="CHECKIN" style={{ backgroundColor: "lightblue" }}>
              CHECKIN
            </option>
            <option value="IN" style={{ backgroundColor: "lightgreen" }}>
              IN
            </option>
            <option value="CHECKOUT" style={{ backgroundColor: "lightcoral" }}>
              CHECKOUT
            </option>
          </select>
        </ButtonToolbar>
      </td>
      <td>
        <ButtonToolbar>
          <select
            //style={dropDownBtn}
            style={roomDownBtn}
            onChange={handleSubmit}
          >
            <option value={"-"} key={0}>
              {"-"}
            </option>

            {availableRooms.map(room => filterAvailableRooms(room))}
          </select>
        </ButtonToolbar>
      </td>
      <td>
        <Link to={"/reservation/" + reservation.id}>
          <Button variant="dark">Edit</Button>
        </Link>
      </td>
    </tr>
  );
};

export default ReservationRow;
