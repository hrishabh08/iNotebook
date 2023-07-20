import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: '', password: '' })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),

        });

        const json = await response.json();
        console.log(json)

        if (json.success) {
            console.log("user authenticated")

            //save authtoken in local storage
            localStorage.setItem('token', json.authToken)
            props.showAlert("Login successful", "success")
            navigate('/');
        }
        else {
            props.showAlert("Username or password is incorrect , Register if new user", "danger")
        }


    }

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-5' style={{ maxWidth: '35rem', backgroundColor: 'white', border: '1px solid black', borderRadius: '10px' }}>
            <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Login</h3>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={handleChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credential.password} onChange={handleChange} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login
