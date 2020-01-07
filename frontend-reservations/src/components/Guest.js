import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Guest extends Component {
    render() {
        const {name, email, room, status} = this.props.guest;
        return (
            <div style={guestStyle}>
                <p>
                    {name + ' ' + email + ' ' + status + ' ' + room} 
                </p>
            </div>
        );
    }
}

const guestStyle =  {
    background: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'
};

//PropTypes
Guest.protoTypes = {
    guest: PropTypes.object.isRequired
};

export default Guest;
