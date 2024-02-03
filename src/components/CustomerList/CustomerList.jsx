// src/components/CustomerList/CustomerList.js

import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [mostSoldItem, setMostSoldItem] = useState(null);

  useEffect(() => {
    // Fetch customers from your API or database
    // Update the customers state
    // Example: fetch('/api/customers').then(response => response.json()).then(data => setCustomers(data));

    // For demo purposes, let's assume we have some sample data
    const sampleCustomers = [
      { id: 1, name: 'Customer 1', email: 'customer1@example.com', totalPurchases: 10 },
      { id: 2, name: 'Customer 2', email: 'customer2@example.com', totalPurchases: 15 },
      // Add more sample data as needed
    ];

    setCustomers(sampleCustomers);

    // Find the most sold item from the customer list
    const mostSold = sampleCustomers.reduce((acc, customer) => {
      return customer.totalPurchases > acc.totalPurchases ? customer : acc;
    }, sampleCustomers[0]);

    setMostSoldItem(mostSold);
  }, []);

  // Handle customer deletion
  const handleDeleteCustomer = (customerId) => {
    // Implement the logic to delete a customer
    // Example: fetch(/api/customers/${customerId}, { method: 'DELETE' });

    // For demo purposes, let's filter out the customer locally
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  return (
    <div>
      <h2>Customer List</h2>
      <CustomerForm />
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.email}
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Most Sold Item</h2>
      {mostSoldItem && (
        <div>
          <p>Name: {mostSoldItem.name}</p>
          <p>Email: {mostSoldItem.email}</p>
          <p>Total Purchases: {mostSoldItem.totalPurchases}</p>
        </div>
      )}
    </div>
  );
};



export default CustomerList;