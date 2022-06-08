import React, { useEffect, useState } from 'react'
import { getUserdetails } from '../config/services'

export default function Usersdetails() {
    const[users,getUsers]=useState([])
    const[istrue,setTrue]=useState(true)
    useEffect(()=>{
        getUserdetails().then(res=>{
            if(res){
                getUsers(res.data)
            }
        })
        if(users.length>0){
            setTrue(false)
        }else{
            setTrue(true)
        }
    })
  return (
    <div>
        <h2>User details</h2>
        <div className='container'>
            {istrue?<h3 className='text-center'>There is no Users</h3>:(
                <div className='row justify-content-center'>
                    {users.map(user=>
                    <div key={user.id} className="col-md-3 m-1 card">
                        <div className='card-body'>
                            <p><span className='fw-bold'>Username:</span> {user.name}</p>
                            <p><span className='fw-bold'>E-mail:</span> {user.email}</p>
                            <p><span className='fw-bold'>Contact:</span> {user.mobileNumber}</p>
                            <p><span className='fw-bold'>Query:</span> {user.query}</p>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}
