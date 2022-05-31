import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const Remove = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const { modals: { item } } = useSelector((state) => state.modalsReducer);

  const handleClose = () => dispatch(modalsActions.hideModal());

  const handleRemove = () => {
    socket.emit('removeChannel', item, (response) => {
      if (response.status === 'ok') {
        handleClose();
        toast.success(t('notifications.channelRemoved'));
      }
    });
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {t('modal.removeChTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="lead p-3">{t('modal.removeChBody')} {item.name}?</div>
        <div className="d-flex justify-content-end">
          <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
            {t('modal.cancel')}
          </button>
          <button onClick={handleRemove} type="button" className="me-2 btn btn-danger">
            {t('modal.delete')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
