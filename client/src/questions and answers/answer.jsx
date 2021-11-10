import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      seller: 'a',
      reported: false,
      helpful: false,
      helpfulness: 0,
    };
    this.reportHandler = this.reportHandler.bind(this);
    this.helpfulHandler = this.helpfulHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.answer.answerer_name.toUpperCase() === 'SELLER') {
      this.setState({ seller: 'b' });
    }
    this.setState({ user: this.props.user, helpfulness: this.props.answer.helpfulness });
    // TODO will need to set reported and helpful to true it they are already true in database
  }

  helpfulHandler() {
    if (!this.state.helpful) {
      axios.put(`/api/qa/questions/${this.props.answer.id}/helpful`,
        { helpfulness: this.state.helpfulness + 1 })
        .then(this.setState({ helpful: true, helpfulness: this.state.helpfulness + 1 }))
        // TODO Update helpful stat in database for current user
        .catch((err) => console.error(err));
    }
  }

  reportHandler() {
    if (!this.state.reported) {
      axios.put(`/api/qa/questions/${this.props.answer.id}/report`,
        { reported: true })
        .then(this.setState({ reported: true }))
        // TODO Update reported stat in database for current user
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <Container>
        <Row><h5>{this.props.answer.body}</h5></Row>
        <Row style={ { fontSize: 12 } }>
          <Col sm="auto">
            by<this.state.seller> {this.props.answer.answerer_name}</this.state.seller>
          </Col>
          <Col sm="auto">
            {new Date(`${this.props.answer.date}`).toDateString()}
          </Col>
          <Col sm="auto">
            Helpful?
            <Button variant="link" size="sm" onClick={this.helpfulHandler}>
              {`Yes (${this.state.helpfulness})`}
            </Button>
          </Col>
          <Col sm="auto">
            <Button variant="link" size="sm" onClick={this.reportHandler}>
              {this.state.reported ? 'Reported' : 'Report'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Answer;
