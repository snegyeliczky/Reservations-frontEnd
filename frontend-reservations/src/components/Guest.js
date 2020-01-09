import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";

export class Guest extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  render() {
    const { id, name, email, room, status } = this.props.guest;
    return (
      <div style={guestStyle}>
        <div>
          <div style={rowStlye}>
            <Row>
              {name + " " + email + " " + room}
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="CHECKIN">CheckIn</option>
                <option value="IN">In</option>
                <option value="CHECKOUT">CheckOut</option>
                <option value="OUT">Out</option>
              </select>
              <Button
                variant="dark"
                type="submit"
                onClick={this.props.changeStatus.bind(
                  this,
                  id,
                  this.state.value
                )}
              >
                Submit
              </Button>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const rowStlye = {
  display: "inline-flex"
};

const guestStyle = {
  padding: "10px",
  borderBottom: "1px #ccc dotted"
};

//PropTypes
Guest.protoTypes = {
  guest: PropTypes.object.isRequired
};

export default Guest;
