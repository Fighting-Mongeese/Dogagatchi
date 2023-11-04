import React from 'react';
import Table from 'react-bootstrap/Table';

function Leader(props) {
  return (

    <tbody>
      <tr>
        <th scope="row" className="leader-info">{`${props.leader.username} `}</th>
        <th scope="row" className="leader-info">{`${props.leader.coinCount} `}</th>
      </tr>
    </tbody>

  );
}
export default Leader;