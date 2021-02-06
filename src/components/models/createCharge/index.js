import React, {Component} from 'react';
import { Container, Button } from 'react-bootstrap';

class CreateCharge extends Component {
  constructor(props) {
    super(props);

    this.postCharge = this.postCharge.bind(this);
  }

  async postCharge(e) {

    e.preventDefault();

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/charge/create`;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 1000, card_id: this.props.cardId })
    };

    try {
      const response = await fetch(url, settings)

      const result = await response.json();
    } catch(e) {
      if (e instanceof TypeError) {
        console.error("API response error")
        console.error(e);
        alert("Oops something went wrong. Please try again soon.");
      }
    }

  };

  render() {

    return(
      <div>
        <Container>
          <Button variant="outline-primary" onClick={(e) => this.postCharge(e)}>Create Charge</Button>
        </Container>
       </div>
    )
  };

};

export default CreateCharge;
