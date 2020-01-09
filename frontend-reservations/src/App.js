import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

import Header from "./components/layout/Header";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import SearchField from "./components/search/SearchField";
import GuestProfile from "./components/GuestProfile";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    guestList: [],
    roomList: [],
    date: null
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/")
      .then(response =>
        this.setState({ guestList: response.data, date: null })
      );
    axios
      .get("http://localhost:8080/rooms/list")
      .then(response => this.setState({ roomList: response.data }));
  };

  checkForActualDate = data => {
    if (data == null) {
      this.componentDidMount();
    } else {
      let month =
        data.getMonth() + 1 > 10
          ? data.getMonth() + 1
          : "0" + (data.getMonth() + 1);
      let day = data.getDate() > 10 ? data.getDate() : "0" + data.getDate();
      let date = data.getFullYear() + "-" + month + "-" + day;
      this.setState({ date: data });
      axios
        .get("http://localhost:8080/guest/checkin?date=" + date)
        .then(response => this.setState({ guestList: response.data }));
    }
  };

  changeStatus = (guestId, newStatus) => {
    let mess = "?id=" + guestId + "&status=" + newStatus;
    axios
      .get("http://localhost:8080/guest/changestatus" + mess)
      .then(response => this.setState({ guestList: response.data }));
  };

  getGuestProfile = guestId => {};

  setRoom = (room, guest) => {
    console.log(room);
    let mess = "?roomId=" + room + "&guestId=" + guest.id;
    axios
      .get("http://localhost:8080/guest/setroom" + mess)
      .then(response => this.setState({ guestList: response.data }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header componentDidMount={this.componentDidMount} />
            <SearchField checkForActualDate={this.checkForActualDate} />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <br />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Check In Date</th>
                        <th>Name</th>
                        <th>Check Out Date</th>
                        <th>Edit Status</th>
                        <th>Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <GuestList
                        guestList={this.state.guestList}
                        changeStatus={this.changeStatus}
                      />
                    </tbody>
                  </Table>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/rooms"
              render={props => (
                <React.Fragment>
                  <RoomList
                    roomList={this.state.roomList}
                    getGuestProfile={this.getGuestProfile}
                  />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/guest/:guestId"
              render={route => (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Check In Date</th>
                      <th>Check Out Date</th>
                      <th>Status</th>
                      <th>Set Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <GuestProfile
                      match={route.match}
                      guestList={this.state.guestList}
                      roomList={this.state.roomList}
                      setRoom={this.setRoom}
                    />
                  </tbody>
                </Table>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
