import React from 'react'
import './Home.css'
import Product from './Product'

const Home = () => {

  function generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  return (
    <div className="home">
        <div className="home__container">
            <img 
                src='https://www.mitchellandbrown.co.uk/wp-content/uploads/2022/03/Prime-Video.jpg'
                className='home__image'
                alt=''
            />
            <div className="home__row">
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61INLYsKEwL._AC_UF1000,1000_QL80_.jpg'
                  price={19.99}
                  rating={5}
                />
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/I/71iM92IOt8L._AC_SY240_.jpg'
                  price={10.99}
                  rating={2}
                />
            </div>
            <div className="home__row">
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/613QAtkgxpL._AC_SY240_.jpg'
                  price={15.99}
                  rating={1}
                />
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71cMu3nxBtL._SX679_.jpg'
                  price={29.99}
                  rating={4}
                />
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61o4OC7-GIL._SX679_.jpg'
                  price={9.99}
                  rating={3}
                />
            </div>
            <div className="home__row">
                <Product 
                  id={generateRandomKey()}
                  title='Sales Secrets'
                  image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71QbUfYWa-L._AC_SX679_.jpg'
                  price={49.99}
                  rating={6}
                />
            </div>
        </div>
    </div>
  )
}

export default Home