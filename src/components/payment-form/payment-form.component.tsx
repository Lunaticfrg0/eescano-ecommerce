import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { useState, FormEvent } from "react";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const ifValidCardElement = (card: StripeCardElement | null) : card is StripeCardElement => card !== null

const PaymentForm = () => {
    const stripe = useStripe()
    const elemets = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)

    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!stripe || !elemets){
            return
        }
        setIsProcessingPayment(true)
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
          }).then((res) => {
            return res.json();
          });
        const clientSecret = response.paymentIntent.client_secret
        
        const cardDetails = elemets.getElement(CardElement)

        if(!ifValidCardElement(cardDetails)) return 

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        })
        setIsProcessingPayment(false)
        if(paymentResult.error){
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === "succeeded"){
                alert("Payment successfull")
            }
        }
    }
    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Creadit Card Payment: </h2>
                <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;