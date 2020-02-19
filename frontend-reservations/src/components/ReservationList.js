import React, {useContext, useEffect} from "react";
import Reservation from "./Reservation";
import {Table} from "react-bootstrap";
import {HotelContext} from "./HotelContext";
import SearchField from "./search/SearchField";

const ReservationList = () => {
    const {
        reservationList,
        fetchReservationList,
        fetchForDate,
        fetchRoomList
    } = useContext(HotelContext);
    const {filter, setFilter} = useContext(HotelContext);
    const {date} = useContext(HotelContext);

    useEffect(() => {
        fetchForDate(date);
        fetchRoomList();
    }, []);

    const divStyle = {
        border: "1px solid black",
        borderBottom: "1px solid #bfbdbd"
    };

    return (
    <div>
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
                <th>Profile</th>
            </tr>
            </thead>
            <tbody>
            {reservationList.map(reservation => (
                <Reservation reservation={reservation} key={reservation.id}/>
            ))}
            </tbody>
        </Table>
    </div>
)
    ;
};

export default ReservationList;
