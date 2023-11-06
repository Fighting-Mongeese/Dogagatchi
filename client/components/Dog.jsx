import React, { useState, useEffect } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import barkSound from "../../server/barking-123909.mp3";

const bark = new Audio(barkSound);

function Dog(props) {
  const [hungry, setHunger] = useState(true);
  const [happy, setHappy] = useState(false);
  const [feedStatus, setFeedStatus] = useState('');
  const [walkStatus, setWalkStatus] = useState('');

  const { dog } = props;

  const handleClick = (e) => {
    const status = {};
    if (e === "feed") {
      setHunger(false);
      const feedDeadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      status.feedDeadline = feedDeadline;
    } else if (e === "walk") {
      setHappy(true);
      const walkDeadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      status.walkDeadline = walkDeadline;
    } else {
      bark.play();
    }
    axios
      .put(`/kennel/${dog._id}`, { status })
      .then((data) => {
        console.log("dog updated:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const x = setInterval(() => {
      let now = new Date().getTime();

      let feedTimer = dog.feedDeadline - now;
      let walkTimer = dog.walkDeadline - now;

      if (feedTimer < 0) {
        setFeedStatus('success');
      } else if (feedTimer < 50) {
        setFeedStatus('warning');
        setHunger(true);
      } else if (feedTimer < 25) {
        setFeedStatus('danger');
        setHunger(true);
      } else if (feedTimer === 0) {
        alert("dog ran away");
      }

      if (walkTimer < 0) {
        setWalkStatus('success');
      } else if (walkTimer < 50) {
        setWalkStatus('warning');
        setHappy(false);
      } else if (walkTimer < 25) {
        setWalkStatus('danger');
        setHappy(false)
      } else if (walkTimer === 0) {
        alert("dog ran away");
      }
    }, 1000);
  });

  return (
    <div className="dog">
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
              now={40}
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
              now={40}
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
