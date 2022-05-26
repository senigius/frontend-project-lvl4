import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

import Channel from './Channel.jsx';

const Channels = () => {
  const { channels } = useSelector((state) => state.channelsReducer);

  return (
        <>
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
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
