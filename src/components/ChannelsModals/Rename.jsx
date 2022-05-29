import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { actions as modalsActions } from '../../slices/modalsSlice';
import { useSocket } from '../../hooks/index.jsx';

const Rename = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { modals: { item } } = useSelector((state) => state.modalsReducer);
  const channels = useSelector((state) => state.channelsReducer.channels);
  const channelsNames = channels.map(({ name }) => name);

  const handleClose = () => dispatch(modalsActions.hideModal());

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().max(10).notOneOf(channelsNames, 'notOneOf'),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        id: item.id,
      };
      socket.emit('renameChannel', data, (response) => {
        if (response.status === 'ok') {
          handleClose();
        }
      });
    },
  });

  return (
        <Modal centered show>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>
                    Переименование канала
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Form.Group className="form-group" controlId="newChannel">
                        <Form.Label visuallyHidden>Имя канала</Form.Label>
                        <Form.Control
                        className="mb-2"
                        name="name"
                        type="text"
                        ref={inputRef}
                        isInvalid={formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
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

export default Rename;
