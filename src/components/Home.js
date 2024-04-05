import React, { useEffect } from 'react'
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = (props) =>{
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    // redirect to login if token is not availble 
    useEffect(() => {
        if (!authToken) {
            navigate('/signIn');
        }
    }, [navigate, authToken]);

    if (!authToken) {
        return null; // or loading spinner or any other indicator
    }
    return(
        <>
        {authToken &&
        <div>
            <div className="container my-3">
                <Notes showAlert={props.showAlert}></Notes>
            </div>
        </div> }
        </>
    )
}
export default Home;