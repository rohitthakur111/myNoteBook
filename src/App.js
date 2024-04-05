import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alerts';
import NoteState from './context/notes/NoteState';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const authToken = localStorage.getItem('authToken');
  // const navigate = useNavigate();
  const [user, setUser ] =  useState({ name : '', email : ''});
  //showAlert function 
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({ type: type, msg: message });
    setTimeout(function () {
      setAlert(null);
    }, 2000);
  }

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
    console.log(json);
    if (json.success) {
      setUser({ name: json.user.name, email: json.user.email });
    } else {
      localStorage.removeItem('authToken');
    }
  }
  useEffect(()=>{
    fetchUser(authToken);
  },[]);
  return (
    <>
      <NoteState showAlert={showAlert}>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}> </Route>
              <Route exact path="/about" element={<About />}> </Route>
              <Route exact path="/signIn" element={<SignIn showAlert={showAlert} />}> </Route>
              <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />}> </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
