import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";


class SearchFild extends Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });


  render() {
    const{date} = this.state;
    return (
      <div>
        <DateTimePicker onChange={this.onChange} value={this.state.date} />
        <button
          type="submit"
          onClick={this.props.checkForActualDate.bind(this, date)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SearchFild;
