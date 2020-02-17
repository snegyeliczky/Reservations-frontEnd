import React, { useContext, useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import { Button } from "react-bootstrap";

const GuestProfile = props => {
  const { guestList, roomList, fetchRoomList, updateGuestRoom } = useContext(
    HotelContext
  );
  const [guest, setGuest] = useState({});
  let [selectedRoom, setSelectedRoom] = useState({});
  let [selectedRoomId, setSelectedRoomId] = useState("");

  const getGuestById = useCallback(() => {
    for (let g of guestList) {
      if (parseInt(props.match.params.guestId) === g.id) {
        setGuest(g);
      }
    }
  }, [guestList, props.match.params.guestId]);

  const list = {
    background:"white",
    margin : "25px"
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

  const guestStyle = () => {
    let statusColor = "";

    switch (guest.status) {
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

  useEffect(() => {
    getGuestById();
    fetchRoomList();
  }, [getGuestById]);

  const filterAvailableRooms = room => {
    if (room.guest === null) {
      return (
        <option value={room.roomNumber} key={room.id}>
          {room.roomNumber}
        </option>
      );
    }
  };

  const getRoomIdByRoomNumber = roomNumber => {
    roomList.map(room => {
      if (room.roomNumber === parseInt(roomNumber)) {
        setSelectedRoomId(room.id);
      }
    });
  };

  const handleChange = event => {
    event.preventDefault();
    setSelectedRoom(event.target.value);
    getRoomIdByRoomNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSelectedRoom(event.target.value);
    updateGuestRoom(selectedRoomId, guest.id);
    getRoomIdByRoomNumber(event.target.value);
  };

  const divStyle = {
    marginTop: "4rem",
    borderRadius: "20px"
  };

  return (
    <div style={divStyle}>
      <Table >
        {getGuestById}
        <thead style={list}>
          <tr>
            <th>Name</th>
            <th>Check In Date</th>
            <th>Check Out Date</th>
            <th>Status</th>
            <th>Room Number</th>
            <th>Set Room</th>
          </tr>
        </thead>
        <tbody>
          <tr style={guestStyle()}>
            <td>{guest.name}</td>
            <td>{guest.checkIn}</td>
            <td>{guest.checkOut}</td>
            <td>{guest.status}</td>
            <td>{guest.roomNumber}</td>
            <td>
              <select
                style={dropDownBtn}
                value={selectedRoomId}
                onChange={handleSubmit}
              >
                {roomList.map(room => filterAvailableRooms(room))}
              </select>

            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default GuestProfile;
