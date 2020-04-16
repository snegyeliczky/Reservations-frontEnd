import React, {useContext, useState, useEffect} from "react";
import {HotelContext} from "./HotelContext";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {DatePicker, Alert} from "antd";
import "antd/dist/antd.css";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const Reservation = props => {
    const {
        fetchReservationById,
        roomList,
        reservation,
        setReservation,
        guest,
        setGuest,
        address,
        setAddress,
        updateReservation
    } = useContext(HotelContext);
    const classes = useStyles();
    const {handleSubmit, errors} = useForm();
    const [error, setError] = useState(false);
    const [toHome, setToHome] = useState(false);

    useEffect(() => {
        fetchReservationById(props.match.params.guestId);
        console.log()
    }, []);

    const myWarning = () => {
        setError(true);
        document.querySelector(".myWarning").setAttribute("id", "alert");
    };

    const setErrorBack = () => {
        setError(false);
    };

    const getDateStringFromDate = data => {
        let date = new Date(data);
        let month =
            date.getMonth() + 1 > 10
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1);
        let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
        let dateString = date.getFullYear() + "-" + month + "-" + day;
        return dateString;
    };

    const handleFirstNameChange = e => {
        setGuest({...guest, firstName: e.target.value});
    };

    const handleLastNameChange = e => {
        setGuest({...guest, lastName: e.target.value});
    };

    const handleEmailChange = e => {
        setGuest({...guest, email: e.target.value});
    };

    const handleCountryChange = e => {
        setAddress({...address, country: e.target.value});
    };

    const handleZipCodeChange = e => {
        setAddress({...address, zipCode: e.target.value});
    };

    const handleCityChange = e => {
        setAddress({...address, city: e.target.value});
    };

    const handleStreetChange = e => {
        setAddress({...address, street: e.target.value});
    };

    const handleCheckInChange = date => {
        setReservation({...reservation, checkIn: getDateStringFromDate(date)});
    };

    const handleCheckOutChange = date => {
        setReservation({
            ...reservation,
            checkOut: getDateStringFromDate(date)
        });
    };

    const handlePriceChange = e => {
        setReservation({...reservation, price: e.target.value});
    };

    const handleChangePayment = event => {
        setReservation({...reservation, paymentMethod: event.target.value});
    };

    const onSubmit = () => {
        if (reservation.checkIn > reservation.checkOut) {
            myWarning();
            return;
        }
        setGuest(prevState => {
            prevState.address = address;
            return {...prevState};
        });

        setReservation(prevState => {
            prevState.guest = guest;
            return {...prevState};
        });
        updateReservation(reservation);
        setToHome(true);
    };

    return (
        <div>
            {error ? (
                <Alert
                    message="Invalid Dates"
                    description="Check Out Date can't be earlier than Check In Date"
                    type="error"
                    className="myWarning"
                    closable
                    onClose={setErrorBack}
                />
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="form-background">
                <Typography variant="h6" gutterBottom>
                    Edit Reservation
                </Typography>
                <TextField
                    id="firstname"
                    name="firstname"
                    label={guest.firstName ? guest.firstName : "First Name"}
                    autoComplete="fname"
                    onChange={handleFirstNameChange}
                />
                <br/>
                <TextField
                    id="lastname"
                    name="lastname"
                    label={guest.lastName ? guest.lastName : "Last Name"}
                    autoComplete="fname"
                    onChange={handleLastNameChange}
                />
                <br/>
                <TextField
                    id="email"
                    name="email"
                    label={guest.email ? guest.email : "E-mail"}
                    autoComplete="fname"
                    onChange={handleEmailChange}
                />
                <br/>
                <TextField
                    id="country"
                    name="country"
                    label={address.country ? address.country : "Country"}
                    autoComplete="fname"
                    onChange={handleCountryChange}
                />
                <br/>
                <TextField
                    id="zipcode"
                    name="zipcode"
                    label={address.zipCode ? address.zipCode : "Zip Code"}
                    autoComplete="fname"
                    onChange={handleZipCodeChange}
                />
                <br/>
                <TextField
                    id="city"
                    name="city"
                    label={address.city ? address.city : "City"}
                    autoComplete="fname"
                    onChange={handleCityChange}
                />
                <br/>
                <TextField
                    id="street"
                    name="street"
                    label={address.street ? address.street : "Street"}
                    autoComplete="fname"
                    onChange={handleStreetChange}
                />
                <br/>
                <br/>
                <label>Check In Date</label> <label>Check Out Date</label>
                <br/>
                <DatePicker
                    onChange={handleCheckInChange}
                    placeholder={
                        reservation.checkIn ? reservation.checkIn : "Select Date"
                    }
                />{" "}
                <DatePicker
                    onChange={handleCheckOutChange}
                    placeholder={
                        reservation.checkOut ? reservation.checkOut : "Select Date"
                    }
                />
                <br/>
                <TextField
                    id="price"
                    name="price"
                    label={
                        reservation.price ? `${Math.floor(reservation.price)} €` : "Price"
                    }
                    type="number"
                    inputProps={{min: "0"}}
                    autoComplete="fname"
                    onChange={handlePriceChange}
                />
                <div>City Tax:<b> {reservation.cityTaxIncluded ? " Include" : " Exclude"} </b></div>
                <br/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="payment-method-label">
                        {reservation.paymentMethod
                            ? reservation.paymentMethod
                            : "Payment Method"}
                    </InputLabel>
                    <Select
                        labelId="payment-method-label"
                        id="payment"
                        name="payment-native-required"
                        onChange={handleChangePayment}
                    >
                        <MenuItem value={"CASH"}>CASH</MenuItem>
                        <MenuItem value={"CARD"}>CARD</MenuItem>
                        <MenuItem value={"TRANSFER"}>TRANSFER</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                {toHome ? <Redirect to={"/home"}/> : null}
                <input className="send" value="Submit" type="submit"/>
            </form>
        </div>
    );
};
export default Reservation;
