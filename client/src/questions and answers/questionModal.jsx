import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      validated: false,
      asker_name: '',
      body: '',
      email: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState({ show: false, validated: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    if (e.target.id === 'asker_name') {
      this.setState({ asker_name: e.target.value });
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
      this.setState({ validated: true });
    } else {
      axios.post('/api/qa/questions/', {
        body: this.state.body,
        name: this.state.asker_name,
        email: this.state.email,
        product_id: this.props.product,
      })
        .then(this.setState({
          show: false,
          validated: false,
          asker_name: '',
          body: '',
          email: '',
        }))
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add  a Question +
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Ask Your Question{"\n"}
              <h6>About the {this.props.product}</h6>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="asker_name">
                <Form.Label>What is your nickname *</Form.Label>
                <Form.Control
                  maxLength="60"
                  required
                  type="text"
                  placeholder="Example: jackson11"
                  value={this.state.asker_name}
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
                <Form.Label>Your Email *</Form.Label>
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
                <Form.Label>Your Question *</Form.Label>
                <Form.Control
                  maxLength="1000"
                  required
                  as="textarea"
                  placeholder="Why did you like the product or not?"
                  rows={6}
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  You must ask a question
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

export default AddQuestion;
