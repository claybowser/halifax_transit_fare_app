import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import Hero from '../components/Hero';

const HomeScreen = () => {
  // State to track whether the button is clicked
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleFetchData = () => {
    // Set the buttonClicked state to true when the button is clicked
    setButtonClicked(true);

    // Send a fetch request to '/' to trigger the middleware
    fetch('https://192.53.120.7', {
      method: 'GET', // You can use 'POST' or other HTTP methods if needed
      headers: {
        'Content-Type': 'application/json', // Adjust this based on your middleware
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Do not parse the response, just trigger the middleware
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <>

      <Hero />
    </>
  );
};

export default HomeScreen;
