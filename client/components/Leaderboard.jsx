/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Leader from './Leader.jsx';

function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);

  function getLeaders(type) {
    axios.get(`/leaderboard/${type}`)
      .then(({ data }) => {
        setLeaders(data); // sets leaders to data property from User query obj
      })
      .catch((err) => console.error('getLeaders ERROR (client):', err));
  }

  // leader board defaults to smartest parents on rendering
  useEffect(() => {
    console.log('passesesh' ,sessionStorage.getItem('username'))
    if (leaders.length === 0) { getLeaders('smartest'); }
  });

  return (
    <div>
      <h2>Leader Board</h2>
      <Button onClick={() => getLeaders('smartest')}>Smartest Parents</Button>
      <Button onClick={() => getLeaders('richest')}>Richest Parents</Button>
      <Table className="table">
        <thead className="leader-table">
          <tr>
            <th scope="col" className="header-name">Username</th>
            <th scope="col" className="header-name"># Correct Q</th>
          </tr>
        </thead>

        {/* {leaders.map((leaderObj) => (
          <Leader
            leader={leaderObj}
            key={leaderObj._id}
          />
        ))} */}

      </Table>
    </div>
  );
}

export default LeaderBoard;