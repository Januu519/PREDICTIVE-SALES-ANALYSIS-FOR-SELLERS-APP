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
        alert(response.data.message);
        // Optionally, you can fetch the updated customer list after adding a new customer
      })
      .catch((error) => alert("Error adding customer:", error));
  };

  return (
    <form
      style={{ textAlign: "center", margin: "20px" }}
      onSubmit={handleAddCustomer}
    >
      <input
      style={{
        marginRight: "10px",
        height: 40,
        width: 200,
        borderRadius: 100,
        padding: "0px 20px",
        border: "1px solid gray",
      }}
        type="text"
        name="name"
        placeholder="Name"
        value={newCustomer.name}
        onChange={handleInputChange}
        required
      />
      <input
      style={{
        marginRight: "10px",
        height: 40,
        width: 200,
        borderRadius: 100,
        padding: "0px 20px",
        border: "1px solid gray",
      }}
        type="email"
        name="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={handleInputChange}
        required
      />
      <button style={{
            height: 40,
            width: 200,
            borderRadius: 100,
            padding: "0px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "1px solid gray",
          }} type="submit">
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
