import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders'

const promise = loadStripe('pk_test_51Mt1uRI3YIQPG4nG62JU4FzqNVnDMHWXUmiFerSxyZiRO77T892fHCphhMnHRta1I7IUME95Yk9u8pW5H2OqX1Yl00NeYeiCvU')

function App() {

  const [{ }, dispacth] = useStateValue()

  //listener to keep track of who is logged in
  useEffect(() => { //this is the listener we added to the auth state
    auth.onAuthStateChanged(authUser => {//gives us the user who is logged in
      console.log('THE USER IS >>> ', authUser)

      if (authUser) { //if logged in we will shoot the user data to the dataLayer if logs out we will remove it from the dataLayer 
        dispacth({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispacth({
          type: "SET_USER",
          user: null
        })
      }
    }) 
  }, [])
  return (
    <Router>
      <div className="app"> 
        <Routes>
          <Route path='/login' element={<Login />} /> 
          <Route
            path='/orders'
            element={
              <>
                <Header/>
                <Orders />
              </>
            }
          />
          <Route
            path='/checkout'
            element={
              <>
                <Header/>
                <Checkout />
              </>
            }
          />
          <Route
            path='/payment'
            element={
              <>
                <Header/>
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route 
            path='/' 
            element={
              <>
                <Header/>
                <Home/>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
