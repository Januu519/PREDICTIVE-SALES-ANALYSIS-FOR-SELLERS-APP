// src/App.js

import React from 'react';
import CustomerList from './components/CustomerList/CustomerList';
import MostSoldItem from './components/MostSoldItem/MostSoldItem';

const App = () => {
  return (
    <div>
      <h1>React Customer Management</h1>
      <CustomerList />
      <MostSoldItem />
    </div>
  );
};

export default App;
