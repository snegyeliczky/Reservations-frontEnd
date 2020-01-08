import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Header from "./components/layout/Header";
import GuestList from './components/GuestList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        guestList: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/')
            .then(response => this.setState({ guestList: response.data }))    
    }
    
    checkInList() {
        axios.get('http://localhost:8080/guest/checkin')
            .then(response => this.setState({ checkInList: response.data }))    
    }

    changeStatus(e, s) {
        console.log(e)
        console.log(s)
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={ props => (
                                <React.Fragment>
                                    {this.componentDidMount()}
                                    <p>Name E-mail Status Room</p>
                                    <GuestList guestList={this.state.guestList} changeStatus={this.changeStatus} />
                                </React.Fragment>
                        )} />
                        <Route exact path="/checkin" render={ props => (
                                <React.Fragment>
                                    {this.checkInList()}
                                    <p>Name E-mail Status Room</p>
                                    <GuestList guestList={this.state.guestList} changeStatus={this.changeStatus} />
                                </React.Fragment>
                        )} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
