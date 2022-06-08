import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUsers } from '../config/services';

export default function EnquiryForm() {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { name: '', email: '', mobileNumber: '',course:"", query:"", emailError: '', nameError: '', mobileNumberError: '', queryError: ''}
    );
    const navigate=useNavigate()
    const addItem=(event)=>{
        const{name,value}=event.target
    setState({[name]:value})
    }
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
    const queryValidation =()=>{
        const {query} = state
        if(query === ""){
          setState({queryError: "*this field is required"})
          return false
        }else {
          setState({queryError: ""})
          return true
        }
    }

    const onChangeInputField = event => {
        const {name, value} = event.target
        setState({ [name]: value });
    }

    const postDetails=(event)=>{
        const {name, email, contact, course, mobileNumber, query} = state
        event.preventDefault()
        const v1 = nameValidation()
        const v2 = emailValidation()
        const v3 = phoneNumberValidation()
        const v4 = queryValidation()

        if(v1 && v2 && v3 && v4){
            addUsers({name, email, contact, course, mobileNumber, query}).then(res=>{
                navigate('/userdetails')
            })
        }
    }
  return (
    <div className='container'>
        <h2>Form</h2>
        <form onSubmit={postDetails}>
            <div className='form-group'>
                <label for="nameId">Username</label>
                <input onChange={onChangeInputField} onBlur={nameValidation} type="text" className="form-control" id="name" name="name" placeholder='Enter Username' />
                <p className='text-danger fw-bold' id="error">{state.nameError}</p>
            </div>
            <div className='form-group'>
                <label for="emailId">Email</label>
                <input onChange={onChangeInputField} onBlur={emailValidation} type="email" className="form-control" id="email" name="email" placeholder='Enter Email' />
                <p className='text-danger fw-bold' id="error">{state.emailError}</p>
            </div>
            <div className="mb-3">
                <label for="mobileNumber">Mobile Number</label>
                <input onChange={onChangeInputField} onBlur={phoneNumberValidation} type="number" className="form-control" id="mobileNumber" name="mobileNumber" placeholder='Enter Mobile Number' />
                <p className='text-danger fw-bold' id="error">{state.mobileNumberError}</p>
            </div>
            <div className='form-group'>
                <label for="emailId">Query</label>
                <input onBlur={queryValidation} type="text" id='query' name='query' className='form-control' onChange={addItem} placeholder="Enter your query" />
                <p className='text-danger fw-bold'>{state.queryError}</p>
            </div>
            <div className='form-group mb-4'>
                <label for="courseId">Select Course</label>
                <select className='form-control' id='courseId' name='course' onChange={addItem}>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="React JS">React JS</option>
                <option value="Angular JS">Angular JS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Github">Github</option>
            </select>
            </div>
            <input type="submit" value="Submit" className='btn bg-success text-white'/>
        </form>
    </div>
  )
}
