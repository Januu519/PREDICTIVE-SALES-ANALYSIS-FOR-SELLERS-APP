// src/components/CustomerList/CustomerForm.js

import React, { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();

    // Add customer via Flask backend
    axios
      .post("http://localhost:8000/api/customers", newCustomer)
      .then((response) => {
        console.log(response.data.message);
        // Optionally, you can fetch the updated customer list after adding a new customer
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  return (
    <form
      style={{ textAlign: "center", margin: "20px" }}
      onSubmit={handleAddCustomer}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newCustomer.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={handleInputChange}
        required
      />
      <button style={{ padding: "10px", marginLeft: "10px" }} type="submit">
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
