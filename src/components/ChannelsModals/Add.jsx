import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAPI } from '../../hooks/index.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { getChannelsNames } from '../../slices/selectors.js';

const Add = () => {
  const api = useAPI();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  const channelsNames = useSelector(getChannelsNames);

  const handleClose = () => dispatch(modalsActions.hideModal());

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(t('yup.required'))
        .max(20, t('modal.chMaxLength'))
        .notOneOf(channelsNames, t('yup.notOneOf')),
    }),
    onSubmit: async (name) => {
      await api.createChannel(name);
      handleClose();
      toast.success(t('notifications.channelCreated'));
    },
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {t('modal.addChTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="form-group" controlId="name">
            <Form.Label visuallyHidden>{t('modal.chName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('modal.chName')}
              className="mb-2"
              name="name"
              type="text"
            />
            {formik.errors.name && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
              {t('modal.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('modal.submit')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
