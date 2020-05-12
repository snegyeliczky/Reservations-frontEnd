import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {HotelContext} from "./HotelContext";
import {UserContext} from "./Context/UserContext";

const Nav = () => {
    const {
        fetchReservationList,
        date,
        setFilter,
        fetchForDate,
        fetchTodaysDate
    } = useContext(HotelContext);
    const {logout, isLoggedIn} = useContext(UserContext);
    const [toLogin, setToLogin] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [toHome, setToHome] = useState(false);

    const onClickHandlerForHome = () => {
        fetchTodaysDate();
        setFilter("home");
        setToHome(true);
    };

    const onClickHandlerForReservations = () => {
        fetchReservationList();
        setFilter("reservations");
        setToHome(true);
    };

    const onClickHandleForFilteredDate = () => {
        fetchForDate(date);
        setFilter("filter");
        setToHome(true);
    };

    useEffect(() => {
        let roles = localStorage.getItem("roles");
        if (roles != null) {
            let rolesArray = roles.split(",");
            let isAdmin = rolesArray.includes("ROLE_ADMIN");
            setAdmin(isAdmin);
        }
    }, []);

    const onClickLogout = () => {
        logout();
        setFilter(false);
        setToLogin(true);
        localStorage.removeItem("roles");
        setAdmin(false);
    };

    const backgroundColor = {
        background:
            "rgb(150,149,149) linear-gradient(61deg, rgba(150,149,149,1) 10%, rgba(111,111,111,1) 48%, rgba(81,89,97,1) 82%)"
    };

    const btnColor = {
        color: "#fff"
    };

    return (
        <header>
            <nav
                className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
                style={backgroundColor}
            >
                <div className="navbar-brand" onClick={onClickHandlerForHome}>
                    <a>Home</a>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    to="/home"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                onClick={onClickHandlerForReservations}
                                style={btnColor}
                                to="/home"
                            >
                                Reservations
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                onClick={onClickHandleForFilteredDate}
                                style={btnColor}
                                to="/home"
                            >
                                Filter
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={btnColor} to="/rooms">
                                Rooms
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={btnColor} to="/newreservation">
                                New Reservation
                            </Link>
                        </li>
                        {isAdmin ? (
                            <li className="nav-item">
                                <Link className="nav-link" style={btnColor} to="/adduser">
                                    New User
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                    <button
                        className="btn btn-outline-light my-2 my-sm-0"
                        type="submit"
                        onClick={onClickLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {toHome ? <Redirect to={"/home"}/> : null}
            {isLoggedIn ? null : <Redirect to={"/login"}/>}
        </header>
    );
};

export default Nav;
