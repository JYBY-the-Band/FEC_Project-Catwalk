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
      user: '', // TODO, figure out where user info comes from
      productId: 0,
      questions: [],
      rendered: [],
      display: 2,
    };
    this.loadQuestions = this.loadQuestions.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    const { user, productId } = this.props;
    axios.get(`/api/qa/questions/${productId}`)
      .then(({ data }) => data.results.sort((a, b) => (
        b.question_helpfulness - a.question_helpfulness)))
      .then((results) => this.setState({
        user, // assuming user will be passed as a prop
        productId,
        questions: results,
        rendered: results,
      }))
      .catch((err) => console.error(err));
  }

  loadQuestions() {
    const { display } = this.state;
    this.setState({ display: display + 2 });
  }

  filter(value) {
    const { questions } = this.state;
    const check = value.length;
    if (check > 2) {
      const filteredArr = questions.filter((question) => (
        question.question_body.slice(0, check).toUpperCase() === value.toUpperCase()));
      this.setState({ rendered: filteredArr });
    } else {
      this.setState({ rendered: questions });
    }
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { questions, productId, display, rendered, user } = this.state;
    const {productName} = this.props;
    if (questions.length === 0) {
      return (
        <Container>
          <AddQuestion productId={productId} productName={productName} />
        </Container>
      );
    }
    if (rendered.length <= display) {
      return (
        <Container>
          <Row><Search handleSearchInputChange={this.filter} /></Row>
          <Row style={{ maxHeight: 425, overflow: 'auto' }}>
            {rendered.map((question) => (
              <Question
                user={user}
                productId={productId}
                productName={productName}
                question={question}
                key={question.question_id}
              />
            ))}
          </Row>
          <AddQuestion productId={productId} productName={productName} />
        </Container>
      );
    }
    return (
      <Container>
        <Row><Search handleSearchInputChange={this.filter} /></Row>
        <Row style={{ maxHeight: 425, overflow: 'auto' }}>
          {rendered.slice(0, display).map((question) => (
            <Question
              user={user}
              productId={productId}
              productName={productName}
              question={question}
              key={question.question_id}
            />
          ))}
        </Row>
        <Row>
          <Col>
            <Button variant="secondary" onClick={this.loadQuestions}>
              More Answered Questions
            </Button>
          </Col>
          <Col><AddQuestion productId={productId} productName={productName} /></Col>
        </Row>
      </Container>
    );
  }
}

export default List;
