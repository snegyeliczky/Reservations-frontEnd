import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Header from "./components/layout/Header";
import Guests from './components/Guests';

import './App.css';

class App extends Component {
    state = {
        guests: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/')
            .then(response => this.setState({ guests: response.data }))    
    }
    
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={ props => (
                                <React.Fragment>
                                    <p>Name E-mail Status Room</p>
                                    <Guests guests={this.state.guests} />
                                </React.Fragment>
                        )} />   
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
