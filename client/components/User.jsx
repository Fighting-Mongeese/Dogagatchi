import React from 'react';

function User(props) {
return(
  <div>
    {props.user === 'not found'
      ? 'Sorry! That user does not exist!'
      : <div>
          <h2>{props.user.username}</h2>
          <h4>Stats:</h4>
            <ul>
              <li>Total Number of Correct Question: {props.user.questionCount}</li>
              <li>Total Number of Tokens: {props.user.coinCount}</li>
              <li>Total Number of Pups: {props.user.dogCount}</li>
            </ul>
        </div>
    }
  </div>
)
}

export default User;