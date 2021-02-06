import React, {Component} from 'react';

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
        console.error("API response error")
        console.error(e);
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
      <div>
        <h2> Available balance: ${(available_balance/100).toFixed(2)} </h2>
      </div>
    )
  };

};

export default AvailableBalance;
