import React from 'react';
import CustomerList from './components/CustomerList/CustomerList';
import MostSoldItem from './components/MostSoldItem/MostSoldItem';

const App = () => {
  return (
    <div style={{
      marginBottom: "80px",
    color: "#3f51b5", // Indigo color
    textAlign: "center",
  }}>
      <h1 >Project name ek danna</h1>
      <CustomerList />
    </div>
  );
};

export default App;
