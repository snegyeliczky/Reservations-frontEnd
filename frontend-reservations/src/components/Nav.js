import React, {useContext, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {HotelContext} from "./HotelContext";
import {UserContext} from "./Context/UserContext";

const Nav = () => {
    const {fetchGuestList} = useContext(HotelContext);
    const {logout,isLoggedIn} = useContext(UserContext);
    const [toLogin, setToLogin] = useState(false);

    const onClickHandlerForHome = () => {
        fetchGuestList();
    };

    const onClickLogout = () => {
        logout();
        setToLogin(true);
    };

    const backgroundColor = {
        background: "rgb(150,149,149) linear-gradient(61deg, rgba(150,149,149,1) 10%, rgba(111,111,111,1) 48%, rgba(81,89,97,1) 82%)"
    };

    const btnColor = {
        color: "#fff"
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={backgroundColor}>
                <a className="navbar-brand">Reservations</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={btnColor} to="/home" onClick={onClickHandlerForHome}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={btnColor} to="/rooms">
                                Rooms
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={btnColor} to="/newguest">
                                New Guest
                            </Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={onClickLogout}>Logout</button>

                </div>
            </nav>

            {isLoggedIn ? null : <Redirect to={"/login"}/>}
        </header>
    );
};

export default Nav;
