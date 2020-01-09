import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button } from "react-bootstrap";

class SearchFild extends Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });

  render() {
    const { date } = this.state;
    return (
      <div>
        <br/>
        <DateTimePicker onChange={this.onChange} value={this.state.date} />
        <Button variant="dark"
          style={{margin: '5px'}}
          type="submit"
          onClick={this.props.checkForActualDate.bind(this, date)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default SearchFild;
