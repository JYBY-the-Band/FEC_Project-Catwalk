import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  filter(value) {
    const check = value.length;
    if (check > 2) {
      const filteredArr = this.state.questions.filter((question) => (
        question.question_body.slice(0, check).toUpperCase() === value.toUpperCase()));
      this.setState({ rendered: filteredArr });
    } else {
      const allQ = this.state.questions
      this.setState({ rendered: allQ });
    }
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <Container><AddQuestion product={this.state.productId} /></Container>
      );
    }
    if (this.state.rendered.length <= this.state.display) {
      return (
        <Container>
          <Row><Search handleSearchInputChange={this.filter} /></Row>
          <Row style={ { maxHeight: 425, overflow: 'auto' } }>
            {this.state.rendered.map(
              (question) => <Question question={question} key={question.question_id} />,
            )}
          </Row>
          <AddQuestion product={this.state.productId} />
        </Container>
      );
    }
    return (
      <Container>
        <Row><Search handleSearchInputChange={this.filter} /></Row>
        <Row style={ { maxHeight: 425, overflow: 'auto' } }>
          {this.state.rendered.slice(0, this.state.display).map(
            (question) => <Question question={question} key={question.question_id} />,
          )}
        </Row>
        <Row>
          <Col>
            <Button variant="secondary" onClick={this.loadQuestions}>
              More Answered Questions
            </Button>
          </Col>
          <Col><AddQuestion product={this.state.productId} /></Col>
        </Row>
      </Container>
    );
  }
}

export default List;
