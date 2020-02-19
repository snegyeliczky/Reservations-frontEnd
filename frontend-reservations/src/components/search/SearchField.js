import React, { useContext, useState } from "react";
import {DatePicker} from "antd";
import { Button } from "react-bootstrap";
import { HotelContext } from "../HotelContext";
import 'antd/dist/antd.css';

const SearchField = () => {
    const {date, setDate} = useContext(HotelContext);
    const {fetchForDate} = useContext(HotelContext);

    const handleChange = (date) => {
        if (date==null){
            setDate(new Date())
        }
        else {
            setDate(date);
        }

    };

    const onSubmit = () => {
        fetchForDate(date);
    };

    return (
        <div>
            <br/>

            <DatePicker
                onChange={handleChange}
                placeholder="Checkin Date"
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
