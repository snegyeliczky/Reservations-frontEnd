import React, {useContext, useEffect, useState} from "react";
import Room from "./Room";
import {HotelContext} from "./HotelContext";

const RoomList = () => {
    const {
        roomList,
        fetchRoomList,
        fetchAvailableRoomsForToday,
        getActiveReservations
    } = useContext(HotelContext);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [reservations, setReservations] = useState([]);

    const getReservationIdForRoom = (reservations, roomId) => {
        for (let reservation of reservations) {
            if (reservation.roomId === roomId) {
                return reservation.id;
            }
        }
        return null;
    };

    useEffect(() => {
        fetchRoomList();
        getActiveReservations(new Date()).then(result => setReservations(result));
        fetchAvailableRoomsForToday().then(result => setAvailableRooms(result));
    }, []);

    return roomList.map(room => (
        <Room
            room={room}
            availableRooms={availableRooms}
            reservationId={getReservationIdForRoom(reservations, room.id)}
            key={room.id}
        />
    ));
};

export default RoomList;
