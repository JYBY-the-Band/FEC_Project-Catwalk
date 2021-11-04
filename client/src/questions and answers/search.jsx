import React from 'react';
import Form from 'react-bootstrap/Form';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.handleSearchInputChange(e.target.value);
  }

  render() {
    return (
      <div>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Have a question? Search for answers…"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
