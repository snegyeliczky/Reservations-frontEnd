import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

const newDate = new Date();

// let date = newDate.getDate();
// let month = newDate.getMonth() + 1;
// let year = newDate.getFullYear();

class SearchFild extends Component {
  state = {
    // year: newDate.getFullYear(),
    // month: newDate.getMonth() + 1,
    // day: newDate.getDate()
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
        {/* <input type="date" />
        <label>Add year</label>
        <input
          name="year"
          defaultValue={year}
          onChange={this.handleYear}
        ></input>
        <label>Add month</label>
        <input
          name="weak"
          defaultValue={month}
          onChange={this.handleMonth}
        ></input>
        <label>Add day</label>
        <input name="day" defaultValue={day} onChange={this.handleDay}></input> */}
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
