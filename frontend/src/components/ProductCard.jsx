import { Card, Button, Form, Row, Col} from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext, useState, useEffect  } from 'react';

function ProductCard(props) { //props.product is what we selling
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);
    console.log(cart.items);
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
    
      const highlightStyle = {
        color: 'black',
        //backgroundColor: isHovered ? 'rgba(26, 102, 151, 1)' : 'rgba(26, 102, 151, 0.8)',
        backgroundColor: 'white',
        textAlign: 'left',
        //padding: '10px', // Add padding for better visibility
        transition: 'background-color 0.3s ease, opacity 0.5s ease', // Slower opacity transition
        //cursor: 'pointer', // Change cursor on hover
        boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease-in-out', // Add transition for smoother hover effect

      };
      
      return (
        <Card
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            ...highlightStyle,
            display: 'flex', // Use flexbox to control the spacing
  justifyContent: 'space-evenly', // Center and evenly distribute the elements
            color: 'rgba(20, 84, 129, 1)',
            backgroundImage: 'url("ticket_upscale.png")', // Set the background image here
            backgroundSize: 'auto 100%', // This will maintain the aspect ratio
            backgroundRepeat: 'no-repeat', // Adjust background repeat as needed
            backgroundPosition: 'right center', // Center the image horizontally and vertically
            //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a small shadow

          }}
        >
          <Card.Body>
          <div>
              <h1>${product.price}</h1>
            </div>
            <Card.Title>
              <h2>{convertProductIdToName(product.id)}</h2>
            </Card.Title>
            
            {productQuantity > 0 ? (
              <>
                <Form as={Row}>
                  <Form.Label column sm="6">
                    <h3>In Cart: {productQuantity}</h3>
                  </Form.Label>
                  <Col sm="6" md='12'>
                    <Button
                      style={{ minWidth:'5px',backgroundColor: '#002B49' }}
                      onClick={() => cart.addOneToCart(product.id)}
                      className='custom-button'
                    >
                      <h3 style={{margin:'0',padding:'0', fontFamily: 'monospace',}}>+</h3>
                    </Button>
                    <Button
                      style={{ backgroundColor: '#002B49', display:'inline' }}
                      onClick={() => cart.removeOneFromCart(product.id)}
                      className='mx-2 custom-button'
                    >
                      <h3 style={{margin:'0',padding:'0',fontFamily: 'monospace',}}>-</h3>
                    </Button>
                  </Col>
                </Form>
                <Button
                  variant="danger"
                  onClick={() => cart.deleteFromCart(product.id)}
                  className='my-2'
                >
                  Remove from cart
                </Button>
              </>
            ) : (
              <Button
                style={{ backgroundColor: '#002B49' }}
                variant="primary"
                onClick={() => cart.addOneToCart(product.id)} className='custom-button'
              >
                Add to Cart
              </Button>
            )}
          </Card.Body>
        </Card>
      );
}

export default ProductCard;