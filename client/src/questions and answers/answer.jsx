import React from 'react';
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
      <div>
        <h6> {this.props.answer.body} </h6>
        <div>
          <span>
            by<this.state.seller> {this.props.answer.answerer_name}</this.state.seller>
            , {new Date(`${this.props.answer.date}`).toDateString()}
          </span>
          <span>
            Helpful?
            <Button variant="link" onClick={this.helpfulHandler}>
              Yes (
                {this.props.answer.helpfulness}
              )
            </Button>
          </span>
          <Button variant="link" onClick={this.reportHandler}>
            {this.state.reported ? 'Reported' : 'Report'}
          </Button>
        </div>
      </div>
    );
  }
}

export default Answer;
