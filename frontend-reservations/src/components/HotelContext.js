import React, {useState, createContext} from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
    const [guestList, setGuestList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState(false);

    async function fetchGuestList() {
        setFilter(false);
        const result = await axios("/reservation/get-all");
        setGuestList(result.data);
    }

    const fetchRoomList = async () => {
        const result = await axios("/rooms/list/get-all");
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
        const url = `/reservation/checkin?date=${dateUrl}`;
        axios.get(url).then(response => setGuestList(response.data));
    };

    const updateGuestStatus = async (guestId, updatedGuestStatus) => {
        const url = `/reservation/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
        axios.put(url).then(response => {
            filter ? fetchForDate(date) : fetchGuestList();
        });
    };

    const updateGuestRoom = async (roomId, guestId) => {
        const url = `/reservation/setroom?roomId=${roomId}&guestId=${guestId}`;
        axios.put(url).then(response => {
            fetchGuestList();
            fetchRoomList();
        });
    };

    const addNewGuest = async (data, checkInDate, checkOutDate) => {
        const url = "/add/add-reservation";
        axios
            .post(url, {

                checkIn: checkInDate,
                checkOut: checkOutDate,
                status: "CHECKIN",
                isCityTaxIncluded:true,
                guest: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    address: {
                        country: data.country,
                        zipCode: data.zipcode,
                        city: data.city,
                        street: data.street
                    }
                },
            })
            .then(response => {
                fetchGuestList();
            });
    };


    const addNewUser = async (data, role) => {
        const url = "/admin/newuser";
        await axios
            .post(url, {
                username: data.username,
                password: data.password,
                roles: [role]
            })
            .then(response => {
                console.log("ok")
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
                fetchForDate,
                addNewGuest,
                updateGuestRoom,
                addNewUser,
                filter,
                setFilter
            }}
        >
            {props.children}
        </HotelContext.Provider>
    );
};
