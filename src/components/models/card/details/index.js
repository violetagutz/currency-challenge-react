import React, {Component} from 'react';
import CreateCharge from '../../createCharge';
import DeleteCard from '../../deleteCard';
import AvailableBalance from '../../availableBalance';
import Currency from '../../../../helpers/currency';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

class CardDetails extends Component {
  render() {

    const { card, updateCard } = this.props

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header> Card Details </Card.Header>
              <Card.Body>
                <Card.Text>Card: <Image width="40px" src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135017-visa_82256.png"/> XXXX-XXXX-XXXX-5555</Card.Text>
                <Card.Text> Limit: {Currency.toDollars(card.limit)} </Card.Text>
                <Card.Text> Total Usage: {Currency.toDollars(card.total_usage)}</Card.Text>
                < AvailableBalance cardId={card.id} />
              </Card.Body>
            </Card>
            < CreateCharge cardId={card.id}
                           updateCardFromCharge={updateCard} />
            < DeleteCard updateCardFromDelete={updateCard}/>
          </Col>
        </Row>
      </Container>
    )
  };
};

export default CardDetails;
