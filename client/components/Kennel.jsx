import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";

function Kennel(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { dogs } = props


  return (
    <div style={{
      height: 800,
      overflow: "auto-hidden",
    }}>
      {Array.isArray(dogs) && dogs.length > 0
        ? dogs
          .filter((dog) => {
            const now = new Date().getTime();
            const feed =
              ((Date.parse(dog.feedDeadline) - now) / 86400000) * 100;
            const walk =
              ((Date.parse(dog.walkDeadline) - now) / 86400000) * 100;

            if (walk < 0 || feed < 0) {
              alert(`${dog.name} ran away!`);
              axios
                .delete(`/dog/${dog._id}`)
                .then(getDogs)
                .catch((err) => {
                  console.error(err);
                });

              return false;
            } else {
              return true;
            }
          })
          .map((dog) => {
            return (
              <div
                className="item"
                key={dog._id}
              >
                <Dog
                  dogObj={dog}
                  dogs={dogs}
                // setDogs={setDogs}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Kennel;
