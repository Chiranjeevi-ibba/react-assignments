import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MenuNavbar from './MenuNavbar'
import { APIURL } from '../server/Url'
import { MyCartContext } from '../App'

export default function Menu() {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(APIURL)
            .then(res => (setItems(res.data)))
            .catch(err => console.log(err))
    }, [])

    const myCartData = useContext(MyCartContext)
    const { cartData, onChangecartItems } = myCartData

  /*   const getItemsData = (id) => {
        let eachData = []
        axios.get(`${APIURL}${id}`)
            .then(res => {
                eachData.push(res.data)
                localStorage.setItem('myPizzaCart', JSON.stringify(eachData))
                onChangecartItems(eachData)
            })
    } */



    /*  console.log(items) */

    return (
        <>
            <MenuNavbar />
            <h1 className='ms-4'>Menu</h1>
            <div className='container d-flex justify-content-center align-items-center flex-wrap '>
                {items.map(each => {

                    const addToCart = () => {
                        if (localStorage.getItem('myPizzaCart') != undefined) {
                            /* console.log(each.id) */
                            let arr = JSON.parse(localStorage.getItem('myPizzaCart'))
                            const checker = arr.filter(eachObj => eachObj.id === each.id)
                            if (checker.length !== 0) {
                                alert('Item alredy added into the cart')
                            } else {
                                axios.get(`${APIURL}${each.id}`)
                                    .then(res => {
                                        /* eachData.push(res.data) */
                                        arr.push(res.data)
                                        console.log(arr)
                                        localStorage.setItem('myPizzaCart', JSON.stringify(arr))
                                        onChangecartItems(arr)
                                    })
                                alert("Item is Added to the cart")
                            }

                        } else {
                            let arr = []
                            axios.get(`${APIURL}${each.id}`)
                                .then(res => {
                                    /* eachData.push(res.data) */
                                    arr.push(res.data)
                                    localStorage.setItem('myPizzaCart', JSON.stringify(arr))
                                    onChangecartItems(arr)
                                })
                            alert("Item is Added to the cart")
                        }
                    }

                    return (
                        <div key={each.id} className='card d-flex flex-column justify-content-center align-items-center m-3 p-2'>
                            <img width={270} src={each.image} alt={each.name} />
                            <h3>{each.name}</h3>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button onClick={addToCart} className='btn btn-dark fw-bold mx-3'>Add to Cart</button>
                                <p className='fw-bold'>{each.price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
