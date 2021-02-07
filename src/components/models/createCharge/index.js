import React, {Component} from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';

class CreateCharge extends Component {
  constructor(props) {
    super(props);
    this.createCharge = this.createCharge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.state = {
      amount: null,
      error: false,
    }
  }

  async createCharge() {

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/charge/create`;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: this.state.amount,
                           card_id: this.props.cardId })
    };

    try {

      const response = await fetch(url, settings)

      const result = await response.json();

      if (result && result.id) {

        this.props.updateCardFromCharge();

      } else {
        this.setState({error: result.error})
      }
    }
    catch(e) {
      if (e instanceof TypeError) {
        console.error("API response error")
        console.error(e);
        alert("Oops something went wrong. Please try again soon.");
      }
    }

  };

  handleSubmit(e) {
    e.preventDefault();
    this.createCharge();
  }

  handleLimitChange(e) {
    const value = e.target.value;
    const cents = Number(value) * 100;

    this.setState({
      amount: cents,
    })
  }

  render() {

    const { amount, error } = this.state

    return(
      <Card className="create-charge-card">
        <Card.Header> Create Charge </Card.Header>
        <Card.Body>
          {error &&
            <Alert variant="danger">{error}</Alert>
          }
          <Form>
            <Form.Group controlid="createCharge">
              <Form.Label>Charge amount</Form.Label>
              <Form.Control required type="number"
                value={amount ? Number(amount)/100 : ""}
                onChange={this.handleLimitChange} />
              <Button className="create-charge-submit-button"
                variant="outline-primary"
                onClick={this.handleSubmit}>Create </Button>
             </Form.Group>
           </Form>
         </Card.Body>
      </Card>
    )
  };

};

export default CreateCharge;
