import React, {Component} from 'react';

class CardDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { card } = this.props
    return (
      <div>
        <h1> Card details </h1>
        <h2> Card ID: {card.id} </h2>
        <h2> limit: {card.limit} </h2>
      </div>
    )
  };
};

export default CardDetails;
