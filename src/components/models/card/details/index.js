import React, {Component} from 'react';
import CreateCharge from '../../createCharge';
import DeleteCard from '../../deleteCard';
import AvailableBalance from '../../availableBalance';
import Currency from '../../../../helpers/currency';

class CardDetails extends Component {
  render() {

    const { card, updateCard } = this.props

    return (
      <div>
        <h1> Card details </h1>
        <h2> Limit: {Currency.toDollars(card.limit)} </h2>
        <h2> Total Usage: {Currency.toDollars(card.total_usage)}</h2>
        < AvailableBalance cardId={card.id} />
        < CreateCharge cardId={card.id}
                       updateCardFromCharge={updateCard} />
        < DeleteCard updateCardFromDelete={updateCard}/>
      </div>
    )
  };
};

export default CardDetails;
