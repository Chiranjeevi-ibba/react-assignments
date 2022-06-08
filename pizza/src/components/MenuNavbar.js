import React, {useContext} from 'react'
import Logo from '../Resources/Logo.png'
import { Link } from 'react-router-dom'
import { MyCartContext } from '../App'

export default function MenuNavbar() {

    const myCartData = useContext(MyCartContext)
    let { cartData } = myCartData

    const onClickLogoutBtn = () => {
        console.log("logout");
        localStorage.removeItem("validUser");
    }

    let userDetails = JSON.parse(localStorage.getItem('validUser'))
    console.log(userDetails);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className='d-flex justify-content--end align-items-end'>
                <Link to="/">
                    <img width={100} src={Logo} alt="Logo" />
                </Link>
                <h3>Welcome {userDetails[0].name}</h3>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link style={{ textDecoration: 'none' }} to="/menu">
                            <p className='nav-link fw-bold'>Menu</p>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/cart">
                            <p className='nav-link fw-bold'>Cart {cartData.length > 1 ? <span className='bg-dark text-white cart-count'>{cartData.length}</span> : ""}</p>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="#0">
                            <p className='nav-link fw-bold'>Profile</p>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/">
                            <button onClick={onClickLogoutBtn} className='nav-link btn btn-outline-secondary border border-secondary border-2 px-2 py-1 mx-2' style={{ fontWeight: 'bold' }} type='button'>Logout</button>
                        </Link>
                        

                    </div>
                </div>
            </div>
        </nav>
  )
}
