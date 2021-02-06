import React, {Component} from 'react';
import CreateCharge from '../../createCharge';
import AvailableBalance from '../../availableBalance';

class CardDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { card, updateCard } = this.props

    return (
      <div>
        <h1> Card details </h1>
        <h2> Card ID: {card.id} </h2>
        <h2> limit: ${(card.limit/100).toFixed(2)} </h2>
        < AvailableBalance cardId={card.id} />
        < CreateCharge cardId={card.id}
                       updateCardFromCharge={updateCard}/>
      </div>
    )
  };
};

export default CardDetails;
