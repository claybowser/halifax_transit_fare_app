import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const ScanResult = ({ data }) => {
  const [showCard, setShowCard] = useState(true); // Set initial state to true

  const handleClose = () => setShowCard(false);

  const convertProductIdToName = (productId) => {
    // Define a mapping of product IDs to names
    const productNames = {
      price_1NkfZyLB0AdTCUhB9bfAna0a: 'SENIOR YOUTH👵',
      price_1NkfZILB0AdTCUhB2gVNjjWR: 'ADULT👨',
      price_1NkfbBLB0AdTCUhBhD0z6G0c: 'CHILD👶',
    };
  
    // Convert the product ID to a name
    const productName = productNames[productId] || 'Unknown Product';
  
    return productName;
  };
  

  // Use useEffect to show the card when the component mounts
  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = () => setShowCard(true);

  return (
    <>
      {showCard && (
        <Card style={{backgroundColor:'#1A6697',color:'white'}}>
          <Card.Header>
            <Card.Title>Scan Result</Card.Title>
          </Card.Header>
          <Card.Body>
          <Card.Img src={data.qrCode} alt="QR Code" style={{ maxWidth: '25%', float:'right' }} />

            <Card.Text>ID: {data._id}</Card.Text>
            <Card.Text>User: {data.user}</Card.Text>
            <Card.Text>Created At: {data.createdAt}</Card.Text>
            <Card.Text>Expiry: {data.expiry}</Card.Text>

            {/* Display the products array */}
            <Card.Text>
              <h4>Tickets:</h4>
              <ul>
                {data.products.map((product, index) => (
                  <li key={index}>
                    <Card.Text>Ticket Type: {convertProductIdToName(product.id)} * {product.quantity}</Card.Text>
                    {/* <Card.Text>Quantity: {product.quantity}</Card.Text> */}
                    {/* Add more product fields here */}
                  </li>
                ))}
              </ul>
            </Card.Text>

          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ScanResult;
