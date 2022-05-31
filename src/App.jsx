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

import Login from './components/Pages/Login.jsx';
import MissingPage from './components/Pages/404.jsx';
import Chat from './components/Pages/Chat.jsx';
import SignUpPage from './components/Pages/SignUp.jsx';
import { useAuth } from './hooks/index.jsx';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (auth.userId) {
    return <Button variant="warning" onClick={auth.logOut}>{t('logOut')}</Button>;
  }
  if (location.pathname === '/signup') {
    return <Button variant="warning" as={Link} to="/login">{t('logIn')}</Button>;
  }
  return null;
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
          <AuthButton />
        </Container>
      </Navbar>
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <RequireAuth>
              <Chat />
            </RequireAuth>
        )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<MissingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        theme="dark"
      />
    </Router>
  );
};

export default App;
