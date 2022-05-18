import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Login from './login.jsx';

function Home() {
  return <h2>Home</h2>;
}

function NotFound() {
  return <h3>NotFound</h3>;
}

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/">
              Amogus Chat
            </Navbar.Brand>
          </div>
        </Navbar>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}
