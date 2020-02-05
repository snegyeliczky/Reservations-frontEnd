import React, {useState, createContext} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import Cookies from 'js-cookie'

export const HotelContext = createContext();

export const HotelProvider = props => {
    const [guestList, setGuestList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState(false);
    const [toLogin, setToLogin] = useState(false);

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
        axios.get(url).then(response => setGuestList(response.data));
    };

    const updateGuestStatus = async (guestId, updatedGuestStatus) => {
        const url = `/guest/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
        axios.put(url).then(response => {
            filter ? fetchForDate(date) : fetchGuestList();
        });
    };

    const updateGuestRoom = async (roomId, guestId) => {
        const url = `/guest/setroom?roomId=${roomId}&guestId=${guestId}`;
        axios.put(url).then(response => {
            fetchGuestList();
            fetchRoomList();
        });
    };

    const addNewGuest = async (data, checkInDate, checkOutDate) => {
        const url = "/add/guest";
        axios
            .post(url, {
                name: data.name,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                address: {
                    email: data.email,
                    country: data.country,
                    zipCode: data.zipcode,
                    city: data.city,
                    street: data.street
                }
            })
            .then(response => {
                fetchGuestList();
            });
    };

    const logout = () => {
        console.log(Cookies.get('token'));
        const url = 'http://localhost:8080/auth/logout';
        axios.post(url)
            .then(response => {
                console.log(response);
            })
            .catch(reason => console.log(reason))
        ;
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
                fetchForDate,
                addNewGuest,
                updateGuestRoom,
                logout
            }}
        >
            {props.children}
        </HotelContext.Provider>
    );
};
