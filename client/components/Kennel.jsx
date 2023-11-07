import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState("");

  const fillKennel = () =>
    new Promise((resolve, reject) => {
      axios
        .get(`/kennel/${userId}`)
        .then(({ data }) => {
          setDogs(data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });

const addDog = () => {
  axios.get(`/user/${userId}`)
  .then(({data}) => {
    //get breeds data
    console.log(data.breeds);
  })
  .catch((err) => console.error(err))
}

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
      />
      <div>
        <Button onClick={() => fillKennel()}>fill kennel</Button>
      </div>

      <div>
        <Button onClick={() => addDog()}>add dog</Button>
      </div>
      {dogs
        .filter((dog) => {
          const now = new Date().getTime();

          const feed = ((Date.parse(dog.feedDeadline) - now) / 86400000) * 100;
          const walk = ((Date.parse(dog.walkDeadline) - now) / 86400000) * 100;

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
        })}
    </div>
  );
}

export default Kennel;
