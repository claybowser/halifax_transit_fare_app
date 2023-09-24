import {useState} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    // State to track whether the button is clicked
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleFetchData = () => {
      // Set the buttonClicked state to true when the button is clicked
      setButtonClicked(true);
  
      // Send a fetch request to '/' to trigger the middleware
      fetch('http://localhost:8000', {
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
    <div className=' py-2'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card  w-100' style={{background:'#002C49', color:'white'}}>
          <h1 className='text-center mb-4'  style={{color:'rgba(255, 200, 65)'}}>Halifax Transit Fare Application version 1.0</h1>
          <div className="my-4" style={{ width: '100%',border: '1px solid white' }} ></div>
          <h2>Help Pave the Way for Our Transit App!</h2>
          <p className='text-center mb-4'>
While we're working hard to bring our app to the city, your support can make a difference today. By donating, you're not only helping us maintain and improve the app but also demonstrating the demand for this valuable service. Every contribution counts, and together, we can make commuting in our city more convenient for everyone. Thank you for your generosity!</p>
          <Button style={{fontSize: '2rem'}} href={'https://www.paypal.com/donate/?business=Z3D47GP5FFKHE&no_recurring=1&item_name=Empower+our+app%27s+journey+with+your+donation.+Every+bit+helps+us+improve+transit+for+all.+Thank+you%21&currency_code=CAD'} className='custom-button' target="_blank">Donate</Button>
          <div className="my-4" style={{ width: '100%',border: '1px solid white' }} ></div>

          <p className='text-center mb-4'>
          This is a MERN application that allows authenticated users 
          to view and purchase transit tickets. It uses Stripe to 
          handle online payments securely via credit card. It also includes 
          the ability to validate a users ticket according to the tickets expiry 
          via the 'scanner' route. </p>
          <ul>
  <li>Simplifies ticket system with grouped QR codes.</li>
  <li>Scanned QR codes update the database instantly.</li>
  <li>Prioritizes security with HTTP-only tokens and Stripe for payments.</li>
  <li>Boosts city revenue by improving fare collection.</li>
  <li>Improves accessibility to transit users.</li>
  <li>Future plans: enhance security, improve data collection & user experience.</li>
  <li>Open to collaboration, contact me at <a href="mailto:claybowser95@hotmail.com">claybowser95@hotmail.com</a>.</li>
</ul>
          <p style={{textAlign:'center'}}>To get started, please register an account & make a purchase using the following test credit card information:</p>
          <ul style={{borderRadius:'5px',border:'1px solid white',listStyle:'none', textAlign:'right', padding:'5px'}}>
            <li>#: 4242 4242 4242 4242</li>
            <li>Expiry: 12/34</li>
            <li>CVC: 123</li>
          </ul>

      
          <div className='d-flex'>
            <LinkContainer to ='/login'>
            <Button className='me-3 custom-button'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
            <Button variant='secondary'className='me-3 custom-button'>
              Register
            </Button>
            </LinkContainer>
            <LinkContainer to='/scanner'className='me-3 custom-button'>
            <Button variant='warning'>
              Scanner
            </Button>
            </LinkContainer>
            <LinkContainer to='/productstore'>
            <Button variant='success' className='custom-button'>
              Purchase Tickets
            </Button>
            </LinkContainer>
          </div>
          <p className='my-2' style={{textAlign:'center', paddingTop: '5px'}}>Would you like to contribute to improving my app? You can do so by sharing your device's data with me. Just click 'Grant Data Consent' below to get started.</p>
          <div style={{display:'flex',justifyContent:'center'}}>
            
      {buttonClicked ? (
        <h3 style={{textAlign:'center'}}>Your valuable contribution is much appreciated. Your data has been securely saved on my server. Have a fantastic day!</h3>
      ) : (
        <Button style={{ marginTop: '10px', display:'inline-block' }} variant="danger" onClick={handleFetchData}>
        Grant Data Consent
      </Button>)}</div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;