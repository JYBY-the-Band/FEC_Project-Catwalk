import React from 'react';
import Container from 'react-bootstrap/Container';
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
      <Container>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Have a question? Search for answers…"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default Search;
