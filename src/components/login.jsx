import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

function MyTextInput({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function SignupForm() {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="col-md-12 row" src="https://artist.starclinch.com/assets/img/signup.svg" alt="sign up" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .max(10, 'Must be 10 characters or less')
                    .required('No nickname provided'),
                  password: Yup.string()
                    .required('No password provided')
                    .min(6, 'Password is too short - should be 6 chars minimum')
                    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <MyTextInput
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="Ваш никнейм"
                    />
                  </div>
                  <div className="form-floating mb-4">
                    <MyTextInput
                      className="form-control"
                      name="password"
                      type="text"
                      placeholder="Пароль"
                    />
                  </div>
                  <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/">123</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
