"use client";

import { useState } from "react";

export default function FormComponent() {
  const [formData, setFormData] = useState({
    Date: "",
    Location: "",
    Latitude: 0.0,
    Longitude: 0.0,
    ReasonProbation: "",
    HowLongArrested: "",
    Address: "",
    ImmigrationStatus: "",
    CircumstancesInfo: "",
    IsISAP: "",
    MonitoringType: "",
    HowICE: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
    FollowUp: "",
    synthetic: false,  
    realLocation: true
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
        params: { address: formData.Address },
      });
      const data = response.data;

      if (data.results.length > 0) {
        // Address is valid, proceed with submission
        const { lat, lng } = data.results[0].geometry.location;
        const updatedFormData = {
          ...formData,
          Latitude: lat,
          Longitude: lng
        };
        alert("Extracted Latitude:", lat, "Longitude:", lng)
        alert(`Submitted: ${JSON.stringify(updatedFormData)}`);


        // Send data to MongoDB via API route
        const submitResponse = await axios.post("/api/submit", JSON.stringify(updatedFormData), {
          headers: { "Content-Type": "application/json" }
        });
        
        alert("Form submitted successfully!");
      }
      else {
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
        Date Of Arrest:
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        Location Of Arrest:
        <input
          type="text"
          name="Location"
          value={formData.Location}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        If arrested at a probation office or courthouse, what was the reason for being present?
        <input
          type="text"
          name="ReasonProbation"
          value={formData.ReasonProbation || ""}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        How long (in hours) were you/the person arrested held in police custody before ICE arrived?
        <input
          type="number"
          name="HowLongArrested"
          value={formData.HowLongArrested}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      

      <label className="flex flex-col">
        Address:
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          className="p-2 border rounded"
          required // You can change this to false if the field is optional
        />
      </label>

      <label className="flex flex-col">
        Immigration Status at time of Arrest:
        <select
          name= "ImmigrationStatus"
          value={formData.ImmigrationStatus}
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
          name= "MonitoringType"
          value={formData.MonitoringType}
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
    
      <label className="flex flex-col">
      <span className="font-bold">Informant Information</span>
        Name:
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        Email:
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>


      

      <label className="flex flex-col">
      <span className="font-bold">Informant Information</span>
        Phone Number:
        <input
          type= "number"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </label>

      <label className="flex flex-col">
        May we follow up with you?
        <select
          name= "FollowUp"
          value={formData.FollowUp}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select a reason</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
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
