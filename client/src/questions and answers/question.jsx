import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Answer from './answer.jsx';
import AddAnswer from './answerModal.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      toggle: true,
    };
    this.accordHandler = this.accordHandler.bind(this);
    this.helpfulHandler = this.helpfulHandler.bind(this);
  }

  componentDidMount() {
    const answerArr = Object.values(this.props.question.answers)
      .sort((a, b) => (b.helpfulness - a.helpfulness))
      .sort((a, b) => {
        const nameA = a.answerer_name.toUpperCase();
        let c = 0;
        const nameB = b.answerer_name.toUpperCase();
        let d = 0;
        if (nameA === 'SELLER') { c = 1; }
        if (nameB === 'SELLER') { d = 1; }
        return d - c;
      });
    this.setState({ answers: answerArr });
  }// TODO set helpful to true if is true in database for curretent user

  accordHandler() {
    this.setState((prevState) => ({ toggle: !prevState.toggle }));
  }

  helpfulHandler() {
    if (!this.state.helpful) {
      this.setState({ helpful: true });// TODO Update helpful stat in database for current user
    }
  }

  render() {
    if (this.state.answers.length > 2) {
      return (
        <Container>
          <Row>
            <Col>
              <h3>Q: {this.props.question.question_body}</h3>
            </Col>
            <Col sm="auto">
              <span> Helpful? </span>
              <Button variant="link" onClick={this.helpfulHandler}>
                {`Yes (${this.props.question.question_helpfulness})`}
              </Button>
            </Col>
            <Col sm={2}>
              <AddAnswer question_id={this.props.question.question_id} />
            </Col>
          </Row>
          <Row>
            <h3>A: </h3>
          </Row>
          <Row style={ { paddingLeft: 50 } }>
            {this.state.answers.slice(0, 2).map((answer) => (
              <Answer answer={answer} key={answer.id} />))}
          </Row>
          <Row>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Body>
                  {this.state.answers.slice(2).map((answer) => (
                    <Answer answer={answer} key={answer.id} />))}
                </Accordion.Body>
                <Accordion.Button onClick={this.accordHandler}>
                  {this.state.toggle ? 'See more answers' : 'Collapse answers'}
                </Accordion.Button>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <h3>Q: {this.props.question.question_body}</h3>
          </Col>
          <Col sm="auto">
            <span> Helpful? </span>
            <Button variant="link" onClick={this.helpfulHandler}>
              Yes ({this.props.question.question_helpfulness})
            </Button>
          </Col>
          <Col sm={2}>
            <AddAnswer question_id={this.props.question.question_id} />
          </Col>
        </Row>
        <Row>
          <h3>A: </h3>
        </Row>
        <Row style={ { paddingLeft: 50 } }>
          {this.state.answers.map(
            (answer) => <Answer answer={answer} key={answer.id} />,
          )}
        </Row>
      </Container>
    );
  }
}

export default Question;
