import React, { useState, useEffect } from 'react';
import {QrReader } from 'react-qr-reader';

function Scanner() {
   const [scanResultFile, setScanResultFile] = useState('');
   const [data, setData] = useState('No result');

  const [receiptId, setReceiptId] = useState(''); // State to store receiptId
  const [message, setMessage] = useState(''); // State to store response message
  const [receipt, setReceipt] = useState('');
  const handleScan = async () => {
    try {
      // Send a POST request to the server
      const response = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiptId }), // Send the receiptId in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
        // You can handle the receipt data here if needed
      } else if (response.status === 404) {
        setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setMessage(`Error: ${data.message} Receipt data ${JSON.stringify(data.receipt)}`);
        // You can handle the receipt data here if needed
      } else {
        setMessage('Internal server error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing the request');
    }
  };

  return (
    <div>
      <h1>This is the scanning page.</h1>
      <input
        type="text"
        placeholder="Enter receipt ID"
        value={receiptId}
        onChange={(e) => setReceiptId(e.target.value)}
      />
      <button onClick={handleScan}>Scan Receipt</button>
      <div>
        <p>{message}</p>
      </div>
      
    </div>
  );
}

export default Scanner;