import React from 'react';
import Button from 'react-bootstrap/Button';
import Quiz from './Quiz.jsx';

import '../app.css'; // imports css to apply to all components in App component

function App() {
  return (
    <div>
      <div>APP RENDERING</div>
      <Button>Bootstrap Button</Button>
      <Quiz />
    </div>
  );
}

export default App;
