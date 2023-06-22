import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  return (
    <div className="px-1 md:px-8 my-4 md:my-8">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements></div>
  );
};

export default PaymentPage;
