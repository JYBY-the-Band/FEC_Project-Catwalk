import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      validated: false,
      questionId: null,
      name: '',
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
    const { questionId } = this.props;
    this.setState({ questionId });
  }

  handleClose() {
    this.setState({
      show: false,
      validated: false,
      name: '',
      body: '',
      email: '',
      photos: [],
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    if (e.target.id === 'name') {
      this.setState({ name: e.target.value });
    }
    if (e.target.id === 'body') {
      this.setState({ body: e.target.value });
    }
    if (e.target.id === 'email') {
      this.setState({ email: e.target.value });
    }
  }

  handleSubmit(e) {
    const { questionId, body, name, email, photos } = this.state;
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ validated: true });
    } else {
      axios.post(`/api/qa/questions/${questionId}/answers`, {
        body, name, email, photos,
      })
        .then(this.handleClose())
        .catch((err) => console.error(err));
    }
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { show, validated, name, email, body } = this.state;
    const { productId, question } = this.props;
    return (
      <>
        <Button variant="link" onClick={this.handleShow}>
          Add Answer
        </Button>

        <Modal
          show={show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Submit your Answer
              {'\n'}
              <h6>
                {productId}: {question}
              </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>What is your nickname *</Form.Label>
                <Form.Control
                  maxLength="60"
                  required
                  type="text"
                  placeholder="Example: jackson11"
                  value={name}
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
                  value={email}
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
                  value={body}
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
