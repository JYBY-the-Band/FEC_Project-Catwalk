import React from 'react';
import ReactDOM from 'react-dom';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id, // 123123
      body, // "srgarg"
      date, // "2020-01-..."
      answerer_name, // "Seller"
      helpfulness, // 4
      photos // []
    };
  }

  render() {
    return (
      <div>
        <h4> A: {this.state.body}</h4>
      </div>
    );
  }
}

export default Answer;