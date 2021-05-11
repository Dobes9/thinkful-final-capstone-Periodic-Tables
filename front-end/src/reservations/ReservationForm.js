import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import { createReservation } from "../utils/api";

export default function ReservationForm() {
  const history = useHistory();
  const abortController = new AbortController();
  const signal = abortController.signal;

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const formChangeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createReservation(formData, signal);
    history.push(
      `/dashboard?date=${formatReservationDate(formData.reservation_date)}`
    );
  };

  return (
    <form>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="first_name">
            First Name:
          </label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="last_name">
            Last Name:
          </label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="mobile_number">
            Mobile Number:
          </label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            type="text"
            placeholder="XXX-XXX-XXXX"
            pattern="\d{3}-\d{3}-\d{4}"
            value={formData.mobile_number}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="reservation_date">
            Reservation Date:
          </label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.reservation_date}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="reservation_time">
            Reservation Time:
          </label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="people">
            People:
          </label>
          <input
            className="form-control"
            id="people"
            name="people"
            type="number"
            max="12"
            min="1"
            value={formData.people}
            onChange={formChangeHandler}
            required
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary mx-1"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
