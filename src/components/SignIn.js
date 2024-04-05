import React, { useState, useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
const SignIn = (props) => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');   
    //~~~~~~~~~~~~~~~~~~~~~
    // login user function 
    const [loginerrors, setLoginerrors] = useState({ email: '', password: '' });
    const loginUser = async (email, password) => {
        // API call to get 
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const user = await response.json();
        if (user.success) {
            props.showAlert('success', 'Login Successfull !');
            setLoginerrors({ email: '', password: '' });
            localStorage.setItem('authToken', user.loginToken);
            navigate('/');
            return;
        }
        if (user.errors) {
            let newLoginError = {};
            user.errors.forEach(error => {
                newLoginError[error.path] = error.msg;
            });
            setLoginerrors(newLoginError);
            return;
        } else if (user.error) {
            props.showAlert('warning', user.error);
            setLoginerrors({ email: '', password: '' });
            return;
        } else {
            props.showAlert('warning', 'Please try later');
            setLoginerrors({ email: '', password: '' });
        }
    }
    // end login function 
    //~~~~~~~~~~~~~~~~~~~~~

    //sigIN user logic
    //~~~~~~~~~~~~~~~~~~~~~
    const [user, setUser] = useState({ email: "", password: "" });
    const loginInfo = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const login = (e) => {
        e.preventDefault();
        loginUser(user.email, user.password);
        if (loginerrors.email !== '' || loginerrors.password !== '') {
            return;
        }
        setUser({ email: "", password: "" });
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
            {!authToken && <div className="container d-flex  justify-content-center login-container">
                <div className="col-md-5 login-card">
                    <form onSubmit={login}>
                        <h3 className="text-center">Sign In</h3>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={loginInfo} value={user.email} />
                            <span className="text-danger errors">{loginerrors.email}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={loginInfo} value={user.password} />
                            <span className="text-danger errors">{loginerrors.password}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger w-100" disabled={user.email.indexOf('@') === -1 || user.password.length < 1}>Login</button>
                        </div>
                        <Link className="d-flex justify-content-center form_link" to="/signUp"> Don't have an account ? <span id="reg_form"> Sign Up</span></Link>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default SignIn


