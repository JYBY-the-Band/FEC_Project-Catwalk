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
    const { handleSearchInputChange } = this.props;
    this.setState({ value: e.target.value });
    handleSearchInputChange(e.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <Container>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Have a question? Search for answers…"
          value={value}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default Search;
