import React, { useState } from 'react'
import './Login.css' 
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault() //avoid refresh
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => { //we get back an authentication when we call the signInWithEmailAndPassword function
                navigate('/')
            })
            .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // console.log(auth)
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }

  return (
    <div className="login">
        <Link to='/'>
            <img 
                className='login__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
                alt=''
            />      
        </Link>   
        <div className="login__container">
            <h1>Sign-in</h1>
            <form action="">
                <h5>Email</h5>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                
                <h5>Password</h5>
                  <input type="password" value={password}  onChange={ e => setPassword(e.target.value)}/>
                
                <button className='login__SignInButton' onClick={signIn} type='submit'>Sign In</button>
            </form>
            
            <p>
                By signin-in you agree to the Amazon-clone Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            
            <button className='login__registerButton' onClick={register} >Create your Amazon Account</button>
        </div> 
    </div>
  )
}

export default Login