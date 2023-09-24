import { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { productsArray } from '../productStore';
import { CartContext } from '../CartContext';
import ProductCard from '../components/ProductCard';
import pride from '../pride.jpg';
import CartProduct from '../components/CartProduct';
import { useSelector, useDispatch } from 'react-redux';


function Store() {
  const backgroundImageStyle = {
    backgroundImage: `url(${pride})`,
    backgroundSize: 'cover', // Adjust this to control how the image is displayed
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    /* Additional CSS properties can be added here */
  };

  const contentStyle = {
    minHeight: 'calc(100vh - 200px)', // Adjust the 100px to your header's height
    //overflowY: 'auto', // Add this to allow scrolling when content exceeds the height
  };

  const cart = useContext(CartContext);
  const { userInfo } = useSelector((state) => state.auth);


  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch('https://192.53.120.7:8000/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: userInfo, items: cart.items})
    }).then((response) => {
        return response.json()
    }).then((response)=>{
        if(response.url) {
            window.location.assign(response.url);
        }
    })
  }

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  const [isHovered, setIsHovered] = useState(false);
      const [isFadedIn, setIsFadedIn] = useState(false);
      const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      useEffect(() => {
        // Set a timeout to trigger the fade in effect after a short delay (e.g., 500ms)
        const fadeInTimeout = setTimeout(() => {
          setIsFadedIn(true);
        }, 500);
    
        // Clear the timeout on unmount to prevent memory leaks
        return () => clearTimeout(fadeInTimeout);
      }, []);
  return (
    <div style={backgroundImageStyle}>
<h1 align="center" style={{ maxWidth: '70%', margin: '10px auto',paddingBottom: '10px', color: 'white', backgroundColor: 'rgba(20, 84, 129, 0.8)', borderRadius: '1px' }} className='p-3'>👋🦝 🇼🇪🇱🇨🇴🇲🇪 🇹🇴 🇹🇭🇪 🇸🇹🇴🇷🇪 🛒🏪</h1>
      <div style={contentStyle}>
        <Row xs={1} md={3} className="g-4">
          {productsArray.map((product, idx) => (
            <Col align="center" key={idx}>
              <ProductCard product={product} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}style={{backgroundColor: isHovered ? 'rgba(26, 102, 151, 1)' : 'rgba(26, 102, 151, 0.8)',}}/>
            </Col>
          ))}
<Button onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}style={{backgroundColor: isHovered ? 'rgba(20, 84, 129, 1)' : 'rgba(255, 255, 255, 0.8)',
            border: isHovered ? '2px solid rgba(20, 84, 129, 1)' : '2px solid',
        padding: '10px', // Add padding for better visibility
        transition: 'background-color 0.3s ease, opacity 0.5s ease', // Slower opacity transition
        cursor: 'pointer', // Change cursor on hover
        //opacity: isFadedIn ? 1 : 0, 
        margin: '0 auto', marginTop: '10px', 
        borderRadius:'1px',
        color: isHovered ? 'rgba(255, 255, 0, 1)' : 'rgba(20, 84, 129, 1)',
        }} onClick={handleShow}><h3>Checkout 🛒</h3></Button>
<Modal show={show} onHide={handleClose}>
  <Modal.Header style={{backgroundColor:'#1A6697',color:'white'}} closeButton>
    <Modal.Title className="text-center">Ticket Order</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ backgroundColor: '#002B49', color: 'white' }}>
    {productsCount > 0 ? (
      <>
        <h4 style={{color:'yellow'}}>Tickets:</h4>
        {cart.items.map((currentProduct, idx) => (
          <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
        ))}
        <h3>Total: ${cart.getTotalCost().toFixed(2)}</h3>
        <Button className='custom-button' onClick={checkout}>
          Purchase tickets
        </Button>
      </>
    ) : (
      <h4>There are no products in your cart.</h4>
    )}
  </Modal.Body>
</Modal>
        </Row>
      </div>
    </div>
  );
}

export default Store;
