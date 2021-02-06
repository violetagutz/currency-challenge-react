import React, {Component} from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateCard from '../../models/createCard';
import CardDetails from '../../models/card/details';

class CardPage extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.getCardIfExists = this.getCardIfExists.bind(this);
    this.state = {
      card: null,
    }
  }

  async getCardIfExists() {

    const { REACT_APP_API_URL } = process.env

    const url = `${ REACT_APP_API_URL }/get_card`;

    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    try {
      const response = await fetch(url, settings)

      const result = await response.json();

      if (result && result.card) {

        const card = result.card

        this.setState({
          card: card,
        });
      }

    } catch(e) {
      if (e instanceof TypeError) {
        console.error("API response error")
        console.error(e);
        alert("Oops something went wrong. Please try again soon.");
      }
    }
  };

  componentDidMount() {
    this.getCardIfExists();
  }

  updateCard() {
    this.getCardIfExists();
  }

  render() {

    const { card } = this.state;

    if (card) {
      return (
        < CardDetails card={card} />
      )
    } else {
      return (
        < CreateCard updateCard={this.updateCard} />
      )
    }
  };

};

export default CardPage;
