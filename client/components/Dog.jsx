import React from 'react';
import axios from 'axios';

class Dog extends React.Component {
  constructor() {
    super();

    this.state = {
      hungry: false,
      needsWalk: false,
    };
  }

  handleClick(event) {
    const { hungry, needsWalk } = this.state;
    if (event === 'feed') {
      this.setState({
        hungry: false,
      });
    } else {
      this.setState({
        needsWalk: false,
      });
    }
  }

  render() {
    const { hungry, needsWalk } = this.state;

    return (
      <div className="dog">
        <img src="https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190801_112134.jpg" alt="Sorry, your dog is in another kennel." style={{ width: 200 }} />
        <div className="dog-status">
          <div>
            hungry:
            {' '}
            {hungry}
            <button
              type="button"
              onClick={() => this.handleClick('feed')}
            >
              Feed
            </button>
          </div>
          <div>
            needsWalk:
            {' '}
            {needsWalk}
            <button
              type="button"
              onClick={() => this.handleClick('walk')}
            >
              Walk
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dog;
