import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = (props) => {
    //~~~~~~~~~~~~~~~~~~~~~yarn add react-router-dom
    // register user function 
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    const [errors, setErrors] = useState({ name: '', email: '', password: '' });
    const signUpUser = async (name, email, password) => {
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });
        const newUser = await response.json();
        if (newUser.success) {
            console.log(newUser);
            props.showAlert('success', 'Your Account is successfully created !');
            setErrors({ name: '', email: '', password: '' });
            localStorage.setItem('authToken', newUser.authToken);
            navigate('/');
            return;
        }

        if (newUser.errors) {
            const newErrors = {};
            newUser.errors.forEach(error => {
                newErrors[error.path] = error.msg;
            });
            setErrors(newErrors);
            return;
        } else if (newUser.error) {
            props.showAlert('warning', newUser.error);
            setErrors({ name: '', email: '', password: '' });
            return;
        }
        else {
            props.showAlert('warning', 'Please try later');
            setErrors({ name: '', email: '', password: '' });
        }
    }

    // end register user function 
    //~~~~~~~~~~~~~~~~~~~~~
    //signup user logic
    const [auth, setAuth] = useState({ sname: "", semail: "", spassword: "", sconfirmpassword: "" });
    const register = (e) => {
        e.preventDefault();
        setAuth({ ...auth, [e.target.name]: e.target.value });
    }
    const signUp = async (e) => {
        e.preventDefault();
        await signUpUser(auth.sname, auth.semail, auth.spassword);
        if (errors.name !== '' || errors.email !== '' || errors.password !== '') {
            return;
        }
        setAuth({ sname: "", semail: "", spassword: "", sconfirmpassword: "" });
    }
    // redirect page if user is already login 
    useEffect(() => {
        if (authToken) {
            navigate('/');
        }
    }, [navigate, authToken]);

    if (authToken) {
        return null; // or loading spinner or any other indicator
    }

    return (
        <>
            <div className="container d-flex  justify-content-center login-container">
                <div className="col-md-5 login-card">
                    <form onSubmit={signUp}>
                        <h3 className="text-center">Sign Up</h3>
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Name</label>
                            <input type="text" className="form-control" id="sname" name="sname" onChange={register} value={auth.sname} />
                            <span className="text-danger errors">{errors.name}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="semail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="semail" name="semail" onChange={register} value={auth.semail} />
                            <span className="text-danger errors">{errors.email}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="spassword" name="spassword" onChange={register} value={auth.spassword} />
                            <span className="text-danger errors">{errors.password}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sconfirmpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="sconfirmpassword" name="sconfirmpassword" onChange={register} value={auth.sconfirmpassword} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger w-100" disabled={auth.semail.indexOf('@') === -1 || auth.spassword.length < 1 || auth.spassword !== auth.sconfirmpassword}>Sign up</button>
                        </div>
                        <Link className="d-flex justify-content-center form_link " to="/signIn"> Already ready have Account ? <span id="login_form" > Sign In</span></Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
