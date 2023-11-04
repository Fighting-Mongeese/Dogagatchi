import React, { useState, useEffect } from 'react';
// write axios 
function Achievements() {
  // console.log('props', props);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }); // use effect will run once things loads 
  // anything from your client is going to go through your server. Let the server do the listing
  return (
    <div>
      <h3>Achievement Test Rendering</h3>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me for achievements</button>
    </div>
  );
}

export default Achievements;
