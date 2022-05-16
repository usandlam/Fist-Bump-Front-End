import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const emojiUnicode = require("emoji-unicode");
// const toEmoji = require("emoji-name-map");

const API_URL = "http://localhost:5005/u";

//

const regex = /([\u180B-\u180D\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])/g;

const stripVariationSelectors = function (string) {
  return string.replace(regex, "");
};

//

function UserPage(props) {
  const [fetching, setFetching] = useState(true);

  const { tagId } = useParams();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

        const query = stripVariationSelectors(tagId);

      console.log("Input: ", emojiUnicode(tagId));
      console.log("Input: ", stripVariationSelectors(tagId));

      //   requestBody = { tag: tagId };
      // POST:
      /*
      const tryLookup = await fetch(`${API_URL}/p/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: tagId }), // body: JSON.stringify({ tag: asciiCode }),
      });
      */
      //
      
      const tryLookup = await fetch(`${API_URL}/${query}`);
      //   const tryLookup = await fetch(`${API_URL}/✌️`);

      /*
      // ${tagId}
      const responseData = await fetch(`${API_URL}/${asciiCode}`);

      const earl = await responseData.json();
      console.log(earl);
      console.log(`${API_URL}/${asciiCode}`);
      */
      //   setFoundUser(beer);
      setFetching(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container profile-page">
      {fetching && <p>Loading</p>}
      <p>{tagId}</p>
    </div>
  );
}

export default UserPage;
