import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channel from './Channel.jsx';
import { actions as modalsActions } from '../slices/modalsSlice.js';
import { getChannels } from '../slices/selectors.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(getChannels);

  const handleShowModal = () => {
    dispatch(modalsActions.showModal({ type: 'addChannel' }));
  };

  return (
    <>
      <div className="d-flex justify-content-between m-1 p-3">
        <span className="h4 pt-1">{t('channels.title')}</span>
        <button
          className="btn btn-dark text-warning px-2"
          type="button"
          onClick={handleShowModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-plus-lg" viewBox="4 4 8 8">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
          <p className="visually-hidden">+</p>
        </button>
      </div>
      <Nav as="ul" className="px-2" variant="pills" fill>
        {channels.map(({ id, name, removable }) => (
          <Channel key={id} id={id} name={name} removable={removable} />
        ))}
      </Nav>
    </>
  );
};

export default Channels;
