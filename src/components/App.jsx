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
import Chat from './Chat.jsx';
import { useAuth } from '../hooks';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
    <Router>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Navbar.Brand as={Link} to="/">
              Amogus Chat
            </Navbar.Brand>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Navbar>
        <Routes>
          <Route exact path="/" element={
            <RequireAuth>
              <Chat />
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
