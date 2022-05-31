import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channel from './Channel.jsx';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channelsReducer);

  return (
    <>
      <div className="d-flex justify-content-between ps-4 pe-2 m-1">
        <span>{t('channels.title')}</span>
        <button
          className="btn btn-dark text-warning"
          type="button"
          onClick={() => dispatch(modalsActions.showModal({ type: 'addChannel' }))}
        >
          <i>+</i>
        </button>
      </div>
      <Nav as="ul" className="flexs-column px-2" variant="pills" fill>
        {channels.length > 0 && channels.map(({ id, name, removable }) => (
          <Channel key={id} id={id} name={name} removable={removable} />
        ))}
      </Nav>
    </>
  );
};

export default Channels;
