import React, { useContext, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { HotelContext } from "./HotelContext";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { DatePicker, Alert } from "antd";
import "antd/dist/antd.css";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

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
    updateReservation
  } = useContext(HotelContext);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(false);
  const [toHome, setToHome] = useState(false);
  const [checkInDate, setCheckInDate] = useState(
    reservation.checkIn || new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    reservation.checkOut || new Date()
  );
  const [paymentMethod, setPaymentMethod] = useState(reservation.paymentMethod);
  const guest = reservation.guest || {};
  const address = guest.address || {};

  useEffect(() => {
    fetchReservationById(props.match.params.guestId);
  }, []);

  const getRoomNumberByRoomId = reservation => {
    for (let room of roomList) {
      if (room.id === reservation.roomId) {
        return room.number;
      }
    }
  };

  const wrongLogIn = () => {
    setError(true);
    document
      .querySelector(".WarningMessageForLogin")
      .setAttribute("id", "alert");
  };

  const onSubmit = data => {
    if (checkInDate > checkOutDate) {
      wrongLogIn();
      return;
    }
    console.log(paymentMethod);
    //updateReservation(data, checkInDate, checkOutDate, paymentMethod);
    //setToHome(true);
  };

  const setErrorBack = () => {
    setError(false);
  };

  const handleCheckInChange = date => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = date => {
    setCheckOutDate(date);
  };

  const handleChangePayment = event => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      {error ? (
        <Alert
          message="Invalid Dates"
          description="Check Out Date can't be lower than Check In Date"
          type="error"
          className="WarningMessageForLogin"
          closable
          onClose={setErrorBack}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="form-background">
        <Typography variant="h6" gutterBottom>
          Update Reservation
        </Typography>
        <TextField
          id="firstname"
          name="firstname"
          label={guest.firstName ? guest.firstName : "First Name"}
          defaultValue={guest.firstName}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="lastname"
          name="lastname"
          label={guest.lastName ? guest.lastName : "Last Name"}
          defaultValue={guest.lastName}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="email"
          name="email"
          label={guest.email ? guest.email : "E-mail"}
          defaultValue={guest.email}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="country"
          name="country"
          label={address.country ? address.country : "Country"}
          defaultValue={guest.country}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="zipcode"
          name="zipcode"
          label={address.zipcode ? address.zipcode : "Zip Code"}
          defaultValue={address.zipcode}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="city"
          name="city"
          label={address.city ? address.city : "City"}
          defaultValue={address.city}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          id="street"
          name="street"
          label={address.street ? address.street : "Street"}
          defaultValue={address.street}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <br />
        <label>Check In Date</label> <label>Check Out Date</label>
        <br />
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
        <br />
        <TextField
          id="price"
          name="price"
          label={
            reservation.price ? `${Math.floor(reservation.price)} €` : "Price"
          }
          defaultValue={reservation.price}
          type="number"
          inputProps={{ min: "0" }}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel
            id="payment-method-label"
            defaultValue={reservation.paymentMethod}
          >
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
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <br />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        {toHome ? <Redirect to={"/home"} /> : null}
        <input className="send" value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Reservation;
