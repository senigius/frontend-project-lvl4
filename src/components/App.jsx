import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Login from './Login.jsx';
import MissingPage from './MissingPage.jsx';
import useAuth from '../hooks/index.jsx';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.logged ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const Home = () => <h1>Home</h1>;

const App = () => (
    <Router>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Navbar.Brand as={Link} to="/">
              Amogus Chat
            </Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
          <Nav.Link as={Link} to="/404">NotFound</Nav.Link>
        </Nav>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Navbar>
        <Routes>
          <Route exact path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<MissingPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      <ToastContainer />
    </Router>
);

export default App;
