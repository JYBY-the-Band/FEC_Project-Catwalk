import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Question from './question.jsx';
import AddQuestion from './questionModal.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 42366, // TODO, get state from product module
      questions: [],
      display: 2,
    };
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/qa/questions/${this.state.productId}`)
      .then(({ data }) => data.results.sort((a, b) => (
        b.question_helpfulness - a.question_helpfulness)))
      .then((results) => this.setState({ questions: results }))
      .catch((err) => console.error(err));
  }

  loadQuestions() {
    const currentState = this.state.display;
    this.setState({ display: currentState + 2 });
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <AddQuestion></AddQuestion>
      );
    }
    if (this.state.questions.length <= this.state.display) {
      return (
        <div>
          {this.state.questions.map((question) =>
            <Question question={question} key={question.question_id} />)}
          <AddQuestion></AddQuestion>
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
        <AddQuestion></AddQuestion>
      </div>
    );
  }
}

export default List;
