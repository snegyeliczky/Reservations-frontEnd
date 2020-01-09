import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/layout/Header";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import SearchField from "./components/search/SearchField";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  getRoomList() {
    axios
      .get("http://localhost:8080/rooms/list")
      .then(response => this.setState({ roomList: response.data }));
  }

  checkForActualDate = (data) => {
    let month= (data.getMonth()+1)>10 ? data.getMonth()+1:"0"+(data.getMonth()+1);
    let day= (data.getDate())>10 ? data.getDate():"0"+(data.getDate());
    let date = data.getFullYear() + "-" + month + "-" + day;
    console.log(date)
    axios
      .get("http://localhost:8080/guest/checkin?date=" + date)
      .then(response => this.setState({ guestList: response.data }));
  };

  changeStatus(guestId, newStatus) {
    axios
      .put(`http://localhost:8080/guest/changestatus/${guestId}/${newStatus}`, {
        guestId,
        newStatus
      })
      .then(response => this.setState({ guestList: response.data }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <SearchField checkForActualDate={this.checkForActualDate} />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <p>Name E-mail Status Room</p>
                  <GuestList
                    guestList={this.state.guestList}
                    changeStatus={this.changeStatus}
                  />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/checkin"
              render={props => (
                <React.Fragment>
                  <p>Name E-mail Status Room</p>
                  <GuestList
                    guestList={this.state.guestList}
                    changeStatus={this.changeStatus}
                  />
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
