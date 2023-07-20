import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {


    const navigate = useNavigate();
    const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' })

    const handlesubmit = async (e) => {

        //Check confirm password
        if (credential.password === credential.cpassword) {

            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),

            });

            const json = await response.json();

            if (json.success) {
                props.showAlert("New User Created", "success")
                navigate('/login');
            }
            else {
                props.showAlert("Wrong credentials used", "danger")
            }
        }
        else {
            props.showAlert("Please correct the password", "danger")
        }

    }

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });

    };
    return (

        <div className='container my-5' style={{ maxWidth: '35rem', backgroundColor: 'white', border: '1px solid black', borderRadius: '10px' }}>
            <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Sign Up</h3>
            <form onSubmit={handlesubmit}>
                <div className="form-group ">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credential.name} onChange={handleChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={handleChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credential.password} onChange={handleChange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" value={credential.cpassword} onChange={handleChange} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
