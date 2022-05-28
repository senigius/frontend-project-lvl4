import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Navbar, Nav, Container } from 'react-bootstrap';
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
        <Navbar className="p-2 mb-2 bg-dark text-white" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/" className="text-warning">
              4mogusCh4t
            </Navbar.Brand>
          </Container>
          <Container className="justify-content-end">
            <Nav.Link as={Link} to="/login">Вход</Nav.Link>
          </Container>
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
