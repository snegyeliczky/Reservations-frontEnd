import React, { useContext, useEffect } from "react";
import Room from "./Room";
import { HotelContext } from "./HotelContext";

const RoomList = () => {
  const [roomList, fetchRoomList] = useContext(HotelContext);

  useEffect(async () => {
    fetchRoomList();
  }, []);

  return roomList.map(room => <Room room={room} key={room.roomNumber} />);
};

export default RoomList;
