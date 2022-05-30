import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks';
import routes from '../routes.js';

import amogus from '../images/amogusLog.png';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.message === 'Network Error') {
          toast.error(t('errors.network'));
        }
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-75">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-lg">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Col md={12}>
                  <Image className="img-fluid" src={amogus} alt="Picture of amogus" />
                </Col>
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-md-6 mt-3 mt-mb-0">
                <h1 className='text-center mb-4'>{t('loginPage.title')}</h1>
                <Form.FloatingLabel className="mb-3" id="username" label={t('loginPage.username')}>
                  <Form.Control
                    className='form-control'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    placeholder={t('loginPage.username')}
                    name='username'
                    id='username'
                    autoComplete='username'
                    required
                  />
                </Form.FloatingLabel>
                <Form.FloatingLabel className="mb-4" id="password" label={t('loginPage.password')}>
                  <Form.Control
                    className='form-control'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    placeholder={t('loginPage.password')}
                    name='password'
                    id='password'
                    autoComplete='current-password'
                    required
                  />
                  <Form.Control.Feedback type="invalid">{t('errors.authFailed')}</Form.Control.Feedback>
                </Form.FloatingLabel>
                <Button className='w-100 mb-2 btn btn-outline-dark' type="submit" variant="outline-primary">
                  {t('loginPage.btn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4 bg-dark text-white">
              <Container className="text-center">
                <span>{t('loginPage.regQuestion')} </span>
                <Link to="/signup" className="text-white">{t('loginPage.registrationLink')}</Link>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
