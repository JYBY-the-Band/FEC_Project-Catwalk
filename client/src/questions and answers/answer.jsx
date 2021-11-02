import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: 'a'
    };
  }

  componentDidMount() {
    if (this.props.answer.answerer_name.toUpperCase() === 'SELLER') {
      this.setState({seller: 'b'});
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
            Helpful? <a> Yes </a> ({this.props.answer.helpfulness})
          </span>
          <span> Report </span>
        </div>
      </div>
    );
  }
}

export default Answer;
