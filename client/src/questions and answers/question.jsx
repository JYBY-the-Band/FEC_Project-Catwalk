import React from 'react';
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
    this.setState({ answers: answerArr });// TODO set helpful to true if is true in database
  }

  accordHandler() {
    this.setState((prevState) => ({ toggle: !prevState.toggle }));
  }

  helpfulHandler() {
    if (!this.state.helpful) {
      this.setState({ helpful: true });// TODO Update helpful stat in database
    }
  }

  render() {
    if (this.state.answers.length > 2) {
      return (
        <div>
          <h3>
            Q: {this.props.question.question_body}
          </h3>
          <span> Helpful? </span>
          <Button variant="link" onClick={this.helpfulHandler}>
            Yes ({this.props.question.question_helpfulness})
          </Button>
          <AddAnswer />
          <div>
            <h3>A: </h3>
            {this.state.answers.slice(0, 2).map((answer) => (
              <Answer answer={answer} key={answer.id} />))}
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
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>Q: {this.props.question.question_body}</h3>
        <span> Helpful? </span>
        <Button variant="link" onClick={this.helpfulHandler}>
          Yes ({this.props.question.question_helpfulness})
        </Button>
        <AddAnswer />
        <div>
          <h3>A: </h3>
          {this.state.answers.map(
            (answer) => <Answer answer={answer} key={answer.id} />,
          )}
        </div>
      </div>
    );
  }
}

export default Question;
