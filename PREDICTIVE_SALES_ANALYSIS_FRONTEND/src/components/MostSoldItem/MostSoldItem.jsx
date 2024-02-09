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
      <h2
        style={{
          textAlign: "center",
          color: "blue",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: 80,
        }}
      >
        Most Sold Item
      </h2>
      <div>
        <input
          style={{
            marginRight: "10px",
            height: 40,
            width: 200,
            borderRadius: 100,
            padding: "0px 20px",
            border: "1px solid gray",
          }}
          type="number"
          value={month}
          onChange={handleMonthChange}
          placeholder="Enter month (e.g., 1 for January)"
        />
        <button
          style={{
            height: 40,
            width: 200,
            borderRadius: 100,
            padding: "0px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "1px solid gray",
          }}
          onClick={fetchMostSoldItem}
        >
          Get Most Sold Item
        </button>
      </div>
      {error && <p>{error}</p>}
      {mostSoldItem && <p>Most sold item: {mostSoldItem}</p>}
    </div>
  );
};

export default MostSoldItem;
