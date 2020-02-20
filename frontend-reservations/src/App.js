import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import ReservationTable from "./components/ReservationTable";
import RoomList from "./components/RoomList";
import GuestProfile from "./components/GuestProfile";
import Login from "./components/login/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { HotelProvider } from "./components/HotelContext";
import AddReservationForm from "./components/AddReservationForm";
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
            <Route exact path="/newreservation" component={Nav} />
            <Route exact path="/adduser" component={Nav} />

            <div className="container">
              <Route exact path="/home" component={ReservationTable} />
              <Route exact path="/rooms" component={RoomList} />
              <Route exact path="/guest/:guestId" component={GuestProfile} />
              <Route
                exact
                path="/newreservation"
                component={AddReservationForm}
              />
              <Route exact path="/adduser" component={AddUserForm} />
            </div>
          </HotelProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
