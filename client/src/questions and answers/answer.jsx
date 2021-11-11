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
      seller: false,
      reported: false,
      helpful: false,
      helpfulness: 0,
    };
    this.reportHandler = this.reportHandler.bind(this);
    this.helpfulHandler = this.helpfulHandler.bind(this);
  }

  componentDidMount() {
    const { user, answer: { helpfulness, answerer_name } } = this.props;
    if (answerer_name.toUpperCase() === 'SELLER') {
      this.setState({ seller: true });
    }
    this.setState({ user, helpfulness });
    // TODO will need to set reported and helpful to true it they are already true in database
  }

  helpfulHandler() {
    const { helpful, helpfulness } = this.state;
    const { answer: { id } } = this.props;
    if (!helpful) {
      axios.put(`/api/qa/questions/${id}/helpful`,
        { helpfulness: helpfulness + 1 })
        .then(this.setState({ helpful: true, helpfulness: helpfulness + 1 }))
        // TODO Update helpful stat in database for current user
        .catch((err) => console.error(err));
    }
  }

  reportHandler() {
    const { reported } = this.state;
    const { answer: { id } } = this.props;
    if (!reported) {
      axios.put(`/api/qa/questions/${id}/report`,
        { reported: true })
        .then(this.setState({ reported: true }))
        // TODO Update reported stat in database for current user
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { helpfulness, reported, seller } = this.state;
    const { answer: { id, answerer_name, date, body } } = this.props;
    return (
      <Container data-testid={id}>
        <Row><h5>{body}</h5></Row>
        <Row style={{ fontSize: 12 }}>
          <Col sm="auto">
            by
            {seller ? <b> {answerer_name}</b> : <span> {answerer_name}</span>}
          </Col>
          <Col sm="auto">
            {new Date(`${date}`).toDateString()}
          </Col>
          <Col sm="auto">
            Helpful?
            <Button variant="link" size="sm" onClick={this.helpfulHandler}>
              {`Yes (${helpfulness})`}
            </Button>
          </Col>
          <Col sm="auto">
            <Button variant="link" size="sm" onClick={this.reportHandler}>
              {reported ? 'Reported' : 'Report'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Answer;
