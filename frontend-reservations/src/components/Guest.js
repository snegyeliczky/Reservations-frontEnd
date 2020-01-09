import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Guest extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  guestStyle = () => {
    let statusColor = "";

    switch (this.props.guest.status) {
      case "IN":
        statusColor = "lightgreen";
        break;
      case "CHECKOUT":
        statusColor = "lightcoral";
        break;
      default:
        statusColor = "white";
    }

    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      background: statusColor
    };
  };

  render() {
    const { id, name, room, status, checkIn, checkOut } = this.props.guest;

    const dropDownBtn = {
      lineHeight: "1.5",
      padding: ".375rem .75rem",
      textAlign: "center",
      verticalAlign: "middle",
      userSelect: "none",
      fonstSize: "1rem",
      cursor: "pointer",
      fontWeight: "400",
      color: "#fff",
      background: "#17a2b8",
      bordelColor: "#17a2b8",
      border: "1px solid transparent",
      borderRadius: ".25rem",
      margin: "5px"
    };
    return (
      <tr style={this.guestStyle()}>
        <td>{room}</td>
        <td>{checkIn}</td>
        <td>{name}</td>
        <td>{checkOut}</td>
        <td>
          <ButtonToolbar>
            <select
              style={dropDownBtn}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option>{status}</option>
              <option value="CHECKIN">CHECKIN</option>
              <option value="IN">IN</option>
              <option value="CHECKOUT">CHECKOUT</option>
            </select>
            <Button
              style={{ margin: "5px" }}
              variant="dark"
              type="submit"
              onClick={this.props.changeStatus.bind(this, id, this.state.value)}
            >
              Save
            </Button>
          </ButtonToolbar>
        </td>
        <td>
          <Link to={"/guest/" + this.props.guest.id} role="button">
            <Button variant="dark">Edit</Button>
          </Link>
        </td>
      </tr>
    );
  }
}

//PropTypes
Guest.protoTypes = {
  guest: PropTypes.object.isRequired
};

export default Guest;
