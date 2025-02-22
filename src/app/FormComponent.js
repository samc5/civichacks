"use client";

import { useState } from "react";

export default function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    dateOfArrest: "",
    locationOfArrest: "",
    courthouseReason: "",
    heldHours: "",
    address: "",
    immigrationStatus: "",
    monitored: "",
    latitude: "",
    longitude: ""
  });
  const axios = require('axios');

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    // Validate the address
    const apiUrl = "https://civichacks.vercel.app/api/geocode";
    try {
      const response = await axios.get(apiUrl, {
        params: { address: formData.address },
      });
      const data = response.data;

      if (data.results.length > 0) {
        // Address is valid, proceed with submission
        formData.latitude, formData.longitude = data.results[0].geometry.location;
        alert(`Submitted: ${JSON.stringify(formData)}`);
      } else {
        // Address is invalid
        alert("The address entered is not valid. Please check and try again.");
      }
    } catch (error) {
      console.error("Error validating address:", error);
      alert("An error occurred while validating the address. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto"
    >
      <label className="flex flex-col">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        Date Of Arrest:
        <input
          type="date"
          name="dateOfArrest"
          value={formData.dateOfArrest}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        Location Of Arrest:
        <input
          type="text"
          name="locationOfArrest"
          value={formData.locationOfArrest}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        If arrested at a probation office or courthouse, what was the reason for being present?
        <input
          type="text"
          name="courthouseReason"
          value={formData.courthouseReason || ""}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        How long (in hours) were you/the person arrested held in police custody before ICE arrived?
        <input
          type="number"
          name="heldHours"
          value={formData.heldHours}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      

      <label className="flex flex-col">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="p-2 border rounded"
          required // You can change this to false if the field is optional
        />
      </label>

      <label className="flex flex-col">
        Immigration Status at time of Arrest:
        <select
          name= "immigrationStatus"
          value={formData.immigrationStatus}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select a reason</option>
          <option value="orderOfRemoval">Order of Removal</option>
          <option value="pendingAppAsylum">Pending Application - Asylum</option>
          <option value="inRemovalProceedings">In Removal Proceedings</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>

      <label className="flex flex-col">
        Was person arrested monitored/under surveillence by ICE?
        <select
          name= "monitored"
          value={formData.monitored}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select a reason</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">Unsure</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Submit
      </button>
    </form>
  );
}
