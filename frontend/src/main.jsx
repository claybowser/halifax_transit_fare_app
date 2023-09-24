import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import Cancel from './pages/Cancel.jsx';
import Success from './pages/Success.jsx';
import Store from './pages/Store.jsx';
import Scanner from './pages/Scanner.jsx';
import Scannerv3 from './pages/Scannerv3.jsx';
import Receipts from './pages/Receipts.jsx';

// Create a CatchAllRoute component
const CatchAllRoute = () => {
  const navigate = useNavigate();

  // Use Navigate component to redirect to '/'
  return <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
<Route path='/' element={<App />}>
  <Route index={true} path='/' element={<HomeScreen />} />
  <Route path='/login' element={<LoginScreen />} /> {/* Add this line */}
  <Route path='/register' element={<RegisterScreen />} />
  <Route path='/scanner' element={<Scannerv3 />} />
  <Route path='/success' element={<Success/>} />
  <Route path='/cancel' element={<Cancel/>} />
  {/* PRIVATE ROUTES */}
  <Route path='' element={<PrivateRoute />} >
    <Route path='/profile' element={<ProfileScreen />} />
    <Route path='/productstore' element={<Store />} />
  <Route path='/receipts' element={<Receipts />} />
  </Route>

  <Route path='*' element={<CatchAllRoute />} />
</Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

