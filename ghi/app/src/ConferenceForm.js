import React, { useEffect, useState } from "react";

function ConferenceForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.starts = dateStarts;
    data.ends = dateEnds;
    data.description = description;
    data.max_presentations = maxPresentations;
    data.max_attendees = maxAttendees;
    data.location = location;
    console.log(data);

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      setName("");
      setDateStarts("");
      setDateEnds("");
      setDescription("");
      setMaxPresentations("");
      setMaxAttendees("");
      setLocation("");
    }
  };

  const [states, setStates] = useState([]);
  const [name, setName] = useState("");
  const [dateStarts, setDateStarts] = useState("");
  const [dateEnds, setDateEnds] = useState("");
  const [description, setDescription] = useState("");
  const [maxPresentations, setMaxPresentations] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [location, setLocation] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setDateStarts(value);
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    setDateEnds(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };

  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStartDateChange}
                  placeholder="Starts"
                  required
                  type="date"
                  name="starts"
                  id="starts"
                  className="form-control"
                  value={dateStarts}
                />
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEndDateChange}
                  placeholder="Ends"
                  required
                  type="date"
                  name="ends"
                  id="ends"
                  className="form-control"
                  value={dateEnds}
                />
                <label htmlFor="room_count">Ends</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  required
                  name="description"
                  id="description"
                  className="form-control"
                  value={description}
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleMaxPresentationsChange}
                  placeholder="Max presentations"
                  required
                  type="number"
                  name="max_presentations"
                  id="max_presentations"
                  className="form-control"
                  value={maxPresentations}
                />
                <label htmlFor="max_presentations">Max presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleMaxAttendeesChange}
                  placeholder="Max attendees"
                  required
                  type="number"
                  name="max_attendees"
                  id="max_attendees"
                  className="form-control"
                  value={maxAttendees}
                />
                <label htmlFor="max_attendees">Max attendees</label>
              </div>
              <div className="mb-3">
                <select
                  required
                  onChange={handleLocationChange}
                  id="location"
                  className="form-select"
                  name="location"
                  value={location}
                >
                  <option value="">Choose a location</option>
                  {states.map((locations) => {
                    return (
                      <option key={locations.name} value={locations.id}>
                        {locations.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferenceForm;
