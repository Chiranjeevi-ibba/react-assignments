import React, { useContext} from 'react'
import MenuNavbar from './MenuNavbar'
import { MyCartContext } from '../App'
import { Link } from 'react-router-dom'

export default function Cart() {

  const myCartData = useContext(MyCartContext)
  let { cartData, onChangecartItems } = myCartData

  let total = 0

  if(cartData.length > 0) {
     /* total = cartData.reduce((sum, each) => console.log((sum) += parseInt(each.price))) */
     cartData.map(each => total += (each.price*each.quantity))
     /* console.log(typeof total); */
  }
  
  return (
    <>
      <MenuNavbar />
      <h1 className='m-5'>Shopping Cart</h1>
      {cartData.length > 1 ? (
        <div>
        <ul className='container'>
          {cartData.map(each => {

            const onChangeInputField = event => {
              console.log(event.target.value);
              cartData = cartData.map(eachInnerCart => {
                let updatedquantity = 1
                if(event.target.value > 0) {
                  updatedquantity = event.target.value
                }
                if(eachInnerCart.id === each.id) {
                  return {...eachInnerCart, quantity: parseInt(updatedquantity)}
                }
                return eachInnerCart
              })
              /* console.log(cartData); */
              localStorage.setItem('myPizzaCart', JSON.stringify(cartData))
              onChangecartItems(cartData);
            }

            const onClickDeleteButton = () => {
              const updatedData = cartData.filter(item => item.id !== each.id)
              /* console.log(updatedData); */
              localStorage.setItem('myPizzaCart', JSON.stringify(updatedData))
              onChangecartItems(updatedData);
            }

            return (
              <li key={each.id} className='p-2 d-flex justify-content-between align-items-center border border-start-0 border-end-0 border-secondary'>
                <img width={100} src={each.image} alt={each.name} />
                <p className='fw-bold fs-6' style={{width: "120px"}}>{each.name}</p>
                <p className='fw-bold'>${(each.price)}</p>
                <input onChange={onChangeInputField} defaultValue={each.quantity} type="text" />
                <button onClick={onClickDeleteButton} type="text" className='btn btn-dark '>Delete</button>
              </li>
            )
          })}
        </ul>
        <div className='checkout-outer-cont container d-flex justify-content-end aligrn-items-center'>
          <div style={{width:"55%"}} className='checkout-cont d-flex justify-content-between align-items-center'>
            <p className='fw-bold'>${total.toFixed(2)}</p>
            <Link to="/checkout">
            <button type="text" className='btn btn-dark fw-bold'>Checkout{">"}</button>
            </Link>
          </div>
        </div>
      </div>
      ) : (
        <div>
          <h1>No Items in the cart</h1>
        </div>
      )}
      

    </>
  )
}
