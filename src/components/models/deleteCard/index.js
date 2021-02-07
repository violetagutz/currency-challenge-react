import React, {Component} from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class DeleteCard extends Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);

  }

  async deleteCard(e) {

    e.preventDefault();

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/delete`;

    const settings = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    try {
      const response = await fetch(url, settings)

      const result = await response.json();

      if (result.deleted) {
        this.props.updateCardFromDelete();
      }

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
          onClick={this.deleteCard}>Delete Card</Button>
       </div>
    )
  };

};

export default DeleteCard;
