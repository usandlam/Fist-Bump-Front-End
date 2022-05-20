import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    color: "rgb(255, 255, 255)",
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Your Daps by month",
      data: [1, 4, 5, 0, 10, 11, 15],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  ],
};

const API_URL = "http://localhost:5005/api/daps";

function StatsPage(props) {
  const [fetching, setFetching] = useState(true);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundDaps, setFoundDaps] = useState([]);

  // eslint-disable-next-line no-undef
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      //   const id = user.userId;
      const tryLookup = await fetch(`${API_URL}/mine`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      const response = await tryLookup.json();
      setFetching(false);
      setFoundDaps(response);
    };
    fetchData();
  }, []);

  return (
    <div className="container stats-page" id="stats-page">
      {fetching ? (
        <p>Loading...</p>
      ) : (
        foundDaps.map((dap) => {
          return (
            <div key={dap._id}>
              <p>
                {dap.location.type}: {dap.location.coordinates[0]},{" "}
                {dap.location.coordinates[1]}
              </p>
            </div>
          );
        })
      )}
      <div className="chart" style={{ backgroundColor: "white" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default StatsPage;
