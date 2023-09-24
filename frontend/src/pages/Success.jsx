import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using React Router.
import { Button } from 'react-bootstrap';
function Success() {
    return (
        <div style={{textAlign:'center'}}>
            <h1 className="custom-header">Thank you for your purchase.</h1>
            <Link to="/receipts"><Button className="custom-button">CLICK HERE TO VIEW TICKETS.</Button></Link>
            <div style={{height: '66vh'}}></div>
        </div>
    );
}

export default Success;
