import React, { useContext, useEffect } from "react";
import Guest from "./Guest";
import { Table } from "react-bootstrap";
import { HotelContext } from "./HotelContext";

const GuestList = () => {
  const { guestList, fetchGuestList } = useContext(HotelContext);

  useEffect(() => {
    fetchGuestList();
  }, []);

  return (
    <div>
      {" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Check In Date</th>
            <th>Name</th>
            <th>Check Out Date</th>
            <th>Edit Status</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {guestList.map(guest => (
            <Guest guest={guest} key={guest.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GuestList;
