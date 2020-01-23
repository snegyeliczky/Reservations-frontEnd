import React, { useContext, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import { Link } from "react-router-dom";

const GuestProfile = props => {
  const { guestList, roomList } = useContext(HotelContext);
  const [guest, setGuest] = useState({});

  const getGuestById = () => {
    for (let g of guestList) {
      if (parseInt(props.match.params.guestId) === g.id) {
        setGuest(g);
      }
    }
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
  }, []);

  // const generateRoomOption = room => {
  //   if (room.reserved === false) {
  //     return <option value={room.roomNumber}>{room.roomNumber}</option>;
  //   }
  // };

  // const handleChange = event => {
  //   event.preventDefault();
  //   room = event.target.value;
  // };
  return (
    <Table>
      {getGuestById}
      <thead>
        <tr>
          <th>Name</th>
          <th>Check In Date</th>
          <th>Check Out Date</th>
          <th>Status</th>
          <th>Set Room</th>
        </tr>
      </thead>
      <tbody>
        <tr style={guestStyle()}>
          <td>{guest.name}</td>
          <td>{guest.checkIn}</td>
          <td>{guest.checkOut}</td>
          <td>{guest.status}</td>
          {/* <td>
            <select style={dropDownBtn} value={room} onChange={handleChange}>
              {roomList.map(room => generateRoomOption(room))}
            </select>
            <Button
              style={{ margin: "5px" }}
              variant="dark"
              type="submit"
              onClick={setRoom.bind(this, this.state.room, this.state.guest)}
            >
              Save
            </Button>
          </td> */}
        </tr>
      </tbody>
    </Table>
  );

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
};

export default GuestProfile;
