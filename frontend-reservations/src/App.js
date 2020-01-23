import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import GuestProfile from "./components/GuestProfile";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { HotelProvider } from "./components/HotelContext";
import AddGuestForm from "./components/AddGuestForm";

function App() {
  return (
    <Router>
      <HotelProvider>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/" component={GuestList} />
            <Route exact path="/rooms" component={RoomList} />
            <Route exact path="/guest/:guestId" component={GuestProfile} />
            <Route exact path="/newguest" component={AddGuestForm} />
          </div>
        </div>
      </HotelProvider>
    </Router>
  );
}

export default App;
