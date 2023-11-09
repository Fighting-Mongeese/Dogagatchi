import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Table, Card, Col, Container, Row } from "react-bootstrap";
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
  const [color, setColor] = useState("#ade3e3")
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);
  const [dogs, setDogs] = useState([]);
  const dogsRef = useRef(dogs);

  const userObj = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
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

    getKennel();
  }, [])
  const getKennel = () => {
    axios
      .get(`/dog/users/${userObj._id}`)
      .then(({ data }) => {
        setDogs(data.dogsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  };


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

            {

              globalRank > 3 ? (<h2>{user.username}'s kennel</h2>) :
            globalRank === 3 ?(
              <div>
                <h2 id="heady">🥉</h2>
               <h2 id="heady" className='shimmer'>{user.username}'s kennel</h2>
              </div>
               ): globalRank === 2 ?(
                <div>
                  <h2 id="heady">🥈</h2>
                 <h2 id="heady" className='shimmer'>{user.username}'s kennel</h2>
                </div>
                 ): (
                  <div>
                    <h2 id="heady">🥇</h2>
                   <h2 id="heady" className='shimmer'>{user.username}'s kennel</h2>
                  </div>
                   )
               }
            <Card
              style={{ backgroundColor: "#4c5f63" }}
            >
      <Card.Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "large",
          backgroundColor: color
        }}
      >
        {{coins} > 1 ? <p>Coin: {coins}</p> : <p>Coins: {coins}</p>}
      </Card.Header>
      
        <Card.Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "large",
          backgroundColor: color
        }}
      >
        Global Rank: #{globalRank}
      </Card.Header>

              <Card.Header
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "large",
                  backgroundColor: color
                }}
              >
                Correct Answers: {correctQuestionCount}
              </Card.Header>

              <Card.Header
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "large",
                  backgroundColor: color
                }}
              >
                Purchasable Dogs: {dogCount}
              </Card.Header>

      <Card.Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "large",
          backgroundColor: color
        }}
      >
        <p>Owned Dogs: {ownDogs}</p>
      </Card.Header>
            </Card>

          </div>


          <Achievements
            user={user}
            className="user-achievements"
          />
        </Col>

        <Col xs={8}>
        <div className="dogs">
          <Kennel className="user-kennel" 
          dogs={dogs}
          getKennel={getKennel}
          />
        </div>
       
        </Col>
      </Row>
      
    </Container>
  );
}

export default User;
