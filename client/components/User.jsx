import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import NavBar from './Navbar.jsx';
import DogShop from './DogShop.jsx'
import Achievements from './Achievements.jsx';
import Kennel from './Kennel.jsx';
import Pantry from './Pantry.jsx'
import axios from 'axios'

function User(props) {
  const [user, setUser] = useState("");
  const [globalRank, setGlobalRank] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [ownDogs, setOwnDogs] = useState(0);
  const [coins, setCoins] = useState(0);
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);

  useEffect(() => {
    const userObj = JSON.parse(sessionStorage.getItem("user"));
    axios
      .get("/user/leaderboard/smartest")
      .then(({ data }) => {
        const index = data.findIndex(
          (userData) => userData._id === userObj._id
        );
        setGlobalRank(index + 1);
      })
      .catch((err) => console.error("getLeaders ERROR (client):", err));

    axios.get(`/user/${userObj._id}`)
      .then((user) => {
        setUser(user.data[0])
        setCorrectQuestionCount(user.data[0].questionCount)
        setDogCount(user.data[0].dogCount)
        setCoins(user.data[0].coinCount)
      })
      axios.get(`/dog/users/${userObj._id}`)
      .then((dogArr) => {
        console.log('goo', dogArr.data.dogsArr)
        setOwnDogs(dogArr.data.dogsArr.length)

      })
  }, [])



  return (
    <Container>

      <Row  >
        <Col style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
          <DogShop />
        </Col>
      </Row>
      <Row >
        <Col xs={4}>
          <div className="user-stats">
            <Card>

            <Card.Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        {user.username}
      </Card.Header>
              <h3>Stats</h3>
            <p>Coins: {coins}</p>

            <p>Global Rank: #{globalRank}</p>

            <p>Correct Answers: {correctQuestionCount}</p>

            <p>Purchasable Dogs: {dogCount}</p>

            <p>Owned Dogs: {ownDogs}</p>
            </Card>
            
          </div>
          <Achievements
            user={user}
            className="user-achievements"
          />
        </Col>

        <Col xs={8}>
        <div className="dogs">
          <Kennel className="user-kennel" />
        </div>
        <div className="pantry">
        <Pantry />
      </div> 
        </Col>



      </Row>





       {/* <div className="user-main-div">
        <div className="user-stats-container">
        </div>
        
        
      </div> */}
      
    </Container>
  );
}

export default User;
