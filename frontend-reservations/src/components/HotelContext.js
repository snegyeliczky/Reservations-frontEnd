import React, {useState, createContext} from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
    const [reservationList, setReservationList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState(false);

    async function fetchReservationList() {
        setFilter(false);
        const result = await axios("/reservation/get-all");
        setReservationList(result.data);
        console.log(result);
    }

    const fetchRoomList = async () => {
        const result = await axios("/reservation/rooms/get-all");
        setRoomList(result.data);
        console.log(result);
    };

    const fetchForDate = async (inComeDate) => {
        let updatedDate = new Date(inComeDate);
        setFilter(true);
        setDate(updatedDate);

        console.log("fetch for date: " + date);
        let month =
            updatedDate.getMonth() + 1 > 10
                ? updatedDate.getMonth() + 1
                : "0" + (updatedDate.getMonth() + 1);
        let day =
            updatedDate.getDate() > 10
                ? updatedDate.getDate()
                : "0" + updatedDate.getDate();
        let dateUrl = updatedDate.getFullYear() + "-" + month + "-" + day;
        console.log(dateUrl);
        const url = `/reservation/checkin?date=${dateUrl}`;
        axios.get(url).then(response => setReservationList(response.data));
    };

    const updateGuestStatus = async (guestId, updatedGuestStatus) => {
        const url = `/reservation/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
        axios.put(url).then(response => {
            filter ? fetchForDate(date) : fetchReservationList();
        });
    };

    const updateGuestRoom = async (roomId, guestId) => {
        const url = `/reservation/setroom?roomId=${roomId}&guestId=${guestId}`;
        axios.put(url).then(response => {
            fetchReservationList();
            fetchRoomList();
        });
    };

    const addNewReservation = async (data, checkInDate, checkOutDate, paymentMethod) => {
        const url = "/reservation/add-reservation";
        axios
            .post(url, {
                checkIn: checkInDate,
                checkOut: checkOutDate,
                price: data.price,
                paymentMethod: paymentMethod,
                guest: {
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    address: {
                        country: data.country,
                        zipCode: data.zipcode,
                        city: data.city,
                        street: data.street
                    }
                }
            })
            .then(response => {
                fetchReservationList();
            });
    };

    const addNewUser = async (data, role) => {
        const url = "users/admin/newuser";
        await axios
            .post(url, {
                username: data.username,
                password: data.password,
                roles: [role]
            })
            .then(response => {
                console.log("ok");
            });
    };

    return (
        <HotelContext.Provider
            value={{
                reservationList,
                fetchReservationList,
                roomList,
                fetchRoomList,
                updateGuestStatus,
                setDate,
                date,
                fetchForDate,
                addNewReservation,
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
