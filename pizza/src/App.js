import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Menu from './components/Menu'
import Cart from './components/Cart'
import Checkout from './components/Checkout';
import OrderSuccessfull from './components/OrderSuccessfull';
import './App.css';

export const MyCartContext = createContext()

function App() {

  const [cartData, setCartData] = useState([])
  

  useEffect(() => {
    if(localStorage.getItem('myPizzaCart') != undefined) {
      let arr = JSON.parse(localStorage.getItem('myPizzaCart'))
      setCartData(arr)
    }
  }, [])
  
  const onChangecartItems = data => {
    setCartData(data)
  }

  return (
    <div>
      <MyCartContext.Provider value={{cartData, onChangecartItems}} >
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/ordersuccessfull" element={<OrderSuccessfull />} />
        </Routes>
      </Router>
      </MyCartContext.Provider>
    </div>
  );
}

export default App;
