import React from 'react'
import HomeNavbar from './HomeNavbar'
import { Link } from 'react-router-dom'
import './style.css'
export default function Home() {
  return (
    <>
      <HomeNavbar />
      <div className='container home-container p-5'>
        <h1>Pizza Delivery</h1>
        <p className='welcome-text'>Welcome to pizza delivery service. This is the place when you may choose the most delicious pizza you like from wide variety of options!</p>
        <hr />
        <p className='we-are-text'>We're performing delivery free of charge in case if your order is higher than 20$</p>
        <Link to="/login">
          <button className='btn btn-dark w-100 fw-bold fs-4'>Sign In and Order</button>
        </Link>
      </div>
    </>
  )
}
