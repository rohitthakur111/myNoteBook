import react from 'react'
import Notes from './Notes';
const Home = (props) =>{
    return(
        <>
        <div>
            <div className="container my-3">
                
                <h3>Your Notes </h3>
                <Notes showAlert={props.showAlert}></Notes>
            </div>
        </div>
        </>
    )
}
export default Home;