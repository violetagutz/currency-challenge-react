import React, {Component} from 'react';
import Currency from '../../../helpers/currency';
import { Card } from 'react-bootstrap';

class AvailableBalance extends Component {
  constructor(props) {
    super(props);
    this.getAvailableBalance = this.getAvailableBalance.bind(this);
    this.state = {
      available_balance: "",
    }
  }

  async getAvailableBalance(cardId) {

    const { REACT_APP_API_URL } = process.env
    const url = `${ REACT_APP_API_URL }/card/available_balance?id=${cardId}`;

    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, settings)

      const result = await response.json();

      if (result && result.available_balance) {

        const balance = result.available_balance;

        this.setState({
          available_balance: balance,
        })
      }

    } catch(e) {
      if (e instanceof TypeError) {
        // alert tech team of issue
        alert("Oops something went wrong. Please try again soon.");
      }
    }

  };

  componentDidMount(){
    this.getAvailableBalance(this.props.cardId);
  }

  render() {

    const { available_balance } = this.state

    return(
      <Card.Text> Available balance: {Currency.toDollars(available_balance)} </Card.Text>
    )
  };

};

export default AvailableBalance;
