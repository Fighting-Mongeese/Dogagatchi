import React, { useState, useEffect } from "react";
import { Button, Form, Image, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

function DogShop(props) {
  const { coins, setCoins } = props 
  const [dogShop, setShop] = useState(false);
  const [breeds, setList] = useState([]);
  const [dogView, setDogView] = useState("");
  const [dogName, setDogName] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userId, setUserId] = useState(user._id);

  useEffect(() => {
    setUserId(user._id);
    getDogs()
    axios.get(`/user/${user._id}`).then((userData) => {
      setCoins(userData.data[0].coinCount);
    });
  }, []);

  const getDogs = () => {
    axios
      .get(`/dog/users/${userId}`)
      .then(({ data }) => setList(data.breeds))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSelect = (img) => {
    console.log('hit', img)
    setDogView(img)
  }

  const handleSubmit = () => {
    if (dogView === "" || dogName === "") {
      alert("Fill all fields");
    } else if (coins >= 15) {
      axios
        .post("/dog", {
          name: dogName,
          img: dogView,
          owner: userId,
        })
        .then(({ data }) => {
          setCoins(data.coinCount);
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
    <div>
        
        {dogShop ? "" : <Button onClick={() => setShop(true)}>Purchase a Dog!</Button>}
        {dogShop ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
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
                  <Dropdown>
                    <Dropdown.Toggle style={{width: '300px'}} onSelect={() => {handleSelect(dog)}} variant="succes" id="dropdown-basic">Select Dog</Dropdown.Toggle>
                    <Dropdown.Menu style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {breeds.map((dog, index) => (
                      <Dropdown.Item onClick={() => setDogView(dog)} eventKey={dog} key={index}>
                        <img src={dog} style={{width: '250px'}}/>
                      </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                  </Dropdown>
                {/* <Form.Select onChange={(e) => setDogView(e.target.value)}>
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
                </Form.Select> */}
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
    </div>
  );
}

export default DogShop;
