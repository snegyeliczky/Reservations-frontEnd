import React, {useContext} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {HotelContext} from "../HotelContext";


const CheckBoxes = () => {

    const {
        limitIn,
        setLimitIn,
        limitCheckin,
        setLimitCheckin,
        limitOut,
        setLimitOut,
        handleStatusChange
    } = useContext(HotelContext);


    const changeLimitIn = async (e) => {
        setLimitIn(e.target.checked);
    };

    const changeLimitOut = (e) => {
        setLimitOut(e.target.checked);
    };


    async function changeLimitCheckin(e) {
        await setLimitCheckin(e.target.checked);

    };

    const inStyle = {
        color: "#90EE90"
    };

    const checkinStyle = {
        color: "#ADD8E6"
    }

    const outStyle = {
        color: "#F08080"
    }


    return (
        <div>
            <Checkbox defaultChecked style={inStyle} onChange={changeLimitIn} />
            <Checkbox defaultChecked style={checkinStyle} onChange={changeLimitCheckin}/>
            <Checkbox defaultChecked style={outStyle} onChange={changeLimitOut}/>
            <button onClick={handleStatusChange}>filter</button>
        </div>

    )


};

export default CheckBoxes;