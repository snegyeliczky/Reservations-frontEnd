import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const HotelContext = createContext();

export const HotelProvider = props => {
    const [reservationList, setReservationList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filter, setFilter] = useState("home");
    const [reservation, setReservation] = useState({});
    const [guest, setGuest] = useState({});
    const [address, setAddress] = useState({});

    const[limitIn,setLimitIn]=useState(true);
    const[limitCheckin,setLimitCheckin]=useState(true);
    const[limitOut,setLimitOut]=useState(true);


    const statusLimit = (reservationList) =>{
        let limitedList = [];
        for (let reservation of reservationList){
            if (limitIn && reservation.status ==="IN"){
                limitedList.push(reservation)
            }else if (limitCheckin && reservation.status==="CHECKIN"){
                limitedList.push(reservation)
            }else if (limitOut && reservation.status==="CHECKOUT"){
                limitedList.push(reservation)
            }
        }
        return limitedList;
    };

    useEffect(()=>{
        handleStatusChange();
    },[limitIn,limitCheckin,limitOut]);


    async function fetchReservationList() {
        const result = await axios("/reservation/get-all");
        let limited = statusLimit(result.data);
        setReservationList(limited);
    }

    const createDateUrlPart = date => {
        return date.toISOString().split('T')[0];
    };

    const fetchAvailableRoomsForToday = async () => {
        const dateUrl = createDateUrlPart(new Date());
        const result = await axios(
            "/reservation/rooms/get-available-room?checkin=" + dateUrl
        );
        return result.data;
    };

    const fetchAvailableRoomsByDate = async (checkin, checkout) => {
        const checkInDateUrl = createDateUrlPart(checkin);
        const checkOutDateUrl = createDateUrlPart(checkout);
        const result = await axios(
            "/reservation/rooms/get-available-room?checkin=" +
            checkInDateUrl +
            "&checkout=" +
            checkOutDateUrl
        );
        return result.data;
    };

    const fetchRoomList = async () => {
        const result = await axios("/reservation/rooms/get-all");
        setRoomList(result.data);
    };

    async function sortByName() {
        let sorted = await reservationList.sort((a, b) => (a.guest.firstName > b.guest.firstName) ? 1 : -1);
        setReservationList([]); //necessary to refresh state
        setReservationList(sorted);
    }

    async function sortByStatus() {
        console.log("date sort");
        let sorted = await reservationList.sort((a, b) => (a.status > b.status) ? 1 : -1);
        setReservationList([]); //necessary to refresh state
        setReservationList(sorted);
    }

    async function fetchReservationById(id) {
        const result = await axios(
            `/reservation/get-reservation?reservationId=${id}`
        );
        setGuest(result.data.guest);
        setAddress(result.data.guest.address);
        setReservation(result.data);
    }

    async function updateReservation(reservation) {
        const guest = reservation.guest || {};
        const address = guest.address || {};

        await axios.put("/reservation/update", {
            id: reservation.id,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            price: reservation.price,
            paymentMethod: reservation.paymentMethod,
            status: reservation.status,
            roomId: reservation.roomId,
            guest: {
                id: guest.id,
                firstName: guest.firstName,
                lastName: guest.lastName,
                email: guest.email,
                address: {
                    id: address.id,
                    country: address.country,
                    zipCode: address.zipcode,
                    city: address.city,
                    street: address.street
                }
            }
        });
        handleStatusChange();
    }



    const fetchForDate = async inComeDate => {
        let updatedDate = new Date(inComeDate);
        setDate(updatedDate);
        let dateUrl = createDateUrlPart(updatedDate);
        const url = `/reservation/checkin?date=${dateUrl}`;
        let axiosResponse = await axios(url);
        let limited = statusLimit(axiosResponse.data);
        setReservationList(limited);
    };

    const sortForDay = async (sort, date) => {
        let dateUrl = createDateUrlPart(date);
        const url = `/reservation/sort?date=${dateUrl}&sort=${sort}`;
        let axiosResponse = await axios(url);
        let limited = statusLimit(axiosResponse.data);
        setReservationList(limited);
    };

    const sortForAll = async (sort) => {
        let axiosResponse = await axios(`/reservation/sort/all?sort=${sort}`);
        let limited = statusLimit(axiosResponse.data);
        setReservationList(limited);
    };

    const fetchTodaysDate = async () => {
        let dateUrl = createDateUrlPart(new Date());
        const url = `/reservation/checkin?date=${dateUrl}`;
        let axiosResponse = await axios(url);
        console.log(limitCheckin);
        let limited =statusLimit(axiosResponse.data);
        setReservationList(limited);
    };

    const getReservationsForActualDate = async Date => {
        let dateUrl = createDateUrlPart(Date);
        const url = `/reservation/checkin?date=${dateUrl}`;
        let result = await axios(url);
        return result.data;
    };

    async function updateGuestStatus(guestId, updatedGuestStatus){
        const url = `/reservation/changestatus?id=${guestId}&status=${updatedGuestStatus}`;
        await axios.put(url);
        handleStatusChange()
    };

    const handleStatusChange = () => {
        switch (filter) {
            case "reservations":
                fetchReservationList();
                console.log("fetched for all")
                break;
            case "filter":
                fetchForDate(date);
                console.log("fetched for date")
                break;
            case "home":
                fetchTodaysDate();
                console.log("fetched Home")
                break;
            default:
                fetchTodaysDate();
                console.log("fetched default")
                break;
        }
    };

    const updateGuestRoom = async (roomId, guestId) => {
        const url = `/reservation/setroom?roomId=${roomId}&reservationId=${guestId}`;
        axios.put(url).then(response => {
            fetchRoomList();
            handleStatusChange();
        });
    };

    const addNewReservation = async (
        data,
        checkInDate,
        checkOutDate,
        paymentMethod
        ) => {
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
                handleStatusChange();
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
            });
    };

    const getActiveReservations = async Date => {
        let dateUrl = createDateUrlPart(Date);
        const url = `/reservation/active-reservations?date=${dateUrl}`;
        let result = await axios(url);
        return result.data;
    };

    return (
        <HotelContext.Provider
            value={{
                limitIn,
                setLimitIn,
                limitCheckin,
                setLimitCheckin,
                limitOut,
                setLimitOut,


                sortForAll,
                sortForDay,
                sortByName,
                sortByStatus,
                reservationList,
                setReservationList,
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
                reservation,
                setReservation,
                fetchReservationById,
                guest,
                setGuest,
                address,
                setAddress,
                updateReservation,
                fetchAvailableRoomsByDate,
                getActiveReservations,
                fetchTodaysDate,
                handleStatusChange
            }}
        >
            {props.children}
        </HotelContext.Provider>

    );
};
