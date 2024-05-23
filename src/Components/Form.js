import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Form() {
    const navigate=useNavigate()
   const [newStudent,setNewStudent]=useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Contact:""
   })

   const handleChange=(event,name)=>{
    setNewStudent({...newStudent,[name]:event.target.value})
   }

   const handleSubmit=()=>{
    if(newStudent.FirstName==="" || newStudent.LastName==="" || newStudent.Email==="" || newStudent.Contact===""){
        toast.error("Inputs Missing")
        return;
    }
    
    axios.post("https://660a4a470f324a9a2884838b.mockapi.io/CrudData",newStudent).then((resp)=>{
        console.log(resp)
        toast.success("Added Successfully")
    }).catch((err)=>{
        console.log(err)
    })

    navigate('/list')
   }


    return (
        <div className='container w-50 m-auto'>
            <>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">First name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" onChange={(e)=>handleChange(e,"FirstName")}/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" onChange={(e)=>handleChange(e,"LastName")}/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e)=>handleChange(e,"Email")}/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Contact</label>
                    <input type="tel" class="form-control" id="exampleInputEmail1" onChange={(e)=>handleChange(e,"Contact")}/>
                </div>

               <button className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
            </> 
        </div>
    )
}

export default Form