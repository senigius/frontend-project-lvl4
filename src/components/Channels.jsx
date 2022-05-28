import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';

import Channel from './Channel.jsx';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducer);

  return (
    <>
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button
                className="btn btn-dark text-warning p-0"
                type="button"
                onClick={() => dispatch(modalsActions.showModal({ type: 'addChannel' }))}
            ><h5>+</h5></button>
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
