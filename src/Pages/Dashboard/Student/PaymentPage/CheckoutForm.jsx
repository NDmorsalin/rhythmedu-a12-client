import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Checkout.module.css";
import axiosInstance from "../../../../utility/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../../Provider/AuthProvider";
import swal from "sweetalert";
import { utcTimeSendToDb } from "../../../../utility/handleItme";
import useStudentEnrolledClasses from "../../../../hooks/useStudentEnrolledClasses";
import useStudentSelectedClasses from "../../../../hooks/useStudentSelectedClasses";

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const { refetch: refetchEnroll } = useStudentEnrolledClasses();
  const { refetch: refetchSelected } = useStudentSelectedClasses();

  const {
    className,
    classImg,
    instructorName,
    instructorEmail,
    price,
    studentId,
    classId,
  } = location.state.selectedClass;

  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    setProcessing(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: errorConfirmCard } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "User",
            email: user.email,
          },
        },
      });

    if (errorConfirmCard) {
      console.log("[error]", errorConfirmCard);
      setError(errorConfirmCard.message);
    } else {
      swal({
        title: "Payment Successful",
        text: "You can see your selected class in my selected class",
        icon: "success",
        buttons: false,
        timer: 2000,
      });

      const afterSuccessfulPayment = await axiosInstance.post(
        "/paymentsuccessful",
        {
          className,
          classImg,
          instructorName,
          instructorEmail,
          price,
          studentId,
          classId,
          transactionId: paymentIntent?.id,
          paymentStatus: "paid",
          paymentDate: utcTimeSendToDb(),
        }
      );
      refetchSelected();
      refetchEnroll();
      navigate("/dashboard/students/mySelectedClass");
    }
    setProcessing(false);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const paymentIntend = async () => {
      const response = await axiosInstance.post("/payment", {
        price,
        classId,
      });
      const { client_secret } = response.data;

      setClientSecret(client_secret);
    };
    paymentIntend();
  }, [classId, price]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        You are paying ${price.toFixed(2)}
      </h1>
      <form
        className="max-w-sm mx-auto mt-5 p-2 border border-blue-600 rounded-lg"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="bg-blue-500 px-8 py-2 rounded-lg text-white mt-8 hover:bg-blue-700"
          type="submit"
          disabled={!stripe || processing || !clientSecret}
        >
          {processing ? "processing..." : "pay"}
        </button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
    </>
  );
};

export default CheckoutForm;
