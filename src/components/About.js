import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const [user, setUser ] =  useState({ name : '', email : ''});
    const [auth, authErrors] = useState({name: '', email : ''});
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    // redirect if token is not availble 
    useEffect(()=>{
        if(!authToken){
            navigate('/');
        }
    }, [navigate, authToken]);
    // fetch user detail using auth token 
    const fetchUser = async (authToken) => {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": authToken
            }
        });
        const json = await response.json();
        if(json.success){
            setUser({ name : json.user.name, email : json.user.email});
        }else{
            localStorage.removeItem('authToken');
            navigate('/');
        }
    }
    useEffect(()=>{
        if(authToken){
            fetchUser(authToken);
        }
    },[]);
    
    //set value of user on channge 
    const userInfo = (e) =>{
        setUser({...user,[e.target.name]: e.target.value});
    }
    const updateUser = (e) =>{
        e.preventDefault();
    }

    // retur null if user not availble 
    if (! authToken) {
        return null; // or loading spinner or any other indicator
    }

    return (
        <div>
            {authToken && <div className="container d-flex  justify-content-center login-container">
                <div className="col-md-5 login-card">
                    <form onSubmit={updateUser}>
                        <h3 className="text-center">My Account </h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"> Name</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={userInfo} value={user.name} />
                            <span className="text-danger errors">{auth.name}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={userInfo} value={user.email} />
                            <span className="text-danger errors">{auth.email}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger w-100" disabled={user.email.indexOf('@') === -1 || user.name.length < 0}>Update</button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default About
