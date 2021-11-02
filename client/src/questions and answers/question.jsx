import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './answer.jsx';
// keep track of how many answers have been submitted for this question, propbably requires state
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.question_id, // 123123
      body: this.props.question_body, // "sgarcag"
      date: this.props.question_date, // "3015-12-..."
      asker: this.props.asker_name, // "jack"
      helpful: this.props.question_helpfulness, // 7
      reported: this.props.reported, // true
      answers: Object.values(this.props.answers)
      .sort((a, b) => { return a.helpfulness - b.helpfulness })
      .sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA === "SELLER") {
          return 1;
        }
        if (nameB === "SELLER") {
          return -1;
        }
        return 0;
      })
    };
  }

  render() {
    return (
      <div>
        <h3>Q: {this.state.body}</h3>
        <div>Helpful? <a>Yes</a>({this.state.helpful})</div>
      </div>
    );
  }
}

export default Question;
