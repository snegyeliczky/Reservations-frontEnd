import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Form} from 'react-bootstrap'

export class Guest extends Component {

    rowStyle = () => {
        return {
            background: '#f4f4f4'
        }
    };

    render() {
        const {name, email, room, status} = this.props.guest;
        return (
            <div style={guestStyle}>
                <div style={this.rowStyle()}>
                    <div>
                        <Form>
                            <Form.Group controlId="mainForm.Status">
                                <Form.Control as="select">
                                    <option value="CHECKIN">CheckIn</option>
                                    <option value="IN">In</option>
                                    <option value="CHECKOUT">CheckOut</option>
                                    <option value="OUT">Out</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        {name + ' ' + email + ' ' + room }
                    </div>
                </div>
            </div> 
        );
    }
}

const guestStyle =  {
    padding: '10px',
    borderBottom: '1px #ccc dotted'
};


//PropTypes
Guest.protoTypes = {
    guest: PropTypes.object.isRequired
};

export default Guest;
