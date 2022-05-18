import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
              <p>{dap.location.coordinates}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default StatsPage;
