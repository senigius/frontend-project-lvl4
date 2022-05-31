import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Login from './components/LoginPage.jsx';
import MissingPage from './components/MissingPage.jsx';
import Chat from './components/ChatPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import { useAuth } from './hooks/index.jsx';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const LogInOutButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    auth.userId
      ? <Button variant="warning" onClick={auth.logOut}>{t('logOut')}</Button>
      : location.pathname === '/signUp' && <Button variant="warning" as={Link} to="/login">{t('logIn')}</Button>
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
        <Navbar className="p-2 mb-2 bg-dark rounded-3">
          <Container>
            <Navbar.Brand as={Link} to="/" className="text-warning">
              {t('chatName')}
            </Navbar.Brand>
            <LogInOutButton />
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
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
