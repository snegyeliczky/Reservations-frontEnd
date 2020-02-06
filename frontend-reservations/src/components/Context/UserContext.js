import React, {useState, createContext} from "react";
import axios from "axios";
import {HotelContext} from "../HotelContext";

export const UserContext = createContext();

export const UserProvider = props => {

    const [isLoggedIn, setLoggedIn] = useState(false);


    const changeLoginStatus = () => {
        setLoggedIn(!isLoggedIn);
        console.log("change login to: "+ isLoggedIn)
    };

    const logout = () => {
        const url = 'http://localhost:8080/auth/logout';
        axios.post(url)
            .then(response => {
                changeLoginStatus()
            })
            .catch(reason => console.log(reason));
    };

    return (
        <UserContext.Provider
            value={{
                logout,
                isLoggedIn,
                setLoggedIn,
                changeLoginStatus
            }}
        >
            {props.children}
        </UserContext.Provider>
    );

}