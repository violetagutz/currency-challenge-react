import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class DeleteCard extends Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);

  }

  async deleteCard(e) {

    e.preventDefault();

    const url = `https://sequin-creditcard-api.herokuapp.com/delete`;

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
      <Button variant="outline-danger"
        onClick={this.deleteCard}>Delete card to start over</Button>
    )
  };

};

export default DeleteCard;
