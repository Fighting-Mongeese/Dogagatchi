import React from "react";
import axios from "axios";
import Dog from "./Dog.jsx";

function Kennel(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { dogs, setCoins, coins } = props;

  return (
    <div
      style={{
        height: 800,
        overflow: "auto-hidden",
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
                axios
                  .delete(`/dog/${dog._id}`)
                  .then(() => alert(`${dog.name} ran away!`))
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
                    coins={coins}
                    setCoins={setCoins}
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
