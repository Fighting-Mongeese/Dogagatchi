import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [coins, setUserCoins] = useState(0);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user._id)
    setUserId(user._id.trim());
    setUserCoins(user.coinCount);

    axios
      .get(`/kennel/${userId}`)
      .then(({ data }) => {
        console.log(data)
        setDogs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addDog = () => {
    axios
      .get(`/user/${userId}`)
      .then(({ data }) => {
        //get breeds data
        console.log(data.breeds);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <Button onClick={() => addDog()}>add dog</Button>
      </div>

      <div>
        {dogs.length > 0 ? (
          dogs
            .filter((dog) => {
              const now = new Date().getTime();

              const feed =
                ((Date.parse(dog.feedDeadline) - now) / 86400000) * 100;
              const walk =
                ((Date.parse(dog.walkDeadline) - now) / 86400000) * 100;

              if (walk < 0 || feed < 0) {
                alert(`${dog.name} ran away!`);
                axios
                  .delete(`/kennel/${dog._id}`)
                  .then(({ data }) => {
                    axios
                      .get(`/kennel/${data.owner}`)
                      .then(({ data }) => setDogs(data))
                      .catch((err) => {
                        console.error(err);
                      });
                  })
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
                <Dog
                  dog={dog}
                  key={dog._id}
                />
              );
            })
        ) : (
          <h1>NO DOGS</h1>
        )}
      </div>
    </div>
  );
}

export default Kennel;
