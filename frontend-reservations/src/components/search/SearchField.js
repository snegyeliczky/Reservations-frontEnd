import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

class SearchFild extends Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });

  handleYear = e => {
    this.setState({ year: e.target.value });
  };

  handleMonth = e => {
    this.setState({ month: e.target.value });
  };

  handleDay = e => {
    this.setState({ day: e.target.value });
  };

  render() {
    const { year, month, day } = this.state;
    return (
      <div>
        <DateTimePicker onChange={this.onChange} value={this.state.date} />
        <button
          type="submit"
          onClick={this.props.checkForActualDate.bind(this, year, month, day)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SearchFild;
