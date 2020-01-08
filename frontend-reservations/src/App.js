import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Header from "./components/layout/Header";
import GuestList from './components/GuestList';
import SearchField from './components/search/SearchField';

import './App.css';

class App extends Component {

    state = {
        url:'http://localhost:8080/guest/checkin',
        guestList: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/')
            .then(response => this.setState({ guestList: response.data }))    
    }
    
    checkInList(url) {
        axios.get(this.state.url)
            .then(response => this.setState({ guestList: response.data }))    
    }


    checkForActualDate=(year,month,day)=>{
        let date = year+"-"+month+"-"+day;
        axios.get("http://localhost:8080/guest/checkin?date="+date)
        .then(response => this.setState({ guestList: response.data }))    
}
    


    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <SearchField checkForActualDate={this.checkForActualDate}/>
                        <Route exact path="/" render={ props => (
                                <React.Fragment>
                                    <p>Name E-mail Status Room</p>
                                    <GuestList guestList={this.state.guestList} />
                                </React.Fragment>
                        )} />
                        <Route exact path="/checkin" render={ props => (
                                <React.Fragment>
                                    <p>Name E-mail Status Room</p>
                                    <GuestList guestList={this.state.guestList} />
                                </React.Fragment>
                        )} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
