import React, { useState, useEffect, useRef } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import barkSound from "../../server/barking-123909.mp3";

const bark = new Audio(barkSound);

function Dog(props) {
  const { dogObj, getDogs, setDogs } = props;
  const [dog, setDog] = useState(dogObj);
  const [hungry, setHunger] = useState(true);
  const [happy, setHappy] = useState(false);
  const [feedStatus, setFeedStatus] = useState("");
  const [walkStatus, setWalkStatus] = useState("");
  const [feedTimer, setFeedTimer] = useState(0);
  const [walkTimer, setWalkTimer] = useState(0);
  const hungryRef = useRef(null);
  const happyRef = useRef(null);

  const getDog = () => {
    axios
      .get(`/dog/${dog._id}`)
      .then(({ data }) => setDog(data))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = (e) => {
    const status = {};
    if (e === "feed") {
      setHunger(false);
      hungryRef.current = hungry;
      const feedDeadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      status.feedDeadline = feedDeadline;
    } else if (e === "walk") {
      setHappy(true);
      happyRef.current = happy;
      const walkDeadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      status.walkDeadline = walkDeadline;
    } else {
      bark.play();
    }
    axios.put(`/kennel/${dog._id}`, { status }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    getDog();
    setDog(dog);
    console.log("BARK", `${dog.name}`);
  }, [happy, hungry]);

  useEffect(() => {
    const x = setInterval(() => {
      const now = new Date().getTime();

      const feedTimer = ((Date.parse(dog.feedDeadline) - now) / 86400000) * 100;
      const walkTimer = ((Date.parse(dog.walkDeadline) - now) / 86400000) * 100;

      setFeedTimer(feedTimer);
      setWalkTimer(walkTimer);

      if (feedTimer < 25) {
        setFeedStatus("danger");
        if (hungryRef.current !== true) {
          setHunger(true);
          hungryRef.current = hungry;
        }
      } else if (feedTimer < 50) {
        setFeedStatus("warning");
        if (hungryRef.current !== true) {
          setHunger(true);
          hungryRef.current = hungry;
        }
      } else {
        setFeedStatus("success");
        if (hungryRef.current !== false) {
          setHunger(false);
          hungryRef.current = hungry;
        }
      }

      if (walkTimer < 25) {
        setWalkStatus("danger");
        if (happyRef.current !== false) {
          setHappy(false);
          happyRef.current = happy;
        }
      } else if (walkTimer < 50) {
        setWalkStatus("warning");
        if (happyRef.current !== false) {
          setHappy(false);
          happyRef.current = happy;
        }
      } else {
        setWalkStatus("success");
        if (happyRef.current !== true) {
          setHappy(true);
          happyRef.current = happy;
        }
      }
    }, 1000);
    return () => clearInterval(x);
  }, [happy, hungry, dog]);

  return (
    <div className="dog">
      <div className="dog-name">
        <h3>{dog.name}</h3>
      </div>
      <img
        src={dog.img}
        alt="Sorry, your dog is in another kennel."
        style={{ width: 200 }}
      />
      <div className="dog-status">
        <div>
          <div
            className="hunger-bar"
            style={{ width: "25%" }}
          >
            <ProgressBar
              animated={true}
              striped
              variant={feedStatus}
              now={feedTimer}
              label="HUNGER"
            />
          </div>
          {hungry ? (
            <Button
              variant="info"
              onClick={() => handleClick("feed")}
            >
              🍖
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={() => handleClick("bark")}
            >
              🐶
            </Button>
          )}
        </div>
        <div>
          <div
            className="happy-bar"
            style={{ width: "25%" }}
          >
            <ProgressBar
              animated={true}
              striped
              variant={walkStatus}
              now={walkTimer}
              label="HAPPINESS"
            />
          </div>
          {happy ? (
            <Button
              variant="info"
              onClick={() => handleClick("bark")}
            >
              🐾
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={() => handleClick("walk")}
            >
              🐕‍🦺
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dog;
