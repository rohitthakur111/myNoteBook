import './App.css';
import React,{ useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alerts';
import NoteState from './context/notes/NoteState';
function App() {
    const [alert, setAlert] =useState(null);
  const showAlert=(message)=>{
    setAlert({msg : message});
    setTimeout(function(){
      setAlert(null);
    },1500);
  }
  //showAlert();
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}> </Route>
            <Route exact path="/about" element={<About />}> </Route>

          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
