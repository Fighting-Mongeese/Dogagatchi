/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Leader from './Leader.jsx';

function LeaderBoard(props) {
  const [leaders, setLeaders] = useState([]);
  const [board, setBoard] = useState('smartest');

  function getLeaders() {
    axios.get(`/user/leaderboard/${board}`)
      .then(({ data }) => {
        console.log('gata', data)
        setLeaders(data); // sets leaders to data property from User query obj
      })
      .catch((err) => console.error('getLeaders ERROR (client):', err));
  }

  function changeBoard(type){
    if (type === 'smartest') {
      setBoard('smartest');
      //console.log('smartest');
    } else if (type === 'richest') {
      //console.log('richest');
      setBoard('richest');
    }
  }
  // leader board defaults to smartest parents on rendering
  useEffect(() => {
    getLeaders()
  }, []);

  return (
    <div>
      <h2>Leader Board</h2>
      <Button onClick={() => {
        changeBoard('smartest');
        getLeaders()
      }
    }
      >Smartest Parents</Button>
      <Button onClick={() => {
        changeBoard('richest');
        getLeaders()
        }
      }
        >Richest Parents</Button>
      <Table bordered>
        <thead className="leader-table">
          <tr size="sm">
            <th scope="col" width="100" className="header-name">Username</th>
            <th scope="col" width="100" className="header-name">
              {
            board === 'smartest'
              ? 'Correct Questions'
              : 'Tokens'
              }

            </th>
          </tr>
        </thead>

        {leaders.map((leaderObj) => (
          <Leader
            leader={leaderObj}
            key={leaderObj._id}
            view={board}
            setSearchedUserData={props.setSearchedUserData}
          />
        ))}

      </Table>
    </div>
  );
}

export default LeaderBoard;