import React, {useContext, useEffect, useState} from "react";
import Room from "./Room";
import {HotelContext} from "./HotelContext";

const RoomList = () => {
    const {roomList, fetchRoomList, fetchAvailableRoomsForToday,getReservationsForActualDate} = useContext(HotelContext);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [reservations, setReservations] = useState([]);

    const getGuestId = (reservations, roomsId) => {
        for (let reservation of reservations){
            if (reservation.roomId === roomsId ){
                return reservation.guest.id
            }
        }
        return null;
    };

    const getReservationIdForRoom = (reservations, roomId)=>{
        for (let reservation of reservations){
            if (reservation.roomId === roomId ){
                return reservation.id;
            }
        }
        return null;
    };

    useEffect(() => {
        fetchRoomList();
        fetchAvailableRoomsForToday().then(result => setAvailableRooms(result));
        getReservationsForActualDate(new Date()).then( result => setReservations(result));
    }, []);

    return roomList.map(room => <Room room={room} availableRooms = {availableRooms} reservationId = {getReservationIdForRoom(reservations,room.id)} key={room.id}/>);
};

export default RoomList;
