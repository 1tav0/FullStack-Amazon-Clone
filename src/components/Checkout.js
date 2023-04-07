import React, { useEffect } from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from '../StateProvider'
import FlipMove from 'react-flip-move';

const Checkout = () => {

  const [{ basket, user }, dispatch] = useStateValue()

  // useEffect(() => {
  //   const storedBasket = JSON.parse(localStorage.getItem("basket"));
  //   const storedUser = JSON.parse(localStorage.getItem('user'));

  //   if (storedBasket) {
  //     dispatch({ type: "SET_BASKET", basket: storedBasket });
  //   }
  //   if (storedUser) {
  //     dispatch({ type: 'SET_USER', user: storedUser });
  //   }
  // }, [dispatch]);

  return (
    <div className="checkout">
        <div className="checkout__left">
            <img
                className='checkout__ad'
                src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                alt=''
            />
            <div>
                <h3>Hello, {user?.email}</h3>
                <h2 className="checkout__title">
                   Your Shopping Basket 
                </h2>
                {/* <CheckoutProduct
                      id='1'
                      title='title goes here title goes here title goes here title goes here title goes here
                      title goes here title goes here title goes here title goes here title goes here'
                      image='https://m.media-amazon.com/images/I/71iM92IOt8L._AC_SY240_.jpg'
                      price={20}
                      rating={3}
                /> */}
                <FlipMove>
                  {
                      basket?.map(item => (
                        <div key={item.id}>
                          <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                          />
                      </div>
                      ))
                  }
                </FlipMove>
            </div>
        </div>
        <div className="checkout__right">
           <Subtotal />
        </div>
    </div>
  )
}

export default Checkout