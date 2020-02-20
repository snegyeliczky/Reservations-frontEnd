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

    const creatDateUrlPart = (date) => {
        let month =
            date.getMonth() + 1 > 10
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1);
        let day =
            date.getDate() > 10
                ? date.getDate()
                : "0" + date.getDate();
        let dateUrl = date.getFullYear() + "-" + month + "-" + day;
        console.log("created date url: "+dateUrl);
        return dateUrl;
    };

    const fetchAvailableRoomsForToday = async () => {
        const dateUrl = creatDateUrlPart(new Date());
        const result = await axios("/reservation/rooms/get-available-room?checkin=" +dateUrl);
        return result.data;

    };

    const fetchAvailableRoomsByDate = async (checkin, checkout) => {
        const checkInDateUrl = creatDateUrlPart(checkin);
        const checkOutDateUrl = creatDateUrlPart(checkout);
        const result = await axios("/reservation/rooms/get-available-room?checkin=" +checkInDateUrl+"&checkout="+checkOutDateUrl);
        return result.data;
    };



    const fetchRoomList = async () => {
        const result = await axios("/reservation/rooms/get-all");
        setRoomList(result.data);
        console.log(result.data);
    };

    const fetchForDate = async inComeDate => {
        let updatedDate = new Date(inComeDate);
        setFilter(true);
        setDate(updatedDate);

        console.log("fetch for date: " + date);
        let dateUrl = creatDateUrlPart(updatedDate);
        console.log(dateUrl);
        const url = `/reservation/checkin?date=${dateUrl}`;
        axios.get(url).then(response => setReservationList(response.data));
    };

    const getReservationsForActualDate = async Date => {
        let dateUrl = creatDateUrlPart(Date);
        const url = `/reservation/checkin?date=${dateUrl}`;
        let result= await axios(url);
        return result.data;
    };

    const updateGuestStatus = async (guestId, updatedGuestStatus) => {
        const url = `/reservation/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
        axios.put(url).then(response => {
            filter ? fetchForDate(date) : fetchReservationList();
        });
    };

    const updateGuestRoom = async (roomId, guestId) => {
        const url = `/reservation/setroom?roomId=${roomId}&reservationId=${guestId}`;
        axios.put(url).then(response => {
            fetchForDate(date);
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
                setFilter,
                fetchAvailableRoomsForToday,
                getReservationsForActualDate,
                fetchAvailableRoomsByDate
            }}
        >
            {props.children}
        </HotelContext.Provider>
    );
};
