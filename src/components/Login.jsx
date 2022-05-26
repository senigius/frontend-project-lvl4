import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';

import useAuth from '../hooks/index';
import routes from '../routes.js';

import amogus from '../images/amogus.png';

const LoginPage = (props) => {
  const { state } = props;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        const { from } = location.state || state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
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
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card-shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-md-6 d-flex'>
                <img className='col-md-12 row' src={amogus} alt='Useless picture of amogus' />
              </div>
              <Form onSubmit={formik.handleSubmit} className='col-md-6 mt-3 mt-mb-0'>
                <h1 className='text-center mb-4'>Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    className='form-control'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    placeholder="Введите ваш никнейм"
                    name='username'
                    id='username'
                    autoComplete='username'
                    required
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    className='form-control'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    ref={inputRef}
                    placeholder="Введите ваш пароль"
                    name='password'
                    id='password'
                    autoComplete='current-password'
                    required
                  />
                  <Form.Control.Feedback type="invalid">Неправильный пароль или имя пользователя</Form.Control.Feedback>
                </Form.Group>
                <Button className='w-100 mb-3 btn btn-outline-primary' type="submit" variant="outline-primary">Вход</Button>
              </Form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                <a href='/'>зарегистрироваться</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
