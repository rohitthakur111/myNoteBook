import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
const NoteItem = (props) => {
    const {note} = props;
    const showAlert= (msg)=>{
      props.showAlert("Your note is deleted");
    }
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
              <div className ="d-flex align-items-center">
                  <h5 className="card-title">{note.title}</h5>
                  <i className="fa fa-trash-o mx-2" onClick={showAlert}></i>
                  <i className="fa fa-edit mx-2"></i>
              </div>
                <p className="card-text">{note.description} </p> 
            </div>
            </div>
    </div>
  )
}

export default NoteItem;
