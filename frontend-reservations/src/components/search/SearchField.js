import React, { useContext, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button } from "react-bootstrap";
import { HotelContext } from "../HotelContext";

const SearchField = () => {
  const [updatedDate, setUpdatedDate] = useState(new Date());
  const { fetchForDate } = useContext(HotelContext);

  const handleChange = date => setUpdatedDate(date);

  const onSubmit = event => {
    event.preventDefault();
    fetchForDate(updatedDate);
  };

  return (
    <div>
      <br />
      <DateTimePicker
        onChange={handleChange}
        value={updatedDate}
        className="date-background"
      />
      <Button
        variant="dark"
        style={{ margin: "5px" }}
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default SearchField;
