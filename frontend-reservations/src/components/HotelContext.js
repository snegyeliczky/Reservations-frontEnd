import React, { useState, createContext } from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
  const [guestList, setGuestList] = useState([]);
  const [roomList, setRoomList] = useState([
    { roomNumber: 1, reserved: true, guest: { id: 1, name: "Béla" } }
  ]);

  async function fetchGuestList() {
    const result = await axios("http://localhost:8080/");
    setGuestList(result.data);
  }

  async function fetchRoomList() {
    const result = await axios("http://localhost:8080/rooms/list");
    setRoomList(result.data);
  }

  return (
    <HotelContext.Provider
      value={[guestList, fetchGuestList, roomList, fetchRoomList]}
    >
      {props.children}
    </HotelContext.Provider>
  );
};
