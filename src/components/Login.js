import { useState } from "react"
import { useNavigate} from 'react-router-dom';
import React  from 'react'


const Login = (props) => {
    
  const [credentials, setCredentials] = useState({Email: "", Password: ""})
  const navtoHome = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()
try {
  

const response = await fetch(`http://localhost:1800/api/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({Email: credentials.Email, Password: credentials.Password }),
  });
  if (!response.ok) {
    props.showAlert("Login unsuccessful. Please try again.", "danger")
    return
  }
  const json = await response.json()

  //save the authtoken and  redirect
  if(json && json.token){

    localStorage.setItem('token',json.token);
    props.showAlert("account created successfully ", "success")
    navtoHome('/')
  }
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
    <div className="mt-3">
      <h2>login to continue with  iNotbook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.Email} name='Email' id="Email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" name='Password'  onChange={onChange} value={credentials.Password} className="form-control" id="Password"/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
