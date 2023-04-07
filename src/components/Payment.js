import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../reducer'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'

const Payment = () => {
    const [{ user, basket }, dispatch] = useStateValue()
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()


    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(true)
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer but this depens on the basket change hence the property at bottom
        const getClientSecret = async () => {
            const response = await axios({ //basically create an object inside axios the ?total is aka as 'query param'
                method: 'POST',
                //stripe expects the total in a currencies subunits 
                url: `/payments/create?total=${getBasketTotal(basket) * 100}` //this is our endpoint 
            })
            console.log(response)
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    console.log("The clientSecret is ",clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        //how stripe knows how much we're going to charge 
        const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            .then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation
                db.collection('users') //NOSQL like
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })
                
                setSucceeded(true)
                setError(null)
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                navigate('/orders', { replace: true })
        })
    }

    const handleChange = (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details 
        setDisabled(e.empty) //if the even is empty we disabled the button 
        setError(e.error ? e.error.message : "")
    }

  return (
    <div className="payment">
        <div className="payment__container">
            
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
            {/* Payment Section - delivery address */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                      <p>{user?.email}</p>
                      <p>React Lane</p>
                      <p>Los Angeles, CA</p>
                </div>
            </div>
            
            {/* Payment Section - Review Items */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payments__items">
                    {
                          basket?.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    }
                </div>
            </div>
            
            {/* Payment Section - Payment Method */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                      <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                  <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                            </button>
                        </div>
                        
                        {
                            error &&
                                <div>{error}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment