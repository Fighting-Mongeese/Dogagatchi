import React, { useState, useEffect } from "react";
import { Row , Col} from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [click, setClick] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userId, setUserId] = useState(user._id);

  const getDogs = () => {
    axios
      .get(`/dog/users/${userId}`)
      .then(({ data }) => {
        setDogs(data.dogsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(getDogs, [userId, click]);

  return (
    <div>
      <div
        style={{
          height: 800,
          overflow: "auto-hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            alignItems: "center",
          }}
        >
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
                          click={click}
                          setClick={setClick}
                        />
                      </div>
                    );
                  })
              : ""}
        </div>
      </div>
    </div>
  );
}

export default Kennel;
