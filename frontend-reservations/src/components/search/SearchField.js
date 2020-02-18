import React, {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import {HotelContext} from "../HotelContext";
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';


const SearchField = () => {
    const {date, setDate} = useContext(HotelContext);
    const {fetchForDate} = useContext(HotelContext);

    const handleChange = (date) => {
        setDate(date);
    };

    const onSubmit = () => {
        fetchForDate(date);
    };

    return (
        <div>
            <br/>

            <DatePicker
                onChange={handleChange}
                placeholder="Select Date"
            />

            <Button
                variant="dark"
                style={{margin: "5px"}}
                type="submit"
                onClick={onSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default SearchField;
