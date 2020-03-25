import React from 'react'


// implement JWT
// persist response to local storage
// refresh 2 weeks
// auto send token with every POST/DELETE

const Login = () => {
  return (
    <div className="container">
      <label htmlFor="p4ssw0rd">Enter password:</label>
      <input type="password" id="p4ssw0rd" className="form-control"/>
      <button className="btn btn-primary">Submit</button>
    </div>
  )
}

export default Login