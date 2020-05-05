import harden from '@agoric/harden';
import produceIssuer from '@agoric/ertp';
// import { makeZoeHelpers } from '@agoric/zoe/src/contractSupport/zoeHelpers';

export const makeContract = harden(zcf => {
  const {
    mint: balletTicketMint,
    issuer: balletTicketIssuer,
    amountMath,
  } = produceIssuer('Agoric Ballet Opera tickets', 'set');

  // const zoeHelpers = makeZoeHelpers(zcf);

  const startDateString = new Date(2020, 1, 17, 20, 30).toISOString();

  const ticketDescriptionObjects = Array(5)
    .fill()
    .map((_, i) => ({
      seat: i + 1,
      show: 'The Sofa',
      start: startDateString,
    }));

  const balletTicketPayments = ticketDescriptionObjects.map(
    ticketDescription => {
      return balletTicketMint.mintPayment(
        amountMath.make(harden([ticketDescription])),
      );
    },
  );

  return zcf.addNewIssuer(balletTicketIssuer, 'Ticket').then(() => {
    // A function for making invites to this contract

    // admin Todo;
    const makeInvite = () => {
      // zoeHelpers
    };

    return harden({
      invite: makeInvite(),
      publicAPI: {
        getBalletTickets: () => balletTicketPayments,
        getTokenIssuer: () => balletTicketIssuer,
      },
    });
  });
});
