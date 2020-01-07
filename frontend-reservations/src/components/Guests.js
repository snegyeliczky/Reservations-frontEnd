import React, { Component } from 'react';
import PropTypes from "prop-types";
import Guest from './Guest';


export class Guests extends Component {
    render() {
        return this.props.guests.map((guest) => (
            <Guest key={guest.id} 
            guest={guest}/>
        ));
    }
}

//PropTypes
Guests.protoTypes = {
    guests: PropTypes.array.isRequired
};

export default Guests
