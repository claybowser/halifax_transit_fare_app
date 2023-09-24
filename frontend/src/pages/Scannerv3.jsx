import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import ScanResult from '../components/ScanResult.jsx'

function Scannerv3() {
  const [qrData, setQrData] = useState('No result');
  const [message, setMessage] = useState(''); // State to store response message
  const [receiptData, setReceiptData] = useState(null); // State to store receipt data

  
  // const [handleResult, setHandleResult] = useState('');
  const handleScan = async (result) => {
    if (result) {
      // Assuming result is an object with a 'text' property.
      setQrData(result.text); // Extract and set the 'text' property.
  
      // Create a data object to send in the fetch request.
      const data = {
        receiptId: result.text,
      };
  
      try {
        // Send a POST request to http://localhost:8000/scan with the data.
        const response = await fetch('https://192.53.120.7:8000/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
            const data = await response.json();
            //setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
            setMessage(data.message)
            setReceiptData(data.receipt)
            //setHandleResult(JSON.stringify(data.receipt))
            // You can handle the receipt data here if needed
          } else if (response.status === 404) {
            setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
            setReceiptData(data.receipt)
            //setHandleResult(JSON.stringify(data.receipt))
          } else if (response.status === 400) {
            const data = await response.json();
            setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
            setReceiptData(data.receipt)
            //setHandleResult(JSON.stringify(data.receipt))
            // You can handle the receipt data here if needed
          } else {
            setMessage('Internal server error');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred while processing the request');
        }
    }
  };
  
  useEffect(() => {
    // Check if the message state exists and is not an empty string
    if (message) {
      //alert(message); // Display an alert box with the message
      console.log(message)
    }
  }, [message]); // Trigger the effect when the message state changes


  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h2 className="custom-header"style={{textAlign:'center'}}>PLEASE SCAN TICKET QR CODE</h2>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        width='25%'
        style={{margin:'0 auto', display:'block'}}
      />
      {/* <p>{qrData}</p> Display the extracted 'text' property */}
      <h1 style={{color: message.includes('DENIED') ? 'red' : 'green', textAlign:'center'}}>{message}</h1>
      {receiptData && (<ScanResult data={receiptData}/>)}<div style={{height: '30vh'}}></div>
    </div>
  );
}

export default Scannerv3;
