import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import GuestProfile from "./components/GuestProfile";
import SearchField from "./components/search/SearchField";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { HotelProvider } from "./components/HotelContext";

function App() {
  return (
    <Router>
      <HotelProvider>
        <div className="App">
          <div className="container">
            <Nav />
            <SearchField />
            <Route exact path="/" render={() => <GuestList />} />
            <Route exact path="/rooms" render={() => <RoomList />} />
            <Route exact path="/guest/:guestId" component={GuestProfile} />
          </div>
        </div>
      </HotelProvider>
    </Router>
  );
}

export default App;
