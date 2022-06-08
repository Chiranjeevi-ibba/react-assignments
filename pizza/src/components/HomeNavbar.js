import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Resources/Logo.png'
export default function HomeNavbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/">
                    <img width={100} src={Logo} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link style={{ textDecoration: 'none' }} to="/signup">
                            <button className='nav-link btn btn-outline-secondary border border-secondary border-2 px-2 py-1 mx-2' style={{ fontWeight: 'bold' }} type='button'>Sign Up</button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/login">
                            <button className='nav-link btn btn-outline-secondary border border-secondary border-2 px-2 py-1 mx-2' style={{ fontWeight: 'bold' }} type='button'>Login</button>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}
