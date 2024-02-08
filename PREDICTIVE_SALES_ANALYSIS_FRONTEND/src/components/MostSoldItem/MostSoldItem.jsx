import React, { useState } from "react";
import axios from "axios";

const MostSoldItem = () => {
  const [month, setMonth] = useState("");
  const [mostSoldItem, setMostSoldItem] = useState(null);
  const [error, setError] = useState(null);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const fetchMostSoldItem = () => {
    axios
      .get(`http://localhost:8000/api/predict/${month}`)
      .then((response) => {
        setMostSoldItem(response.data.sales_prediction);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setMostSoldItem(null);
      });
  };

  return (
    <div>
      <h2>Most Sold Item</h2>
      <div>
        <input
          type="number"
          value={month}
          onChange={handleMonthChange}
          placeholder="Enter month (e.g., 1 for January)"
        />
        <button onClick={fetchMostSoldItem}>Get Most Sold Item</button>
      </div>
      {error && <p>{error}</p>}
      {mostSoldItem && <p>Most sold item: {mostSoldItem}</p>}
    </div>
  );
};

export default MostSoldItem;
