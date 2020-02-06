import React, {useState, createContext} from "react";
import axios from "axios";
import {HotelContext} from "../HotelContext";
import Cookies from "universal-cookie";

export const UserContext = createContext();

export const UserProvider = props => {

    const checkStatusInCookie = () =>{
        let cookie = new Cookies();
        let status =  cookie.get("isLoggedIn");
        return status ? JSON.parse(status) : false;
    };

    const [isLoggedIn, setLoggedIn] = useState(checkStatusInCookie());


    const changeLoginStatus = () => {
        setLoggedIn(!isLoggedIn);
        console.log("change login to: "+ isLoggedIn)
    };

    const logout = () => {
        const url = 'http://localhost:8080/auth/logout';
        axios.post(url)
            .then(response => {
                changeLoginStatus();
                new Cookies().remove("isLoggedIn");
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