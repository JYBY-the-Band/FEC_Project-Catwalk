import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Question from './question.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: 42366, // TODO, get state from product module
      questions: [],
      display: 4
    };
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/qa/questions/${this.state.product}`)
      .then(({ data }) => this.setState({ questions: data.results }))
      .then(this.state.questions.sort((a, b) => { return a.question_helpfulness - b.question_helpfulness }))
      .catch(err=>console.error(err));
  }

  loadQuestions() {
    this.setState({ display: this.state.display + 2 });
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <Button variant="secondary">Add Question</Button>
      );
    }
    if (this.state.questions.length <= this.state.display) {
      return (
        <div>
          {this.state.questions.map((question) =>
            <Question question={question} key={question.question_id} />)}
        </div>
      );
    }
    return (
      <div>
        {this.state.questions.slice(0, this.state.display).map((question) =>
          <Question question={question} key={question.question_id} />)}
        <Button variant="secondary" onClick={this.loadQuestions}>
          More Answered Questions
        </Button>
      </div>
    );
  }
}

export default List;
