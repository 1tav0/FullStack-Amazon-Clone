import React, { useEffect, useState } from 'react'
import './Orders.css'
import { useStateValue } from '../StateProvider'
import { db } from '../firebase'
import Order from './Order'

const Orders = () => {
    const [{ basket, user }] = useStateValue()
    //piece of state to store all the orders 
    const [orders, setOrders] = useState([])

    useEffect(() =>{
      if(user){
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => { //gives a real snapshot of what the db looks like in at that time in the database 
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data:doc.data()
            })))
        })
      } else {
          setOrders([])
      }
    },[user])
  return (
    <div className="orders">
        <h1>Your Orders</h1>   
        
        <div className="orders__order">
          {
            orders?.map(order => ( //many orders we render out one and one 
                <span key={order.id}>
                  <Order order={order} />
                </span>
              ))
          }
        </div>
    </div>
  )
}

export default Orders