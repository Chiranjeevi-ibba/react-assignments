import React, {useContext} from 'react'
import MenuNavbar from './MenuNavbar'
import { MyCartContext } from '../App'
import { Link } from 'react-router-dom'
export default function Checkout() {

    const myCartData = useContext(MyCartContext)
    let { cartData } = myCartData

    let total = 0

  if(cartData.length > 0) {
     cartData.map(each => total += (each.price*each.quantity))
     /* console.log(typeof total); */
  }

  return (
    <>
    <MenuNavbar />
    <div className='container'>
        <h1>Checkout</h1>
        <h3>Credit Card</h3>
        <input type="number" placeholder='Enter your credit card number' className='w-100 my-2' />
        <p>Order Total:- <span className='fw-bold'>${total.toFixed(2)}</span></p>
        <Link to="/ordersuccessfull">
            <button type="text" className='btn btn-dark fw-bold'>Checkout{">"}</button>
        </Link>
    </div>
    </>
  )
}
