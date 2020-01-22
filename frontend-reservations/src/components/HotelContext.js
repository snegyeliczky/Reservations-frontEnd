import React, { useState, createContext } from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
  const [guestList, setGuestList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  async function fetchGuestList() {
    const result = await axios("/guest/all");
    setGuestList(result.data);
  }

  const fetchRoomList = async () => {
    const result = await axios("/rooms/list");
    setRoomList(result.data);
  };

  const updateGuestStatus = async (guestId, updatedGuestStatus) => {
    const url = `/guest/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
    axios.put(url).then(response => {
      fetchGuestList();
    });
  };

  return (
    <HotelContext.Provider
      value={{
        guestList,
        fetchGuestList,
        roomList,
        fetchRoomList,
        updateGuestStatus
      }}
    >
      {props.children}
    </HotelContext.Provider>
  );
};
