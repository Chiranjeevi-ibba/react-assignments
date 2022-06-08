import React from 'react'
import MenuNavbar from './MenuNavbar'
import { Link } from 'react-router-dom'
export default function OrderSuccessfull() {
  return (
   <>
   <MenuNavbar />
   <div className='container'>
       <h1>Order has been placed successfully!</h1>
       <p className='p-3 fw-bold text-success order-success-para-text'>You will recieve notification by email with order details.</p>
       <Link to="/menu">
       <button type="text" className='btn btn-dark fw-bold'>Go an order some more</button>
       </Link>
   </div>
   </>
  )
}
