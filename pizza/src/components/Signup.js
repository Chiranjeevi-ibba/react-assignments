import React, {useReducer} from 'react'
import HomeNavbar from './HomeNavbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HOMEURL } from '../server/Url';


export default function Signup() {

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { name: '', password: '', cnfPassword: '', email: '', mobileNumber: '', nameError: '', passwordError: '', cnfPasswordError: '', emailError: '', mobileNumberError: '' }
    );
    const navigate = useNavigate()

    const nameValidation = () => {
        console.log('name validation');
        const {name} = state
        let regexp = /^[a-zA-Z]{2,50}$/
        if (name === "") {
            setState({nameError: "*this field is required"})
            return false
        }else if(regexp.test(name) === false){
            setState({nameError: "*please enter valid name with minimum one Capital and one Small letter"})
            return false
        } else {
            setState({nameError: ""})
            return true
        }
    }
    const passwordValidation = () => {
        const {password} = state
        let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
        if (password === "") {
            setState({passwordError: "*this field is required"})
            return false
        }else if(regexp.test(password) === false){
            setState({passwordError: "*please enter valid password with minimum 8 characters and one capital letter, one small letter, one number, one special char from !@#$%^&*"})
            return false
        } else {
            setState({passwordError: ""})
            return true
        }
    }
    const confirmPassword =() => {
        const {cnfPassword, password} = state
        if(cnfPassword === "") {
            setState({cnfPasswordError: "*this field is required"})
            return false
        }else if(password !== cnfPassword){
            setState({cnfPasswordError: "*password and confirm password are not matched"})
            return false
        }else {
            setState({cnfPasswordError: ""})
            return true
        }
    }
    const  emailValidation = () => {
        const {email} = state
        let index = email.indexOf("@")
        if (email === "") {
            setState({emailError: "*this field is required"})
            return false
        }else if(index==-1) {
            setState({emailError: "*please enter valid email"})
            return false
        }else {
            setState({emailError: ""})
            return true
        }
    }
    const phoneNumberValidation = () => {
        const {mobileNumber} = state
        let regexp = /^[6-9][0-9]{9}$/
        if (mobileNumber === "") {
            setState({mobileNumberError: "*this field is required"})
            return false
        }else if (regexp.test(mobileNumber)==false){
            setState({mobileNumberError: "*mobile number must be starts with 6-9 and numeric only"})
            return false
        }else if (mobileNumber.length !== 10){
            setState({mobileNumberError: "*mobile number contains mimimum 10 numbers"})
            return false
        } else {
            setState({mobileNumberError: ""})
            return true
        }
    }

    const onChangeInputField = event => {
        const {name, value} = event.target
        setState({ [name]: value });
    }

    const validation = event => {
        event.preventDefault()

        let v1 = nameValidation()
        let v2 = passwordValidation()
        let v3 = confirmPassword()
        let v4 = emailValidation()
        let v5 = phoneNumberValidation()
        const {name, password, cnfPassword, email, mobileNumber} = state

        if( v1 && v2 && v3 && v4 && v5) {
            console.log("validation successfull")
            axios.post(`${HOMEURL}users/`, {name, password, cnfPassword, email, mobileNumber})
            navigate("/login")
        }else {
            console.log("validation not successfull")
        }

    }

   


    return (
        <>
            <HomeNavbar />
            <div className='container'>
                <h1>Sign Up</h1>
                <form onSubmit={validation}>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={nameValidation} type="text" className="form-control" id="name" name="name" placeholder='Enter Username' />
                        <p className='text-danger fw-bold' id="error">{state.nameError}</p>
                    </div>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={passwordValidation} type="password" className="form-control" id="password" name="password" placeholder='Enter Password' />
                        <p className='text-danger fw-bold' id="error">{state.passwordError}</p>
                    </div>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={confirmPassword} type="password" className="form-control" id="cnfPassword" name="cnfPassword" placeholder='Enter Confirm Password' />
                        <p className='text-danger fw-bold' id="error">{state.cnfPasswordError}</p>
                    </div>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={emailValidation} type="email" className="form-control" id="email" name="email" placeholder='Enter Email' />
                        <p className='text-danger fw-bold' id="error">{state.emailError}</p>
                    </div>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={phoneNumberValidation} type="number" className="form-control" id="mobileNumber" name="mobileNumber" placeholder='Enter Mobile Number' />
                        <p className='text-danger fw-bold' id="error">{state.mobileNumberError}</p>
                    </div>
                    <button type="submit" className="btn btn-dark">Sign Up</button>
                </form>
            </div>
        </>
    )
}
