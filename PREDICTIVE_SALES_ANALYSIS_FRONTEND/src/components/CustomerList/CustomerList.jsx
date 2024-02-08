// src/components/CustomerList/CustomerList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerForm from "./CustomerForm";
import MostSoldItem from "../MostSoldItem/MostSoldItem";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [mostSoldItem, setMostSoldItem] = useState(null);

  useEffect(() => {
    // Fetch customers from Flask backend
    axios
      .get("http://localhost:8000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));

    // Fetch most sold item from Flask backend
    // axios
    //   .get("http://localhost:8000/api/most-sold-item")
    //   .then((response) => setMostSoldItem(response.data))
    //   .catch((error) => console.error("Error fetching most sold item:", error));
  }, []);

  const handleDeleteCustomer = (customerId) => {
    // Delete customer via Flask backend
    axios
      .delete(`http://localhost:5000/api/customers/${customerId}`)
      .then((response) => {
        console.log(response.data.message);
        setCustomers(
          customers.filter((customer) => customer.id !== customerId)
        );
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Customer List</h2>
      <CustomerForm />
      <ul style={styles.list}>
        {customers.map((customer) => (
          <li key={customer.id} style={styles.item}>
            <span style={styles.customerName}>{customer.name}</span> -{" "}
            <span style={styles.customerEmail}>{customer.email}</span>
            <button
              style={styles.button}
              onClick={() => handleDeleteCustomer(customer.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 style={styles.header}>Most Sold Item</h2>
      {/* {mostSoldItem && (
        <div style={styles.mostSoldContainer}>
          <p style={styles.mostSoldText}>
            <strong>Name:</strong> {mostSoldItem.name}
          </p>
          <p style={styles.mostSoldText}>
            <strong>Email:</strong> {mostSoldItem.email}
          </p>
          <p style={styles.mostSoldText}>
            <strong>Total Purchases:</strong> {mostSoldItem.totalPurchases}
          </p>
        </div>
      )} */}
      <MostSoldItem />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
  },
  header: {
    marginBottom: "20px",
    color: "#3f51b5", // Indigo color
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    background: "#e0f7fa", // Light blue background
  },
  customerName: {
    color: "#388e3c", // Green color
  },
  customerEmail: {
    color: "#d32f2f", // Red color
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    background: "#ffeb3b", // Yellow background
    color: "#333", // Dark text color
    border: "none",
    cursor: "pointer",
  },
  mostSoldContainer: {
    border: "1px solid #ddd",
    padding: "10px",
    background: "#ffccbc", // Light orange background
  },
  mostSoldText: {
    marginBottom: "10px",
  },
};

export default CustomerList;
