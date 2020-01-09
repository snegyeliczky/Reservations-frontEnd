import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

import Header from "./components/layout/Header";
import GuestList from "./components/GuestList";
import RoomList from "./components/RoomList";
import SearchField from "./components/search/SearchField";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    guestList: [],
    roomList: [],
    date:null,
  };

  componentDidMount=()=> {
    axios
      .get("http://localhost:8080/")
      .then(response => this.setState({ guestList: response.data , date:null}));
  }

  getRoomList() {
    axios
      .get("http://localhost:8080/rooms/list")
      .then(response => this.setState({ roomList: response.data }));
  }

  checkForActualDate = (data) => {
    if(data==null){
        this.componentDidMount()
    }else{
        let month= (data.getMonth()+1)>10 ? data.getMonth()+1:"0"+(data.getMonth()+1);
        let day= (data.getDate())>10 ? data.getDate():"0"+(data.getDate());
        let date = data.getFullYear() + "-" + month + "-" + day;
        this.setState({date:data})
        console.log(date)
        axios
          .get("http://localhost:8080/guest/checkin?date=" + date)
          .then(response => this.setState({ guestList: response.data })); 
    }
  };

  changeStatus = (guestId, newStatus) => {
    let mess = "?id=" + guestId + "&status=" + newStatus
    axios
      .get("http://localhost:8080/guest/changestatus" + mess)
      .then(this.checkForActualDate.bind(this, this.state.date))
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header componentDidMount={this.componentDidMount}/>
            <SearchField checkForActualDate={this.checkForActualDate} />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <br/>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Check In Date</th>
                        <th>Name</th>
                        <th>Check Out Date</th>
                        <th>Modify</th>
                      </tr>
                    </thead>
                    <tbody>
                  <GuestList
                    guestList={this.state.guestList}
                    changeStatus={this.changeStatus} />
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
