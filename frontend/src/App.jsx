import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import CartContext from './CartContext';
import './index.css';
import Footer from './components/Footer';

const App = () => {
  const containerStyle = {
    
    backgroundColor: '#f0f0f0', // Replace with your desired shade of grey
  };
  return (
    <>
    <CartContext>
      <Header />
      <ToastContainer />
      <Container className='my-2' style={containerStyle}>
        <Outlet />
      </Container>
      <Footer />
    </CartContext>
    </>
  );
};

export default App;