import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Leader(props) {
  function seeLeader(){
    axios.get(`/searchUser/${props.leader.username}`)
    .then(({ data }) => props.setSearchedUserData(data))
    .catch((err) =>{
      console.error('search user error (client)', err)
      props.setSearchedUserData('not found')
    })
  }
  return (
    <tbody >
      <tr stripped>
        <th scope="row" className="leader-username"
        onClick={() => { seeLeader() }}
        >{`${props.leader.username} `}</th>
        <th scope="row" className="leader-info">
          {
          props.view === 'smartest'
            ? `${props.leader.questionCount} quest`
            : `${props.leader.coinCount} coin`
          }

        </th>

      </tr>
    </tbody>

  );
}
export default Leader;
