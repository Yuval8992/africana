/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
    'pk_test_51H0OxkJAywHFHGhe8S7CX98lefADC3PPFyVtWdI5tJWArBtUnTellj4LGFCqLgRsZbFww1OmSwsHxxSDr7GB9iLY00BYdYnYJw'
);

export const bookTour = async (tourId) => {
    try {
        // 1) Get checkout session from API
        const session = await axios(
            `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
        );

        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};
