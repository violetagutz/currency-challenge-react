import React, {Component} from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';

class DeleteCard extends Component {
  constructor(props) {
    super(props);
  }

  async deleteCard(e, cardId) {

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/delete?id=${cardId}`;

    const settings = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
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
        <Button variant="outline-primary"
          onClick={(e, cardId) => this.deleteCard(e, this.props.cardId)}>Try again</Button>
       </div>
    )
  };

};

export default DeleteCard;
