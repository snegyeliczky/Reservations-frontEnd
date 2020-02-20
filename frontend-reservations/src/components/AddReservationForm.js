import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { useForm } from "react-hook-form";
import { HotelContext } from "./HotelContext";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Alert } from "antd";
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

const AddReservationForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { addNewReservation } = useContext(HotelContext);
  const classes = useStyles();
  const [toHome, setToHome] = useState(false);
  const [error, setError] = useState(false);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState();

  const onSubmit = data => {
    if (checkInDate > checkOutDate) {
      wrongLogIn();
      return;
    }
    addNewReservation(data, checkInDate, checkOutDate, paymentMethod);
    setToHome(true);
  };

  const wrongLogIn = () => {
    setError(true);
    document
      .querySelector(".WarningMessageForLogin")
      .setAttribute("id", "alert");
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
    event.preventDefault();
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
          New Reservation
        </Typography>
        <TextField
          required
          id="firstname"
          name="firstname"
          label="First Name"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="lastname"
          name="lastname"
          label="LastName"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="email"
          name="email"
          label="E-mail"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="zipcode"
          name="zipcode"
          label="ZipCode"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="city"
          name="city"
          label="City"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <TextField
          required
          id="street"
          name="street"
          label="Street"
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <label>Check In Date</label> <label>Check Out Date</label>
        <br />
        <DatePicker onChange={handleCheckInChange} />{" "}
        <DatePicker onChange={handleCheckOutChange} />
        <br />
        <TextField
          required
          id="price"
          name="price"
          label="€"
          type="number"
          inputProps={{ min: "0" }}
          autoComplete="fname"
          inputRef={register({ required: true })}
        />
        <br />
        <FormControl required className={classes.formControl}>
          <InputLabel id="payment-method-label">Payment Method</InputLabel>
          <Select
            required
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

export default AddReservationForm;
