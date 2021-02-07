import React, {Component} from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';

class CreateCard extends Component {
  constructor(props) {
    super(props);

    this.createCard = this.createCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.state = {
      limit: 10000,
      error: false,
    }

  }

  async createCard() {

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/card/create`;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({limit: this.state.limit})
    };

    try {
      const response = await fetch(url, settings)

      const result = await response.json();

      if (result && result.card_id) {
        this.props.updateCard();
      } else {
        this.setState({error: result.error})
      }

    } catch(e) {
      if (e instanceof TypeError) {
        console.error("API response error")
        console.error(e);
        alert("Oops something went wrong. Please try again soon.");
      }
    }

  };

  handleSubmit(e) {
    e.preventDefault();
    this.createCard();
  }

  handleLimitChange(e) {
    const value = e.target.value;
    const cents = Number(value) * 100;

    this.setState({
      limit: cents,
    })
  }

  render() {

    const { limit, error } = this.state;

    return(
      <div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title> Create Credit Card </Card.Title>
              {error &&
                <Alert variant="danger">{error}</Alert>
              }
              <Form>
                <Form.Group controlid="createCard">
                  <Form.Label>Card Limit</Form.Label>
                  <Form.Control type="number" min="100" max="1000000"
                    value={limit ? Number(limit)/100 : ""}
                    onChange={this.handleLimitChange} />
                  <Button variant="outline-primary"
                    onClick={this.handleSubmit}>Create Card</Button>
                 </Form.Group>
               </Form>
             </Card.Body>
          </Card>
        </Container>
       </div>
    )
  };

};

export default CreateCard;
