import React from 'react';
import Answer from './answer.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount() {
    const answerArr = Object.values(this.props.question.answers);
    answerArr.sort((a, b) => { return b.helpfulness - a.helpfulness });
    answerArr.sort((a, b) => {
      const nameA = a.answerer_name.toUpperCase();
      let c = 0;
      const nameB = b.answerer_name.toUpperCase();
      let d = 0;
      if (nameA === 'SELLER') {
        c = 1;
      }
      if (nameB === 'SELLER') {
        d = 1;
      }
      return d - c;
    });
    this.setState({ answers: answerArr });
  }

  render() {
    return (
      <div>
        <h3>Q: {this.props.question.question_body}</h3>
        <div>
          <span> Helpful? <a> Yes </a> ({this.props.question.question_helpfulness}) </span>
          <span> Add Answer </span>
        </div>
        <div>
          <h3>A: </h3>
          {this.state.answers.map((answer) => <Answer answer={answer} key={answer.id} />)}
        </div>
      </div>
    );
  }
}

export default Question;
