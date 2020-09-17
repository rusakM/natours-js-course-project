/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HPnZrDnOJeeLqHNciYHIFuMGPtWTbfbgWbXU6dT0ZFEeKfvu7gdMoeyZgReEpTXHr7kAfe17jTdSsTJHtxm9bAg00mmto824A'
);

export const bookTour = async tourId => {
  try {
    // 1 get session from the server
    const session = await axios(
      `http://localhost:3001/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2 create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
