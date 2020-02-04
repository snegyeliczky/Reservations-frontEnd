import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import GuestProfile from "./components/GuestProfile";
import Login from "./components/login/Login";

import {BrowserRouter as Router, Route} from "react-router-dom";
import {HotelProvider} from "./components/HotelContext";
import AddGuestForm from "./components/AddGuestForm";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Route exact path="/" component={Login}/>
                    <HotelProvider>
                        <Route exact path="/home" component={Nav}/>
                        <Route exact path="/home" component={GuestList}/>
                        <Route exact path="/rooms" component={RoomList}/>
                        <Route exact path="/guest/:guestId" component={GuestProfile}/>
                        <Route exact path="/newguest" component={AddGuestForm}/>
                    </HotelProvider>
                </div>
            </div>
        </Router>
    )
        ;
}

export default App;
