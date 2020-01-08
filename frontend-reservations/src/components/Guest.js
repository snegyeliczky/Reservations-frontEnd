import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Form} from 'react-bootstrap'

export class Guest extends Component {
    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }

    render() {
        const {selectedValue} = this.state;
        const {id, name, email, room, status} = this.props.guest;
        return (
            <div style={guestStyle}>
                <div>
                    <div>
                        <Form>
                            <Form.Group controlId={id}>
                                <Form.Control as="select" value={this.state.value} onSelect={this.handleChange} onBlur={this.props.changeStatus.bind(this, id, selectedValue)}>
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
