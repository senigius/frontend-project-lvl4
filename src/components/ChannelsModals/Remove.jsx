import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const Remove = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { modals: { item } } = useSelector((state) => state.modalsReducer);

  const handleClose = () => dispatch(modalsActions.hideModal());
  const handleRemove = () => {
    socket.emit('removeChannel', item, (response) => {
      if (response.status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal centered show>
        <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>
                Удаление канала
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="lead p-3">Вы уверены, что хотите удалить канал {item.name}?</div>
            <div className="d-flex justify-content-end">
                <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
                    Отмена
                </button>
                <button onClick={handleRemove} type="button" className="me-2 btn btn-danger">
                    Подтвердить
                </button>
            </div>
        </Modal.Body>
    </Modal>
  );
};

export default Remove;
