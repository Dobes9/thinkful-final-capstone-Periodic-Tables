import React, { useState } from "react";
import ListReservations from "../reservations/ListReservations";
import { listReservations } from "../utils/api";
import useQuery from "../utils/useQuery";

export default function SearchByMobileNumber() {
  const [mobile_number, setMobile_number] = useState(null);
  const [results, setResults] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [displayResults, setDisplayResults] = useState(false);

  const formChangeHandler = ({ target }) => {
    setMobile_number(target.value);
  };

  function listResults() {
    const abortController = new AbortController();
    listReservations({ mobile_number }, abortController.signal)
      .then(setResults)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const submitHandler = (event) => {
    event.preventDefault();
    listResults();
    setDisplayResults(true);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="row mt-3">
          <div className="col-6 form-group">
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="search"
              value={mobile_number}
              onChange={formChangeHandler}
              placeholder="Enter a customer's phone number"
              required
            />
          </div>
          <div className="col-6 form-group">
            <button className="btn btn-primary" type="submit">
              Find
            </button>
          </div>
        </div>
      </form>
      {displayResults ? (
        results.length ? (
          <ListReservations
            reservations={results}
            reservationsError={reservationsError}
          />
        ) : (
          <h4>No resevations found</h4>
        )
      ) : null}
    </>
  );
}
