import React, { useState, useEffect } from 'react';
import { ListGroup, Card, Row, Col, Button } from 'react-bootstrap';

const Receipts = () => {
  const [data, setData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // Track which card is hovered

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

  function formatReceiptDate(receiptCreatedAt) {
    // Assuming receiptCreatedAt is a JavaScript Date object
    const createdAt = new Date(receiptCreatedAt);

    // Get the year, month, day, hour, and minutes from the Date object
    const year = createdAt.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const day = String(createdAt.getDate()).padStart(2, '0');
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');

    // Combine the components into the desired format
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
  }

    function formatReceiptDate(receiptCreatedAt) {
    // Assuming receiptCreatedAt is a JavaScript Date object
    const createdAt = new Date(receiptCreatedAt);

    // Get the year, month, day, hour, and minutes from the Date object
    const year = createdAt.getFullYear().toString(); //.slice(-2) Get the last two digits of the year
    const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const day = String(createdAt.getDate()).padStart(2, '0');
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');

    // Combine the components into the desired format
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
  }

  function formatReceiptActivation(receiptExpiry) {
    if (receiptExpiry === null) {
      return 'N/A';
  }
  
    // Assuming receiptExpiry is a JavaScript Date object
    const expiryTime = new Date(receiptExpiry);

    // Subtract two hours from the expiry time
    expiryTime.setHours(expiryTime.getHours() - 2);

    // Get the hours and minutes in 12-hour AM/PM format
    const hours = expiryTime.getHours() % 12 || 12; // Handle midnight (0) as 12 AM
    const minutes = String(expiryTime.getMinutes()).padStart(2, '0');
    const amPm = expiryTime.getHours() < 12 ? 'AM' : 'PM';

    // Combine the components into the desired format
    const formattedTime = `${hours}:${minutes}${amPm}`;

    return formattedTime;
}


  function calculateTimeRemaining(expiryTime) {
    if (expiryTime == null) {
      return 'Forever';
    }
    const now = new Date();
    const expiryDate = new Date(expiryTime);
    const timeRemaining = expiryDate - now;

    if (timeRemaining <= 0) {
      return 'Expired';
    }

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    // Check screen size and update state
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the screen width as needed
    };
  
    // Initial check on component mount
    handleResize();
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/receipts', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData(result.map((receipt) => ({
          ...receipt,
          timeRemaining: calculateTimeRemaining(receipt.expiry),
          activationTime: formatReceiptActivation(receipt.expiry),
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 1000);
  
    // Cleanup interval and event listener on unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div>
      {data && data.length > 0 ? (
        <ListGroup style={{ maxWidth: '700px', margin: '0 auto' }}>
          {data.map((receipt, index) => (
            <Card key={index} style={{ 
              minHeight: '300px',
              backgroundColor: 'white', 
              color: 'black', 
              marginBottom: '20px',
              backgroundImage: isSmallScreen ? 'none' : 'url("ticket_upscale.png")',            backgroundSize: 'contain', // This will maintain the aspect ratio
            backgroundRepeat: 'no-repeat', // Adjust background repeat as needed
            backgroundPosition: 'right center', // Center the image horizontally and vertically
            boxShadow: hoveredCard === index ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.3s ease-in-out', // Add transition for smoother hover effect
              }}
              onMouseEnter={() => setHoveredCard(index)} // Set the hovered card
              onMouseLeave={() => setHoveredCard(null)} // Clear the hovered card
            >

                <Card.Title className="">
                </Card.Title>
              <Card.Body>

                <div id={`content-${index}`} className="content">
                  <Row style={{minHeight: '300px',}}>
                    <Col sm={12} md={8}  className="d-md-flex justify-content-center align-items-center">
                      <div style={{}}>
                        {/* <p>ID: {receipt._id}</p> */}
                        <h4>Time Activated: {formatReceiptActivation(receipt.expiry)} </h4>
                        <h4>Time Remaining: {calculateTimeRemaining(receipt.expiry)}</h4>
                        <h3 style={{ color: 'black' }}>Trip #{data.length - index} - {formatReceiptDate(receipt.createdAt)}</h3>

                        <h4>Tickets:</h4>
                        <ul style={{ listStyle: 'none' }}>
                          {receipt.products.map((product, productIndex) => (
                            <div key={productIndex}>
                              <li><h3>{convertProductIdToName(product.id)} * {product.quantity}</h3></li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col sm={12} md={3} className="d-md-flex justify-content-center align-items-center">
  {/* Make the QR Code take up full width */}
  <img src={receipt.qrCode} alt="QR Code" style={{ width: '100%' }} />
</Col>
                  </Row>
                </div>
              </Card.Body>
              
            </Card>
          ))}
        </ListGroup>
      ) : (
<h1 style={{ textAlign: 'center' }}>
  {data ? (<>
    <Button className="custom-button"href="http://localhost:3000/productstore" style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#1A6697', color: 'white', borderRadius: '5px', fontSize: '18px' }}>
      PLEASE PURCHASE TICKETS
    </Button><div style={{height: '75vh'}}></div></>
  ) : (<>
    <Button className="custom-button"href="http://localhost:3000/productstore" style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#1A6697', color: 'white', borderRadius: '5px', fontSize: '18px' }}>
      PLEASE PURCHASE TICKETS
    </Button><div style={{height: '75vh'}}></div></>
  )}
</h1>

)}
    </div>
  );
};

export default Receipts;
