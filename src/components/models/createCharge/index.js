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
      createdAt: null,
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

        const createdAt = result.created_at
        this.setState({
          createdAt: createdAt,
        })
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

    const { amount, error, createdAt } = this.state

    return(
      <div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title> Create Charge </Card.Title>
              {error &&
                <Alert variant="danger">{error}</Alert>
              }
              <Form>
                <Form.Group controlid="createCharge">
                  <Form.Label>Charge amount</Form.Label>
                  <Form.Control required type="number"
                    value={amount ? Number(amount)/100 : ""}
                    onChange={this.handleLimitChange} />
                  <Button variant="outline-primary"
                    onClick={this.handleSubmit}>Create </Button>
                  <p>{amount}</p>
                  <p>{createdAt}</p>
                 </Form.Group>
               </Form>
             </Card.Body>
          </Card>
        </Container>
       </div>
    )
  };

};

export default CreateCharge;
