import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";

import {useForm} from 'react-hook-form';
import {HotelContext} from "./HotelContext";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DateTimePicker from "react-datetime-picker";

const AddGuestForm = () => {
    const {register, handleSubmit, errors} = useForm();
    const {addNewGuest} = useContext(HotelContext);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [toHome, setToHome] = useState(false);


    const onSubmit = data => {
        addNewGuest(data, checkInDate, checkOutDate);
        setToHome(true);
    };

    const handleCheckInChange = date => {
        setCheckInDate(date);
    };

    const handleCheckOutChange = date => {
        setCheckOutDate(date);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
                New guest registration
            </Typography>
            <TextField
                required
                id="name"
                name="name"
                label="Name"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>
            <br/>
            <br/>
            <label>Check In Date</label>
            {" "}
            <label>Check Out Date</label>
            <br/>
            <DateTimePicker onChange={handleCheckInChange} value={checkInDate}/>
            {" "}
            <DateTimePicker onChange={handleCheckOutChange} value={checkOutDate}/>
            <br/>
            <br/>
            <TextField
                required
                id="email"
                name="email"
                label="E-mail"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            {" "}
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>
            <TextField
                required
                id="zipcode"
                name="zipcode"
                label="ZipCode"
                autoComplete="fname"
                inputRef={register({required: true})}
            /> {" "}
            <TextField
                required
                id="city"
                name="city"
                label="City"
                autoComplete="fname"
                inputRef={register({required: true})}
            /> {" "}
            <TextField
                required
                id="street"
                name="street"
                label="Street"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            {toHome ? <Redirect to={"/home"}/> : null}
            <input type="submit"/>
        </form>
    );
};

export default AddGuestForm;
