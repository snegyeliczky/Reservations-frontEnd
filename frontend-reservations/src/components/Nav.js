import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {HotelContext} from "./HotelContext";

const Nav = () => {
    const {fetchGuestList} = useContext(HotelContext);

    const onClickHandlerForHome = () => {
        fetchGuestList();
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <Link className="nav-link" to="/home" onClick={onClickHandlerForHome}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rooms">
                                Rooms
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/newguest">
                                New Guest
                            </Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Logout</button>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
