import React from 'react'
import './Product.css'
import { useStateValue } from '../StateProvider'

const Product = ({ id,image, title, price, rating }) => {

  const [{basket}, dispacth] = useStateValue() //pull values from the dataLayer in this case basket thats why is deconstructure
  // console.log({basket})

  const addToBasket = () => {
    //dispacth item to the data layer
    dispacth({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      }
    })
  }

  return (
    <div className="product">
        <div className="product__info">
            <p>{title}</p>
            <p className="product__price">
                <small>$</small>  
                <strong>{ price }</strong>  
            </p> 
            <div className="product__rating">
              {
                Array(rating)
                  .fill()
                  .map((_,i) => (
                    <p key={i}>⭐</p>
                  ))
              }
            </div> 
        </div>
        <img 
          src={image}
          alt=''
        />
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product