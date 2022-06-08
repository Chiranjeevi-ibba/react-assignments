import React, { useReducer } from 'react'
import HomeNavbar from './HomeNavbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HOMEURL } from '../server/Url';

export default function Login() {

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {loginError:"", name: '', password: '', nameError: '', passwordError: '' }
    );
    const navigate = useNavigate()

    const nameValidation = () => {
        console.log('name validation');
        const { name } = state
        let regexp = /^[a-zA-Z]{2,50}$/
        if (name === "") {
            setState({ nameError: "*this field is required" })
            return false
        } else if (regexp.test(name) === false) {
            setState({ nameError: "*please enter valid name with minimum one Capital and one Small letter" })
            return false
        } else {
            setState({ nameError: "" })
            return true
        }
    }
    const passwordValidation = () => {
        const { password } = state
        let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
        if (password === "") {
            setState({ passwordError: "*this field is required" })
            return false
        } else if (regexp.test(password) === false) {
            setState({ passwordError: "*please enter valid password with minimum 8 characters and one capital letter, one small letter, one number, one special char from !@#$%^&*" })
            return false
        } else {
            setState({ passwordError: "" })
            return true
        }
    }
    const onSubmitForm = event => {
        event.preventDefault()
        const { name, password } = state
        let v1 = nameValidation()
        let v2 = passwordValidation()

        const logindetails = { name, password }

        if (v1 && v2) {
            console.log(logindetails);
            setState({loginError: ""})
            axios.get(`${HOMEURL}users`)
            .then(res => {
                console.log(res.data);
                const isValid = false
                const updatedData = res.data.filter(each => {
                    if((each.name === logindetails.name) && (each.password == logindetails.password)) {
                        console.log("true");
                        return true
                        
                    }
                    return false
                })
                if(updatedData.length > 0) {
                    localStorage.setItem('validUser', JSON.stringify(updatedData))
                    navigate('/menu')
                }
            })
        }else {
            setState({loginError: "please Enter Valid Username and Password"})
        }

    }

    const onChangeInputField = event => {
        const { name, value } = event.target
        setState({ [name]: value });
    }


    
    return (
        <>
            <HomeNavbar />
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={onSubmitForm}>
                    <div className="mb-3">
                        <input onChange={onChangeInputField} onBlur={nameValidation} type="text" className="form-control" id="name" name="name" placeholder='Enter Username' />
                        <p className='text-danger fw-bold' id="error">{state.nameError}</p>
                    </div>
                    <div className="mb-3">
                        <input onBlur={passwordValidation} onChange={onChangeInputField} type="password" className="form-control" id="password" name="password" placeholder='Enter Password' />
                        <p className='text-danger fw-bold' id="error">{state.passwordError}</p>
                    </div>
                    <button type="submit" className="btn btn-dark">Login</button>
                    <p className='text-danger fw-bold' id="error">{state.loginError}</p>
                </form>
            </div>
        </>
    )
}
