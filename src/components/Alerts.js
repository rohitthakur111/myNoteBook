import React from 'react';

const Alert = (props) => {
    return (
        <>
            <div style={{height:"60px", padding: "5px",position:"sticky",top:"55px"}}>
                {props.alert && <div className="alert alert-primary lert-dismissible fade show" role="alert">
                    <strong>Sucess : </strong>{props.alert.msg}
                </div>}
            </div>
        </>
    )
}
export default Alert;
