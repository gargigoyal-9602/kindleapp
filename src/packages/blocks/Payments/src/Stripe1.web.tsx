import {
  CardElement,
  ElementsConsumer,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,

} from "@stripe/react-stripe-js";

import {
  Grid
} from "@material-ui/core";

import BuyBookController, { Props } from "./BuyBookController.web";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutForm = (props: any) => {
  const [name, setName] = useState('');
  // CardNumberElement.update({disabled:true})

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    const { stripe, elements } = props;

    if (!stripe || !elements) {
      console.log("blank card")
      return;
    }

    // const cardElement = elements.getElement(CardElement);
    const number = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: number,
    });
    // props.payment(paymentMethod?.id)
    if (error || !name) {
      // console.log("[error]", error);
      toast.error(error?.message);
      !name && !error && toast.error("Pls Enter The Card Holder Name")
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      props.payment(paymentMethod?.id)
    }
  };
  const { stripe } = props;
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="stripe-payment-details"
      style={props.disable ? { pointerEvents: "none" } : {}}>
      {/* <CardElement /> */}

      <label style={{ fontSize: "14.3px", color: "#b2b3b9",fontWeight: 600, }}
    >Card Number</label>
      <CardNumberElement
        // @ts-ignore
        // options={options}
        disabled={true}

        onReady={() => {
        }}
        onChange={(event: any) => {

          //@ts-ignore
          //window.notify([{type:'danger',message:event?.error?.message}]),);
          // console.log(event?.error.message)
          toast.error(event?.error.message);
        }}
        onBlur={() => {
        }}
        onFocus={() => {
        }}
        className="card-inner-details"
      />
      <Grid container direction="row" justify="space-between">
        <Grid xs={12} md={12} style={{ display: "flex", flexWrap: "wrap" }}>
          <Grid xs={12} md={8} >

            <label style={{ fontSize: "14.3px", color: "#b2b3b9",fontWeight: 600, }}>Expiration Date</label>

            <CardExpiryElement
              // @ts-ignore
              // options={options}
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event: any) => {
                // console.log(
                //   "CardNumberElement [change]",
                //   event

                // );
                toast.error(event?.error.message);

              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
              className="card-inner-details expiration"
            />
          </Grid>

          <Grid xs={12} md={4} style={{ paddingLeft: "5px", }}>
            <label style={{ fontSize: "14.3px", color: "#b2b3b9", fontWeight: 600, }}>CVV</label>
            <CardCvcElement
              // @ts-ignore
              // options={options}
              onReady={() => {
                // console.log("CardNumberElement [ready]");
              }}
              onChange={(event: any) => {
                // console.log(event,"cvc error")
                // toast.error(event?.error.message);

              }}
              onBlur={() => {
                // console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                // console.log("CardNumberElement [focus]");
              }}
              className="card-inner-details expiration"
            />
          </Grid>
        </Grid>


      </Grid>
      <div className="form-group">
        <label htmlFor={name} className="paymentcardLabel" style={{ fontSize: "14.3px", color: "#b2b3b9",fontWeight: 600, }}>Card Holder Name</label>
        <input type="text" className="form-control" placeholder="Eg: Mike Robert" value={name} onChange={(e: any) => {
          setName(e.target.value)
        }} />
      </div>
      <button type="submit" disabled={!stripe} className="button button-primary w-100">
        Pay
      </button>
    </form>
  );
};

const InjectedCheckoutForm = (props: any) => {

  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} payment={props.paymentIntent} disable={props.disable} />
      )}
    </ElementsConsumer>
  );
};

// export default InjectedCheckoutForm;
const stripePromise = loadStripe(
  "pk_test_51IpoIqSAiV0uEP2lmpc1xxY8UHr4kMMpdvqdvr5cQK6n21y6ZaHCOksEAotk53cI46yGTwTXXW6ldC1BgUcmkCoP005aNLW83X"
);

const App = (props: any) => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm paymentIntent={props.paymentIntent} disable={props.disable} />
    </Elements>
  );
};

export default App;
