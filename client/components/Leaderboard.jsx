/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Container, Col, Row } from 'react-bootstrap';
import Leader from './Leader.jsx';

function LeaderBoard(props) {
  const [leaders, setLeaders] = useState([]);
  const [board, setBoard] = useState('smartest');
  
  function getLeaders(type) {
    axios.get(`/user/leaderboard/${type}`)
      .then(({ data }) => {
        const topTen = data.slice(0,10)
        setLeaders(topTen); // sets leaders to data property from User query obj
      })
      .catch((err) => console.error('getLeaders ERROR (client):', err));
  }

  function changeBoard(type){
    // console.log('board', board)
    // console.log('type', type)

    return new Promise((resolve, reject) => {
      if (type === 'smartest') {
        setBoard('smartest');
        resolve('smartest')
      } else if (type === 'richest') {
        setBoard('richest');
        resolve('richest')
      }
    })
  }
  // leader board defaults to smartest parents on rendering
  useEffect(() => {
    getLeaders('smartest')
  }, []);

  return (
    <Container >
      <Row>
        <Col xs={1}>

        </Col>
        <Col xs={10} className='d-flex justify-content-start flex-column align-items-center'>
          <h3 className="text_shadows" id="top-dogs">🏆Top Dogs🏆</h3>
          <div className='d-flex flex-row my-2'>
            <Button className='leader-button-smartest' onClick={() => {
              changeBoard('smartest')
              .then((type) => getLeaders(type));
            }
            }
            >Smartest Dogs</Button>
            <Button className='leader-button-richest' onClick={() => {
              changeBoard('richest')
              .then((type) => getLeaders(type))
            }
            }
            >Richest Dogs</Button>
          </div>
          <Table bordered >
            <thead className="leader-table">
              <tr size="sm">
                <th scope="col" className="leader-header">Place</th>
                <th scope="col" className="leader-header">Username</th>
                <th scope="col" className="leader-header">
                  {
                    board === 'smartest'
                      ? 'Correct Questions'
                      : 'Current Coins'
                  }

                </th>
              </tr>
            </thead>

            {leaders.map((leaderObj, i) => (
              <Leader
              place={i + 1}
                leader={leaderObj}
                key={leaderObj._id}
                view={board}
                setSearchedUserData={props.setSearchedUserData}
              />
            ))}

          </Table>

        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
}

export default LeaderBoard;