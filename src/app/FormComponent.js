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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${JSON.stringify(formData)}`);
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
