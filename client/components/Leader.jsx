import React from 'react';
import axios from 'axios';

function Leader(props) {
  function seeLeader(){
    axios.get(`/searchUser/${props.leader.username}`)
    .then(( {data} ) => console.log('see user page:', data) )
    .catch((err) =>{
      console.error('search user error (client)', err)
    })
  }
  return (
    <tbody >
      <tr >
        <th className='leader-info' scope="row">{props.place}</th>
        <th scope="row" className="leader-info"
        >{`${props.leader.username} `}</th>
        <th scope="row" className="leader-info">
          {
          props.view === 'smartest'
            ? `${props.leader.questionCount}`
            : `${props.leader.coinCount}`
          }

        </th>

      </tr>
    </tbody>

  );
}
export default Leader;