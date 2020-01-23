import React, { useState, createContext } from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
  const [guestList, setGuestList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState(false);

  async function fetchGuestList() {
    setFilter(false);
    const result = await axios("/guest/all");
    setGuestList(result.data);
  }

  const fetchRoomList = async () => {
    const result = await axios("/rooms/list");
    setRoomList(result.data);
  };

  const fetchForDate = async updatedDate => {
    setFilter(true);
    setDate(updatedDate);
    let month =
      updatedDate.getMonth() + 1 > 10
        ? updatedDate.getMonth() + 1
        : "0" + (updatedDate.getMonth() + 1);
    let day =
      updatedDate.getDate() > 10
        ? updatedDate.getDate()
        : "0" + updatedDate.getDate();
    let dateUrl = updatedDate.getFullYear() + "-" + month + "-" + day;
    const url = `/guest/checkin?date=${dateUrl}`;
    console.log(dateUrl);
    axios.get(url).then(response => setGuestList(response.data));
  };

  const updateGuestStatus = async (guestId, updatedGuestStatus) => {
    const url = `/guest/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
    axios.put(url).then(response => {
      filter ? fetchForDate(date) : fetchGuestList();
    });
  };

  return (
    <HotelContext.Provider
      value={{
        guestList,
        fetchGuestList,
        roomList,
        fetchRoomList,
        updateGuestStatus,
        date,
        fetchForDate
      }}
    >
      {props.children}
    </HotelContext.Provider>
  );
};
