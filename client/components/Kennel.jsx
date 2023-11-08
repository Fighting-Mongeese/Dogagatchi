import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import Dog from "./Dog.jsx";
import Pantry from './Pantry.jsx';

function Kennel() {
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [breeds, setList] = useState([]);
  const [dogView, setDogView] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogShop, setShop] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUserId(user._id);
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
    axios
      .post("/kennel", {
        name: dogName,
        img: dogView,
        owner: userId,
      });
      getDogs();
      setDogs([])
      setList([])
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
          <Button onClick={() => setShop(true)}>add dog</Button>
          {dogShop ? (
            <>
              <Image
                src={dogView}
                alt=""
                rounded
                style={{ width: 200 }}
              />
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
                  <option>Open this select menu</option>
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
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Buy Dog
                </Button>
              </Form.Group>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
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
                      getDogs={getDogs}
                      setDogs={setDogs}
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
