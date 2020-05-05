import produceIssuer from '@agoric/ertp';
import harden from '@agoric/harden';

const {
  mint: balletTicketMint,
  issuer: balletTicketIssuer,
  amountMath,
} = produceIssuer('Agoric Ballet Opera tickets', 'set');

const startDateString = new Date(2020, 1, 17, 20, 30).toISOString();

const ticketDescriptionObjects = Array(5)
  .fill()
  .map((_, i) => ({
    seat: i + 1,
    show: 'The Sofa',
    start: startDateString,
  }));

const balletTicketPayments = ticketDescriptionObjects.map(ticketDescription => {
  return balletTicketMint.mintPayment(
    amountMath.make(harden([ticketDescription])),
  );
});

export { balletTicketIssuer, balletTicketPayments };
