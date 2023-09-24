// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

const Header = () => {
  

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const cart = useContext(CartContext);

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch('http://localhost:8000/checkout', {
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
  
  return (
    <header>
      <Navbar style={{minHeight:'100px', background: 'linear-gradient(-45deg, #1A6697 40%, #002C49 40%)' }} bg='blue' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            
            <Navbar.Brand><img style={{maxWidth: '180px'}} src="../logo.svg" alt="Your Logo" className="logo" /><h3>TRANSIT FARE APP <span style={{color:'rgba(255, 200, 65)'}}>BY CLAY BOWSER</span>
🧙‍♂️✨</h3></Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                    <LinkContainer to='/receipts'>
    <Nav.Link>
      My Tickets
    </Nav.Link>
  </LinkContainer>
  <LinkContainer to='/productstore'>
    <Nav.Link>
      Purchase Tickets
    </Nav.Link>
  </LinkContainer>

                  <NavDropdown title={userInfo.name} id='username'>
                    
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              <Button className='custom-button' style={{backgroundColor: '#002B49'}} onClick={handleShow}>Cart {productsCount} Items</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
        <Button className='custom-button'  onClick={checkout}>
          Purchase tickets
        </Button>
      </>
    ) : (
      <h4>There are no products in your cart.</h4>
    )}
  </Modal.Body>
</Modal>
    </header>
  );
};

export default Header;