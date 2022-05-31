import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

import amogus from '../images/amogusReg.png';

const SignUpPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(t('yup.required'))
        .min(3, t('yup.username'))
        .max(20, t('yup.username')),
      password: yup.string().required(t('yup.required'))
        .min(6, t('yup.password')),
      passwordConfirm: yup.string().required(t('yup.required'))
        .oneOf([yup.ref('password')], t('yup.passwordConfirm')),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signUpPath(), values);
        auth.logIn(data);
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
        if (err.message === 'Network Error') {
          toast.error(t('errors.network'));
        }
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true);
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
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
                <Form.FloatingLabel className="mb-3" controlId="username" label={t('signUpPage.username')}>
                  <Form.Control
                    className="form-control"
                    name="username"
                    placeholder={t('signUpPage.username')}
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(!!formik.errors.username || registrationFailed)
                      && formik.touched.username}
                    ref={inputRef}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.FloatingLabel>
                <Form.FloatingLabel className="mb-3" controlId="password" label={t('signUpPage.password')}>
                  <Form.Control
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="new-password"
                    placeholder={t('signUpPage.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(!!formik.errors.password || registrationFailed)
                      && formik.touched.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.FloatingLabel>
                <Form.FloatingLabel className="mb-3" controlId="passwordConfirm" label={t('signUpPage.passwordConfirm')}>
                  <Form.Control
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    autoComplete="new-password"
                    placeholder={t('signUpPage.passwordConfirm')}
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(!!formik.errors.passwordConfirm
                      || registrationFailed) && formik.touched.passwordConfirm}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                  {registrationFailed && (<Form.Control.Feedback type="invalid" tooltip>
                    {t('errors.signUpFailed')}
                  </Form.Control.Feedback>)}
                </Form.FloatingLabel>
                <Button className="w-100 mb-3 btn btn-outline-dark" type="submit" variant="outline-primary">
                  {t('signUpPage.btn')}
                </Button>
              </Form>
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Col md={12}>
                  <Image className="img-fluid" src={amogus} alt="Picture of amogus" />
                </Col>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
