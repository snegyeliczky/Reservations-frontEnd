import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/layout/Header";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";

import "./App.css";

class App extends Component {
  state = {
    guestList: [],
    roomList: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/")
      .then(response => this.setState({ guestList: response.data }));
  }

  checkInList() {
    axios
      .get("http://localhost:8080/guest/checkin")
      .then(response => this.setState({ checkInList: response.data }));
  }

  getRoomList() {
    axios
      .get("http://localhost:8080/rooms/list")
      .then(response => this.setState({ roomList: response.data }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <p>Name E-mail Status Room</p>
                  <GuestList guestList={this.state.guestList} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/checkin"
              render={props => (
                <React.Fragment>
                  {this.checkInList()}
                  <p>Name E-mail Status Room</p>
                  <GuestList guestList={this.state.guestList} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/rooms"
              render={props => (
                <React.Fragment>
                  {this.getRoomList()}
                  <p>Name E-mail Status Room</p>
                  <RoomList roomList={this.state.roomList} />
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
