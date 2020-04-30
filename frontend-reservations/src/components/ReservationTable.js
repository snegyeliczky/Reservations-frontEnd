import React, {useContext, useEffect} from "react";
import ReservationRow from "./ReservationRow";
import {Table} from "react-bootstrap";
import {HotelContext} from "./HotelContext";
import SearchField from "./search/SearchField";

const ReservationTable = () => {
    const {reservationList, fetchRoomList, sortByStatus, sortForDay, filter, date, sortForAll} = useContext(HotelContext);

    useEffect(() => {
        fetchRoomList();
    }, []);

    function sortByName() {
        switch (filter) {
            case "home":
                console.log("home");
                sortForDay("firstName", new Date());
                break;
            case "filter":
                console.log("filter");
                sortForDay("firstName",date);
                break;
            case "reservations":
                console.log("all");
                sortForAll("firstName");
            default:
                sortForDay("firstName",date);
        }
    }

    const divStyle = {
        border: "1px solid black",
        borderBottom: "1px solid #bfbdbd"
    };

    const sortButton = {
        cursor: "pointer",
        backgroundColor: "rgba(245, 245, 245,0.1)"
    };


    return (
        <div id="reservation-table">
            <SearchField/>
            <br/>
            <Table style={divStyle} className="table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Room</th>
                    <th>Check In Date</th>
                    <th id={"nameHead"} onClick={sortByName} style={sortButton}>Name</th>
                    <th>Check Out Date</th>
                    <th onClick={sortByStatus} style={sortButton}>Status</th>
                    <th>Edit room</th>
                    <th>Profile</th>
                </tr>
                </thead>
                <tbody>
                {reservationList.map(reservation => (
                    <ReservationRow reservation={reservation} key={reservation.id}/>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ReservationTable;
