import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import './App.css'
import EnquiryForm from './components/EnquiryForm'
import UsersDetails from './components/UsersDetails'
export default function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/form' element={<EnquiryForm/>}/>
          <Route path='/userdetails' element={<UsersDetails/>}/>
        </Routes>
      </Router>
    </div>
  )
}
