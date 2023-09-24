const checkConsentMiddleware = (req, res, next) => {
    // Check if the user has provided consent (based on the presence of a consent cookie or session variable)
    const hasConsented = req.cookies && req.cookies.consent === 'yes';
  
    if (!hasConsented) {
      // Handle cases where the user hasn't consented, e.g., redirect to the consent form
      return res.redirect('/consent'); // Redirect to the consent form route
    }
  
    // If the user has provided consent, capture user information
    const userData = {
      ip: req.ip, // Capture the user's IP address from the request
      country: req.headers['x-country'], // Capture the user's country from request headers
      location: req.headers['x-location'], // Capture the user's location from request headers
      device: req.device.type, // Capture the device type (you'll need the 'express-device' package for this)
      screenSize: req.headers['x-screen-size'], // Capture the screen size from request headers
      language: req.get('Accept-Language'), // Capture the preferred language from request headers
      // Add other fields from the request as needed
    };
  
    // Send this captured data to the server for storage (e.g., via a POST request)
    fetch('/capture-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        // Handle the response if needed
      })
      .catch((error) => {
        console.error('Error capturing user info:', error);
      });
  
    // Continue to the next middleware or route
    next();
  };
  
  export {checkConsentMiddleware}