import React, { useContext, useEffect } from "react";
import ReservationRow from "./ReservationRow";
import { Table } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import SearchField from "./search/SearchField";

const ReservationTable = () => {
  const { reservationList, fetchRoomList, fetchForDate, date } = useContext(HotelContext);

  useEffect(() => {
    fetchRoomList();
    fetchForDate(date);
  }, []);

  const divStyle = {
    border: "1px solid black",
    borderBottom: "1px solid #bfbdbd"
  };

  return (
    <div id="reservation-table">
      <SearchField />
      <br />
      <Table style={divStyle} className="table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Room</th>
            <th>Check In Date</th>
            <th>Name</th>
            <th>Check Out Date</th>
            <th>Edit Status</th>
            <th>Edit room</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {reservationList.map(reservation => (
            <ReservationRow reservation={reservation} key={reservation.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationTable;
