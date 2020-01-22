import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { HotelProvider } from "./components/HotelContext";

function App() {
  return (
    <Router>
      <HotelProvider>
        <div className="App">
          <div className="container">
            <Nav />
            <Route exact path="/" render={() => <GuestList />} />
            <Route exact path="/rooms" render={() => <RoomList />} />
          </div>
        </div>
      </HotelProvider>
    </Router>
  );
}

export default App;
