import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSocket } from '../../hooks/index.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const Add = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const channels = useSelector((state) => state.channelsReducer.channels);
  const channelsNames = channels.map(({ name }) => name);

  const handleClose = () => dispatch(modalsActions.hideModal());

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().notOneOf(channelsNames, 'notOneOf'),
    }),
    onSubmit: (name) => {
      socket.emit('newChannel', name, (response) => {
        if (response.status === 'ok') {
          dispatch(channelsActions.setCurrentChannel(response.data.id));
          handleClose();
        }
      });
    },
  });

  return (
        <Modal centered show>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>
                    Добавление канала
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Form.Group className="form-group" controlId="addChannel">
                        <Form.Control
                        ref={inputRef}
                        isInvalid={formik.errors.name}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="mb-2"
                        name="name"
                        type="text"
                        />
                        {formik.errors.name && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <button
                        onClick={handleClose}
                        type="button"
                        className="me-2 btn btn-secondary"
                        >Отмена</button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Подтвердить</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
  );
};

export default Add;