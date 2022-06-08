import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {getCourse} from '../config/services'

export default function Courses() {
    const [course,setCourse]=useState([])
    useEffect(()=>{
        getCourse().then(res=>setCourse(res.data))
    },[])
  return (
    <div>
        <h1>Courses</h1>
        <div className='row justify-content-center align-items-center'>
            {course.map(items=>
                <div key={items.id} className="col-md-3 p-2 m-4 card">
                    <img width={200} height={260} src={items.imgUrl} className="w-100 course-image"/>
                    <Link to="/form" className='btn bg-warning text-dark fw-bold m-2'>Enquiry Now</Link>
                </div>
                )}
        </div>
    </div>
  )
}
