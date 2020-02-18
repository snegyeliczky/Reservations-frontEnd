import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import ReservationList from "./components/ReservationList";
import RoomList from "./components/RoomList";
import GuestProfile from "./components/GuestProfile";
import Login from "./components/login/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { HotelProvider } from "./components/HotelContext";
import AddGuestForm from "./components/AddGuestForm";
import AddUserForm from "./components/AddUserForm";
import { UserProvider } from "./components/Context/UserContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <HotelProvider>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Nav} />
            <Route exact path="/rooms" component={Nav} />
            <Route exact path="/guest/:guestId" component={Nav} />
            <Route exact path="/newguest" component={Nav} />
            <Route exact path="/adduser" component={Nav} />

            <div className="container">
              <Route exact path="/home" component={ReservationList} />
              <Route exact path="/rooms" component={RoomList} />
              <Route exact path="/guest/:guestId" component={GuestProfile} />
              <Route exact path="/newguest" component={AddGuestForm} />
              <Route exact path="/adduser" component={AddUserForm} />
            </div>
          </HotelProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
