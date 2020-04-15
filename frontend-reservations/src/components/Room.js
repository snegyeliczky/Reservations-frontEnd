import React from "react";
import {Link} from "react-router-dom";

export const Room = ({room, availableRooms, reservationId}) => {
    const {number, id} = room;

    const isAvailable = () => {
        for (let availableRoom of availableRooms) {
            if (availableRoom.id === id) {
                return true;
            }
        }
        return false;
    };

    const roomStyle = {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        backgroundColor: isAvailable() ? "lightgreen" : "orangered",
        display: "inline-flex",
        padding: "1.5%",
        margin: "1.5%",
        borderRadius: "15px"
    };

    const linkStyle = {
        color: "black"
    };

    let roomElement;

    if (!isAvailable()) {
        roomElement = (
            <div style={roomStyle}>
                <Link style={linkStyle} to={"/reservation/" + reservationId}>
                    <p>
                        Room
                        <br/>
                        {number}
                    </p>
                </Link>
            </div>
        );
    } else {
        roomElement = (
            <div style={roomStyle}>
                <p>
                    Room
                    <br/>
                    {number}
                </p>
            </div>
        );
    }

    return roomElement;
};

export default Room;
