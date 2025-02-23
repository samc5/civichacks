"use client";

import { useState } from "react";

export default function UnverifiedFormComponent() {
  const [formData, setFormData] = useState({
    Date: "",
    Location: "",
    Latitude: 0,
    Longitude: 0,
    Address: "",
    HowICE: "",
    synthetic: false,  
    realLocation: true,
    unverified: true
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

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Submit
      </button>

    </form>
  );
}
