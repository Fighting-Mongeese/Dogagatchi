import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ProgressBar,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import barkSound from "../../server/barking-123909.mp3";

const bark = new Audio(barkSound);

function Dog(props) {
  const { dogObj } = props;
  const [dog, setDog] = useState(dogObj);
  const [userId, setUserId] = useState("");
  const [coinCount, setCoin] = useState(0);
  const [hungry, setHunger] = useState(true);
  const [happy, setHappy] = useState(false);
  const [feedStatus, setFeedStatus] = useState("");
  const [walkStatus, setWalkStatus] = useState("");
  const [feedTimer, setFeedTimer] = useState(0);
  const [walkTimer, setWalkTimer] = useState(0);
  const [meals, setMeals] = useState(null);

  const hungryRef = useRef(null);
  const happyRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUserId(user._id);
    setCoin(user.coinCount);
    getSignedInUserMeals(user._id);
  }, []);

  const getDog = () => {
    axios
      .get(`/dog/id/${dog._id}`)
      .then(({ data }) => setDog(data))
      .catch((err) => {
        console.error(err);
      });
  };

  const getSignedInUserMeals = (userIdParam) => {
    axios
      .get(`/user/meals/${userIdParam}`)
      .then(({ data }) => {
        const sortedMeals = data.meals.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setMeals(sortedMeals);
      })
      .catch((err) => console.error("get signed in user ERROR", err));
  };

  const feedDog = (dogToFeedObj, mealToFeedObj) => {
    const status = {
      feedDeadline: new Date(
        new Date(dogToFeedObj.feedDeadline).getTime() + 24 * 60 * 60 * 1000
      ),
      walkDeadline: new Date(
        new Date(dogToFeedObj.walkDeadline).getTime() + 12 * 60 * 60 * 1000
      ),
    };

    axios
      .put(`dog/${dogToFeedObj._id}`, { status })
      .then(getDog())
      .then(() => {
        axios
          .put(`user/meals/${userId}`, {
            update: {
              type: "deleteMeal",
            },
            mealToDelete: mealToFeedObj,
          })
          .then(() => getSignedInUserMeals(userId));
      })
      .catch((err) => console.error("feed dog meal ERROR:", err));
  };

  const handleClick = (e) => {
    const status = {};
    if (coinCount < 5) {
      alert("Not enough coins!");
    } else if (e === "feed") {
      setHunger(false);
      hungryRef.current = hungry;
      const feedDeadline = Date.parse(dog.feedDeadline) + 12 * 60 * 60 * 1000;
      status.feedDeadline = feedDeadline;
      setFeedTimer(feedDeadline);
      axios
        .put(`/dog/${dog._id}`, { status, cost: -3 })
        .then(({ data }) => setCoin(data.coinCount))
        .then(() => getDog())
        .catch((err) => {
          console.error(err);
        });
    } else if (e === "walk") {
      setHappy(true);
      happyRef.current = happy;
      const walkDeadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      status.walkDeadline = walkDeadline;
      setWalkTimer(walkDeadline);
      axios
        .put(`/dog/${dog._id}`, { status })
        .then(({ data }) => setCoin(data.coinCount))
        .then(() => getDog())
        .catch((err) => {
          console.error(err);
        });
    } else {
      bark.play();
    }
  };

  useEffect(() => {
    getDog();
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
    <Card className="d-flex flex-row m-4">
      <div
        className="d-flex flex-column justify-content-center align-items-center align-self-center"
        style={{ width: "250px", height: "250px" }}
      >
        <Card.Img
          src={dog.img}
          alt="Sorry, your dog is in another kennel."
          className="p-4"
        />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <Card.Title className="pt-2">{dog.name}</Card.Title>
        <Card.Body className="w-100">
          <div className="dog-status">
            <ProgressBar
              animated={true}
              striped
              variant={feedStatus}
              now={feedTimer}
              label="HUNGER"
              style={{ height: "35px" }}
            />
            {hungry ? (
              <Button
                className="w-100 mx-0"
                variant="info"
                onClick={() => handleClick("feed")}
                title={"pay 3 coins"}
              >
                🍖
              </Button>
            ) : (
              <Button
                className="w-100 mx-0"
                variant="info"
                onClick={() => handleClick("bark")}
              >
                🦴
              </Button>
            )}
            <ProgressBar
              animated={true}
              striped
              variant={walkStatus}
              now={walkTimer}
              label="HAPPINESS"
              style={{ height: "35px" }}
            />

            {happy ? (
              <Button
                className="w-100 mx-0"
                variant="info"
                onClick={() => handleClick("bark")}
              >
                🐶
              </Button>
            ) : (
              <Button
                className="w-100 mx-0"
                variant="info"
                onClick={() => handleClick("walk")}
              >
                🐕‍🦺
              </Button>
            )}
            {meals ? (
              <DropdownButton title="Feed from Pantry!">
                {meals.map((meal) => (
                  <Dropdown.Item
                    key={meal._id}
                    onClick={() => {
                      feedDog(dog, meal);
                    }}
                  >
                    {meal.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Dog;
