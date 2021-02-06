import React, {Component} from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';

class CreateCard extends Component {
  constructor(props) {
    super(props);

    this.createCard = this.createCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.state = {
      limit: 10000,
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

      if (result && result.card) {
        const card = result.card
        console.log(card)
        console.log("im in child component")
        this.props.updateCard(card);
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

    return(
      <div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title> Create Credit Card </Card.Title>
              <Form>
                <Form.Group controlid="createCard">
                  <Form.Label>Card Limit</Form.Label>
                  <Form.Control type="number" min="100" max="1000000"
                    value={this.state.limit/100}
                    onChange={this.handleLimitChange}
                    placeholder="enter card limit" />
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
