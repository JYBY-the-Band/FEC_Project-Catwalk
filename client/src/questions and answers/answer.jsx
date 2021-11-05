import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: 'a',
      reported: false,
      helpful: false,
    };
    this.reportHandler = this.reportHandler.bind(this);
    this.helpfulHandler = this.helpfulHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.answer.answerer_name.toUpperCase() === 'SELLER') {
      this.setState({ seller: 'b' });
    } // TODO will need to set reported and helpful to true it they are already true in database
  }

  helpfulHandler() {
    if (!this.state.helpful) {
      this.setState({ helpful: true });// TODO Update helpful stat in database
    }
  }

  reportHandler() {
    if (!this.state.reported) {
      this.setState({ reported: true });// TODO Update reported stat in database
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
              {`Yes (${this.props.answer.helpfulness})`}
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
