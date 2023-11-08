import React, { useState, useEffect } from "react";
import { Button, Container, Form, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";
import Pantry from './Pantry.jsx';

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [coinCount, setCoin] = useState(0);
  const [breeds, setList] = useState([]);
  const [dogView, setDogView] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogShop, setShop] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUserId(user._id);
    setCoin(user.coinCount);
  }, []);

  const getDogs = () => {
    axios
      .get(`/kennel/${userId}`)
      .then(({ data }) => {
        console.log(data.dogsArr);
        setDogs(data.dogsArr);
        setList(data.breeds);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(getDogs, [userId]);

  const handleSubmit = () => {
    if (dogView === "" || dogName === "") {
      alert("Fill all fields");
    } else if (coinCount > 15) {
      axios
        .post("/kennel", {
          name: dogName,
          img: dogView,
          owner: userId,
        })
        .then(({ data }) => {
          setCoin(data.coinCount);
        });
      getDogs();
      setDogs([]);
      setList([]);
    } else {
      alert("Not enough coins!");
    }
    setShop(false);
  };

  return (
    <Container>
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dogShop ? (
            ""
          ) : (
            <Button onClick={() => setShop(true)}>add dog</Button>
          )}
          {dogShop ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                padding: "10px",
              }}
            >
              <Image
                src={dogView}
                alt=""
                rounded
                style={{ width: 200 }}
              />
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Dog name"
                    onChange={(e) => setDogName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Dog</Form.Label>
                  <Form.Select onChange={(e) => setDogView(e.target.value)}>
                    <option>Choose Dog</option>
                    {breeds.map((dog, index) => {
                      return (
                        <option
                          key={index}
                          value={dog}
                        >
                          {dog}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>15 coins:</Form.Label>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Buy Dog
                  </Button>
                </Form.Group>
              </Form>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row
        style={{
          height: 800,
          overflow: "auto-hidden",
        }}
      >
        <Col
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            flexDirection: "row",
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
                      .delete(`/kennel/${dog._id}`)
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
                    <Dog
                      key={dog._id}
                      dogObj={dog}
                      setCoin={setCoin}
                    />
                  );
                })
            : ""}
        </Col>
      </Row>
    </Container>
  );
}

export default Kennel;
