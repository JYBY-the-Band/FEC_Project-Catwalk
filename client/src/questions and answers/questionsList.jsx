import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Question from './question.jsx';
// expanding and collapsing accordion, propbably requires state
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: 42366, // TODO, get state from product module
      questions: [],
      display: 2
    };
  }

  componentDidMount() {
    axios.get(`/api/qa/questions/${this.state.product}`)
      .then(({ data }) => this.setState({ questions: data.results }))
      .then(this.state.questions.sort((a, b) => { return a.question_helpfulness - b.question_helpfulness }))
      .catch(err=>console.error(err));
  }

  render() {
    return (
      <div>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Body>
              {this.state.questions.map((question) =>
                <Question question={question} key={question.question_id} />)}
            </Accordion.Body>
            <Accordion.Button>More Answered Questions</Accordion.Button>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}

export default List;
