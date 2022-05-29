import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

import amogus from '../images/amogusReg.png';

const RegistrationForm = () => {
  const auth = useAuth();
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
      username: yup.string().required()
        .min(3, 'Длина никнейма должна быть 3-20 символов')
        .max(20, 'Длина никнейма должна быть 3-20 символов'),
      password: yup.string().required()
        .min(6, 'Минимальная длина пароля 6 символов'),
      passwordConfirm: yup.string().required()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signUpPath(), values);
        auth.logIn(data);
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
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
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-8 col-md-2 col-xxl-7">
                    <div className="card shadow-sm">
                        <div className="card-body row p-2">
                            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <Form.Group className="form-floating">
                                    Имя
                                    <Form.Control
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholdre="Ваш никнейм"
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
                                </Form.Group>
                                <Form.Group className="form-floating mb-2">
                                    Пароль
                                    <Form.Control
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholdre="Ваш пароль"
                                        autoComplete="new-password"
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
                                </Form.Group>
                                <Form.Group className="form-floating mb-2">
                                    Подтвердите пароль
                                    <Form.Control
                                        type="password"
                                        className="form-control"
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        placeholdre="Повторите ваш пароль"
                                        autoComplete="new-password"
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
                                        Пользователь с таким именем уже существует
                                    </Form.Control.Feedback>)}
                                </Form.Group>
                                <Button className="w-100 mb-3 btn btn-outline-dark" type="submit" variant="outline-primary">Подтвердить</Button>
                            </Form>
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                <img className="col-md-12 row img-fluid" src={amogus} alt="Picture of amogus"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default RegistrationForm;
