import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Table, Card, Col, Container, Row, Button, Modal } from "react-bootstrap";
import NavBar from './Navbar.jsx';
import DogShop from './DogShop.jsx'
import Achievements from './Achievements.jsx';
import Kennel from './Kennel.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

function User(props) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState("");
  const [globalRank, setGlobalRank] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [ownDogs, setOwnDogs] = useState(0);
  const [coins, setCoins] = useState(0);
  const [color, setColor] = useState("#ade3e3");
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);
  const [dogs, setDogs] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

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

    setPage();
    axios.get(`/dog/users/${userObj._id}`).then((dogArr) => {
      setOwnDogs(dogArr.data.dogsArr.length);
    });

    getKennel();
  }, [coins]);

  const setPage = () => {
    axios.get(`/user/${userObj._id}`).then((user) => {
      setUser(user.data[0]);
      setCorrectQuestionCount(user.data[0].questionCount);
      setDogCount(user.data[0].dogCount);
      setCoins(user.data[0].coinCount);
    });
  };

  const getKennel = () => {
    axios
      .get(`/dog/users/${userObj._id}`)
      .then(({ data }) => {
        setDogs(data.dogsArr);
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteUser = () => {
    axios.delete(`/user/${userObj._id}`)
    .then(({ data }) => {
      console.log(data)
      navigate('/deleted')
    })
    .then(() => setTimeout(() => navigate('/'), 4000))
    .catch((err) => console.error('delete user ERROR', err))
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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
          <DogShop setCoins={setCoins} />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <div className="user-stats">

            {
              loading ? (<h1></h1>):

              globalRank === 1 ? (
                <div>
                  <h2 id="heady">🥇</h2>
                 <h2 id="heady" className='shimmer'>{user.username}'s Kennel</h2>
                </div>
                 ) :
            globalRank === 3 ?(
              <div>
                <h2 id="heady">🥉</h2>
                <h2
                  id="heady"
                  className="shimmer"
                >
                  {user.username}'s Kennel
                </h2>
              </div>
               ): globalRank === 2 ?(
                <div>
                  <h1 id="heady">🥈</h1>
                 <h1 id="heady" className='shimmer'>{user.username}'s Kennel</h1>
                </div>
                 ): (
                  <div>
                    <h1>{user.username}'s Kennel</h1>
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
                  backgroundColor: color,
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
                  backgroundColor: color,
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
                  backgroundColor: color,
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

          {loading ? (<h1>Fetching...</h1>):
            dogs.length === 0 ? (<h1>Start playing Pooch Picker to earn dogs to adopt!</h1>) : (
        <div className="dogs">
          <Kennel className="user-kennel" 
          dogs={dogs}
          getKennel={getKennel}
          setCoins={setCoins}
          />
        </div>)
       }
        </Col>
      </Row>
      <Row>
        <Col>
        <Button
            variant='danger'
            onClick={() => setShowModal(true)}
            >Delete Account
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`WARNING! Are you sure you want to delete ${userObj.username}'s account?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`By deleting your account, you will lose ${coins} coins and ${ownDogs} dogs. If you are PAW-sitive you want to delete your account, click delete.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            DELETE
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            NEVERMIND
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default User;
