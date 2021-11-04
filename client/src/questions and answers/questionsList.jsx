import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Question from './question.jsx';
import AddQuestion from './questionModal.jsx';
import Search from './search.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 42366, // TODO, get state from product module
      questions: [],
      rendered: [],
      display: 2,
    };
    this.loadQuestions = this.loadQuestions.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/qa/questions/${this.state.productId}`)
      .then(({ data }) => data.results.sort((a, b) => (
        b.question_helpfulness - a.question_helpfulness)))
      .then((results) => this.setState({ questions: results, rendered: results }))
      .catch((err) => console.error(err));
  }

  loadQuestions() {
    const currentState = this.state.display;
    this.setState({ display: currentState + 2 });
  }

  filter(value) { // TODO filter displayed questions based on search value
    if (value.length > 3) {
      value // thing to filter by
      this.state.questions[0].question_body // array of objects filtered by question body
      // this.setState({ rendered: filteredArr });
    } else {
      const allQ = this.state.questions
      this.setState({ rendered: allQ });
    }
  }

  render() {
    if (this.state.rendered.length === 0) {
      return (
        <AddQuestion />
      );
    }
    if (this.state.rendered.length <= this.state.display) {
      return (
        <div>
          <Search handleSearchInputChange={this.filter} />
          {this.state.rendered.map(
            (question) => <Question question={question} key={question.question_id} />,
          )}
          <AddQuestion />
        </div>
      );
    }
    return (
      <div>
        <Search handleSearchInputChange={this.filter} />
        {this.state.rendered.slice(0, this.state.display).map(
          (question) => <Question question={question} key={question.question_id} />,
        )}
        <Button variant="secondary" onClick={this.loadQuestions}>
          More Answered Questions
        </Button>
        <AddQuestion />
      </div>
    );
  }
}

export default List;
