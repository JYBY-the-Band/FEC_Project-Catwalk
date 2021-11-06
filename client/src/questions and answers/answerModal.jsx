import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      validated: false,
      question_id: null,
      answerer_name: '',
      body: '',
      email: '',
      photos: [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ question_id: this.props.question_id });
  }

  handleClose() {
    this.setState({ show: false, validated: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    if (e.target.id === 'answerer_name') {
      this.setState({ answerer_name: e.target.value });
    }
    if (e.target.id === 'body') {
      this.setState({ body: e.target.value });
    }
    if (e.target.id === 'email') {
      this.setState({ email: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log('Form subitted'); // TODO submit the form data to database
      // axios.post(`/api/qa/questions/${this.state.question_id}/answers`, {
      //   body: this.state.body,
      //   name: this.state.answerer_name,
      //   email: this.state.email,
      //   photos: this.state.photos,
      // });
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <>
        <Button variant="link" onClick={this.handleShow}>
          Add Answer
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit your Answer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="answerer_name">
                <Form.Label>What is your nickname *</Form.Label>
                <Form.Control
                  maxLength="60"
                  required
                  type="text"
                  placeholder="Example: jackson11"
                  value={this.state.answerer_name}
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  For privacy reasons, do not use your full name or email address
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  You must enter a nickname
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address *</Form.Label>
                <Form.Control
                  maxLength="60"
                  required
                  type="email"
                  placeholder="Example: jack@email.com"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  For authentication reasons, you will not be emailed
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  You must enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="body">
                <Form.Label>Your Answer *</Form.Label>
                <Form.Control
                  maxLength="1000"
                  required
                  as="textarea"
                  rows={6}
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  You must enter an answer
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" size="sm" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddAnswer;
