import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {

  const [credentials, setCredentials] = useState({ Name: "", Email: "", Password: "", CPassword: "" })
  const navtoHome = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {


      const { Name, Email, Password } = credentials;
      const response = await fetch(`http://localhost:1800/api/auth/createuser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ Name, Email, Password }),
      });
      if (!response.ok) {
        props.showAlert("invelid credentials", "danger")
        return
      }
      const json = await response.json()

      localStorage.setItem('token', json.token);
      props.showAlert("account created successfully ", "success")
      navtoHome('/')
      console.log(json);
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }
  return (
    <div className='container mt-3'>
       
      <h2 className='my-3'>Create an accoute to use iNotbook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="Name" name='Name' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email" name='Email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="Email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="Password" className="form-control" id="Password" name='Password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type="Password" className="form-control" id="CPassword" name='CPassword' minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
