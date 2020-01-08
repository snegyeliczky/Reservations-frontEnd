import React, { Component } from 'react';
import PropTypes from "prop-types";
import Guest from './Guest';


export class GuestList extends Component {
    render() {
        return this.props.guestList.map((guest) => (
            <Guest key={guest.id} 
            guest={guest}/>
        ));
    }
}

//PropTypes
GuestList.protoTypes = {
    GuestList: PropTypes.array.isRequired
};

export default GuestList
